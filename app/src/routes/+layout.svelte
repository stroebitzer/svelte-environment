<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="/">Home</a>
<a href="/users/">Users</a>
<a href="/orders/">Orders</a>

{@render children?.()}
