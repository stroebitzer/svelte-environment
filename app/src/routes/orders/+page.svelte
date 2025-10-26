<script lang="ts">
  import { onMount } from "svelte";

  // TODO get rid of the type decl via pagedata
  interface Order {
    id: number;
    date: string; //format?
    userId: number;
    item: string;
    quantity: number;
  }

  let orders: Order[] = [];
  let isLoading = true;

  onMount(async () => {
    const response = await fetch("/orders");
    if (response.ok) {
      orders = await response.json();
    }
    isLoading = false;
  });
</script>

<main>
  <h1>Orders List</h1>

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each orders as order (order.id)}
        <li>
          <strong>{order.id}</strong>
          Datum: {order.date}, User ID: {order.userId}, Artikel: {order.item}, Anzahl: {order.quantity}
        </li>
      {/each}
    </ul>
  {/if}
</main>
