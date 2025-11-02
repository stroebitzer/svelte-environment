Yes, you can implement SSO (Single Sign-On) with Google in SvelteKit using the **Auth.js** library (formerly NextAuth.js).

Auth.js handles the complex OAuth 2.0 flow securely on the server, manages user sessions with encrypted, HTTP-only cookies, and makes the session data available to your Svelte components.

Here’s a complete step-by-step guide to setting it up.

-----

### 🚀 Step 1: Set Up Your Google Cloud Project

First, you need to get OAuth 2.0 credentials from Google.

1. **Go to the Google Cloud Console:** Visit [console.cloud.google.com](https://console.cloud.google.com/).
2. **Create a Project:** If you don't have one, create a new project.
3. **Configure OAuth Consent Screen:** Go to "APIs & Services" \> "OAuth consent screen". Choose **"External"** and fill in the required app details (app name, user support email).
4. **Create Credentials:**
      * Go to "APIs & Services" \> "Credentials".
      * Click "+ CREATE CREDENTIALS" and select **"OAuth 2.0 Client ID"**.
      * For "Application type", select **"Web application"**.
      * Under "Authorized redirect URIs", click "+ ADD URI" and add the callback URL that Auth.js uses by default:
        `http://localhost:5173/auth/callback/google`
5. **Get Your Keys:** After creation, Google will give you a **Client ID** and a **Client Secret**. Copy these immediately.

-----

### 🔑 Step 2: Configure Your SvelteKit Project

Now, let's set up Auth.js in your SvelteKit application.

1. **Install Auth.js:**

    ```bash
    npm install @auth/sveltekit
    ```

2. **Create Environment Variables:**
    Create a `.env` file in the root of your project and add your Google credentials. You also need a secret key for Auth.js to encrypt its session cookies.

    ```env
    # .env
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

    # Generate a secret with: openssl rand -hex 32
    AUTH_SECRET="YOUR_GENERATED_AUTH_SECRET"
    ```

3. **Create the Auth.js Configuration:**
    Create a new file to hold your Auth.js configuration. This keeps your code clean.

    **File:** `src/auth.ts`

    ```typescript
    import { SvelteKitAuth } from "@auth/sveltekit";
    import Google from "@auth/sveltekit/providers/google";
    import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

    export const { handle, signIn, signOut } = SvelteKitAuth({
      providers: [
        Google({
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
        }),
      ],
    });
    ```

4. **Set Up the Server Hook:**
    Auth.js works by intercepting requests to `/auth/...`. You need to hook it into SvelteKit's server.

    **File:** `src/hooks.server.ts`

    ```typescript
    // Import the handle function from your auth configuration
    import { handle } from "./auth";

    // The handle function from Auth.js will be used as the server hook
    export { handle };
    ```

-----

### 📝 Step 3: Add Sign-In and Sign-Out Buttons

Now, you need to make the session data available to your entire app and create the UI for logging in and out.

1. **Expose Session Data to All Pages:**
    Create a root server layout file to fetch the session on every page load.

    **File:** `src/routes/+layout.server.ts`

    ```typescript
    import type { LayoutServerLoad } from './$types';

    export const load: LayoutServerLoad = async (event) => {
      // The `auth()` function is provided by Auth.js
      const session = await event.locals.auth();
      return {
        session: session,
      };
    };
    ```

2. **Create the UI in Your Root Layout:**
    This layout component will wrap every page and display either a "Sign In" button or the user's information and a "Sign Out" button.

    **File:** `src/routes/+layout.svelte`

    ```svelte
    <script lang="ts">
      import type { PageData } from './$types';
      export let data: PageData;
    </script>

    <header>
      <nav>
        <a href="/">Home</a>
        {#if data.session}
          <span>
            Signed in as {data.session.user?.email}
            <form action="/auth/signout" method="POST">
              <button type="submit">Sign Out</button>
            </form>
          </span>
        {:else}
          <form action="/auth/signin/google" method="POST">
            <button type="submit">Sign in with Google</button>
          </form>
        {/if}
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <style>
      nav { display: flex; justify-content: space-between; padding: 1rem; }
    </style>
    ```

-----

### 💻 Step 4: Protect a Page

To make a page accessible only to logged-in users, add a `load` function to its server file and check for a session.

1. **Create a Protected Route:**
    Let's create a page at `/protected`.

    **File:** `src/routes/protected/+page.server.ts`

    ```typescript
    import { redirect } from '@sveltejs/kit';
    import type { PageServerLoad } from './$types';

    export const load: PageServerLoad = async (event) => {
      const session = await event.locals.auth();

      // If the user is not logged in, redirect them to the sign-in page.
      if (!session) {
        throw redirect(303, "/auth/signin");
      }

      // If they are logged in, return the session data.
      return {
        session: session,
      };
    };
    ```

Now, any user who tries to visit `/protected` without being logged in will be automatically redirected to the Google sign-in page.
