const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables"
  );
}

interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

async function supabaseRequest<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<SupabaseResponse<T>> {
  const url = `${supabaseUrl}/rest/v1${path}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey!,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      data: null,
      error: { message: data.message || "Unknown error" },
    };
  }

  return {
    data,
    error: null,
  };
}

export async function getUserByEmail(
  email: string
): Promise<{ id: string; email: string; password_hash: string } | null> {
  const result = await supabaseRequest<
    { id: string; email: string; password_hash: string }[]
  >("GET", `/users?email=eq.${encodeURIComponent(email)}&select=*`);

  if (result.error || !result.data || result.data.length === 0) {
    return null;
  }

  return result.data[0];
}

export async function createUser(
  email: string,
  passwordHash: string
): Promise<{ id: string; email: string }> {
  const result = await supabaseRequest<{ id: string; email: string }>(
    "POST",
    "/users",
    {
      email,
      password_hash: passwordHash,
    }
  );

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data!;
}

export async function verifyUserPassword(
  email: string,
  password: string
): Promise<boolean> {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  // Simple password comparison (in production, use bcrypt)
  // For now, we'll store plain passwords for demo
  return user.password_hash === password;
}
