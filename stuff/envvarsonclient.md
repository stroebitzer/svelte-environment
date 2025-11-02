You use environment variables in SvelteKit by defining them in a **`.env` file** and accessing them through specific modules, depending on whether they are **public** or **private**.

SvelteKit strictly separates variables to prevent secret keys from leaking to the browser.

-----

## 1\. Public vs. Private Variables

This is the most important concept to understand:

* **Private (Default):** All variables in your `.env` file are private by default. They are **only** accessible on the server (`+page.server.ts`, `+server.ts`). This is for secrets like API keys or database passwords.
* **Public (Explicit):** Variables you want to be accessible in the browser (in your `.svelte` components) **must** be prefixed with `PUBLIC_`.

-----

## 2\. Defining Variables in `.env`

Create a `.env` file in the root of your project:

**`.env`**

```env
# This is PRIVATE. Only accessible on the server.
DATABASE_URL="your-secret-database-url"

# This is PUBLIC. Accessible in the browser (and server).
PUBLIC_API_URL="https://api.example.com"
```

-----

## 3\. Accessing Private Variables (Server-Side)

You access private variables **only in server files** (`+page.server.ts` or `+server.ts`) using the `$env/static/private` module.

**`src/routes/+page.server.ts`**

```typescript
import { DATABASE_URL } from '$env/static/private';

export function load() {
  // This code runs ONLY on the server.
  // We can safely use the private variable here.
  console.log('Connecting to database at:', DATABASE_URL);

  // You would fetch data here and return it to the page.
  return {
    // ... data
  };
}
```

-----

## 4\. Accessing Public Variables (Client-Side)

You access public variables **in any file** (including `.svelte` components) using the `$app/environment` module.

**`src/routes/+page.svelte`**

```svelte
<script lang="ts">
  import { PUBLIC_API_URL } from '$app/environment';

  // This code runs in the browser.
  console.log('The public API URL is:', PUBLIC_API_URL);
</script>

<h1>My App</h1>
<p>API is at {PUBLIC_API_URL}</p>
```

-----

## 🔒 Don't Forget `.gitignore`

Always add your `.env` file to your `.gitignore` file to keep your secrets out of version control.

**`.gitignore`**

```
# Environment variables
.env
```
