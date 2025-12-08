<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	// SvelteKit 1.0+: `children` est injecté automatiquement via slot
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<slot />
