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
- Internet connection for Supabase functionality

Configuration: The repository includes environment variables for the existing Supabase project. To use your own database, update the .env file with your Supabase project URL, anon key, and Google OAuth client ID (if applicable).
  
### Installation

1. Clone the repository and open the project directory:

   ```bash
   git clone https://github.com/obasharr/FitFlow-Fall2025.git
   cd FitFlow-Fall2025
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite in your terminal.

**Note:**  FitFlow uses Supabase for persistent data storage. The repository includes configuration for the original project database. If you want to use your own Supabase instance, you will need to configure the required database tables and permissions.

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

FitFlow was developed as an academic group project and is intended for educational and demonstration purposes. Its authentication implementation is not production-ready, including simplified credential handling and unverified Google sign-in tokens. Production deployment would require stronger authentication, server-side authorization, and appropriate database security policies.

## Project Background

FitFlow was created as a collaborative software development project in Fall 2025, with a focus on full-stack web development, REST API integration, and persistent user data.
