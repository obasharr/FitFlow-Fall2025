function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables",
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

async function supabaseRequest<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<SupabaseResponse<T>> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  const url = `${supabaseUrl}/rest/v1${path}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    };

    // Request Supabase to return the created/modified record
    if (method === "POST" || method === "PATCH" || method === "PUT") {
      headers["Prefer"] = "return=representation";
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();

    if (!responseText) {
      console.error(`Empty response from Supabase: ${method} ${path}`);
      return {
        data: null,
        error: { message: "Empty response from database" },
      };
    }

    let data: unknown;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error(`Invalid JSON response: ${responseText}`);
      return {
        data: null,
        error: { message: "Invalid response from database" },
      };
    }

    if (!response.ok) {
      const errorMsg =
        (data as any)?.message ||
        (data as any)?.error_description ||
        "Unknown error";
      console.error(`Supabase API error: ${response.status}`, errorMsg);
      return {
        data: null,
        error: { message: errorMsg },
      };
    }

    return {
      data: data as T,
      error: null,
    };
  } catch (error) {
    console.error("Supabase request error:", error);
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Network error",
      },
    };
  }
}

export async function getUserByEmail(
  email: string,
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
  passwordHash: string,
): Promise<{ id: string; email: string }> {
  const result = await supabaseRequest<
    { id: string; email: string }[] | { id: string; email: string }
  >("POST", "/users", {
    email,
    password_hash: passwordHash,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  // Handle both array and object responses from Supabase
  const data = result.data;
  if (Array.isArray(data)) {
    return data[0];
  }

  return data as { id: string; email: string };
}

export async function verifyUserPassword(
  email: string,
  password: string,
): Promise<boolean> {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  // Simple password comparison (in production, use bcrypt)
  // For now, we'll store plain passwords for demo
  return user.password_hash === password;
}
