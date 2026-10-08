# FitFlow

FitFlow is a full-stack fitness web application for exploring exercises, learning proper exercise techniques, and saving favorite workouts. Users can browse exercises by muscle group, view exercise details, and personalize their accounts.

## Features

- **Exercise library:** Browse detailed exercises organized across 12 muscle groups, with descriptions, equipment, instructions, and imagery.
- **Search and navigation:** Find exercises and navigate between muscle groups and individual exercise pages.
- **User accounts:** Create an account, log in, and manage account details.
- **Favorites:** Add and remove favorite exercises, with selections stored in Supabase.
- **Profile customization:** Update usernames and profile pictures.
- **Google sign-in integration:** Includes a Google sign-in flow; see the security note below.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Data storage | Supabase |
| Testing / tooling | Vitest, TypeScript, Prettier |

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project configured with the data structures expected by the application
- Optional: a Google OAuth client ID for Google sign-in

### Installation

1. Clone the repository and open the project directory:

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd FitFlow-Fall2025
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create or update a `.env` file in the project root with your own configuration:

   ```dotenv
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

   The Google client ID is needed only for the Google sign-in integration. Never commit real credentials or secrets.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite in your terminal.

**Note:** Supabase setup is not automated in this repository. You will need to configure the required tables and permissions to match the backend's database requests before account and favorites features will work.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend and backend |
| `npm start` | Run the built Node.js server |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run Vitest tests |
| `npm run format.fix` | Format files with Prettier |

## Project Structure

```text
client/
  components/       Reusable UI components
  lib/              Client-side utilities and integrations
  pages/            Application pages
  App.tsx           Application routes and layout
server/
  lib/              Supabase integration
  routes/           Authentication, favorites, and other API handlers
  index.ts          Express app and route registration
shared/             Shared API types
public/             Static assets
```

## API Overview

The Express backend exposes endpoints including:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/signup` | Register a user |
| `POST /api/login` | Log in |
| `POST /api/google-auth` | Handle Google sign-in |
| `POST /api/update-username` | Update username |
| `POST /api/update-profile-picture` | Update profile image |
| `POST /api/favorites/get-favorites` | Retrieve saved exercises |
| `POST /api/favorites/add-favorite` | Save an exercise |
| `POST /api/favorites/remove-favorite` | Remove a saved exercise |

## Security and Development Status

FitFlow was developed as a student project and is **not production-ready**. The current authentication implementation includes simplified credential/token handling, and the Google sign-in backend decodes tokens without verifying their signatures. Before any public deployment, replace these mechanisms with properly validated authentication, secure password hashing, server-side authorization checks, and suitable Supabase access controls.

## Project Background

FitFlow was created as a collaborative software development project in Fall 2025, with a focus on full-stack web development, REST API integration, and persistent user data.
