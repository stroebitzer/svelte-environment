<script lang="ts">
  import { onMount } from "svelte";

  // TODO get rid of the type decl via pagedata
  interface User {
    id: number;
    name: string;
    email: string;
  }

  let users: User[] = [];
  let isLoading = true;

  onMount(async () => {
    const response = await fetch("/users");
    if (response.ok) {
      users = await response.json();
    }
    isLoading = false;
  });
</script>

<main>
  <h1>User List</h1>

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each users as user (user.id)}
        <li>
          <strong>{user.name}</strong> ({user.email})
        </li>
      {/each}
    </ul>
  {/if}
</main>
