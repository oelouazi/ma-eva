<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Entête commun -->
<header class="w-full bg-pink-500 text-white shadow-md">
	<div class="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
		<a href="/" class="inline-flex items-center gap-2 font-semibold hover:opacity-90 transition" aria-label="Accueil">
			<!-- Icône maison -->
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 3.172 3.172 12H5v8h5v-5h4v5h5v-8h1.828L12 3.172z"/>
			</svg>
			Accueil
		</a>

		<!-- Vous pouvez ajouter un titre ou des liens supplémentaires ici -->
		<span class="text-sm opacity-90">Ma galerie</span>
	</div>
</header>

<main class="mx-auto max-w-5xl px-4 py-6">
	{@render children()}
</main>