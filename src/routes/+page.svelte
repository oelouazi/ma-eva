<script lang="ts">
	import { base } from '$app/paths';

	let hearts: { id: number; x: number; y: number }[] = [];
	let count = 0;

	function addHeart(e: MouseEvent) {
		hearts = [...hearts, { id: count++, x: e.clientX, y: e.clientY }];
		setTimeout(() => hearts.shift(), 2000);
	}
</script>

<!-- wrapper interactif, corrigé accessibilité -->
<div
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' && addHeart(e)}
	on:click={addHeart}
	class="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center px-4 sm:px-6 py-6 relative"
>
	<img
		src={`${base}/images/nous.jpg`}
		alt="Photo de nous deux"
		class="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white shadow-lg mb-4 animate-fade object-cover object-[50%_30%]"
		loading="eager"
		decoding="async"
	/>

	<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-4 sm:mb-6 animate-fade">
		Pour toi mon amour Maeva ❤️
	</h1>

	<p class="text-base sm:text-lg text-pink-700 mb-8 sm:mb-10 animate-fade-delay">
		Un petit coin rempli de souvenirs et de poésie pour toi
	</p>

	<!-- liens corrigés avec base -->
	<div class="flex flex-wrap gap-3 sm:gap-4 justify-center">
		<a href="{base}/galerie" class="px-5 py-3 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 active:scale-[0.98] transition">
			Voir les snaps 📸
		</a>

		<a href="{base}/poesies" class="px-5 py-3 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 active:scale-[0.98] transition">
			Poésies ✨
		</a>
	</div>

	{#each hearts as heart (heart.id)}
		<div
			class="absolute text-pink-500 text-2xl animate-float"
			style="left:{heart.x}px; top:{heart.y}px;"
		>
			❤️
		</div>
	{/each}

	<!-- bouton accueil corrigé pour GitHub Pages -->
	<a
		href="{base}/"
		class="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)]
         inline-flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white shadow-lg
         hover:bg-pink-600 active:scale-[0.98] transition"
		aria-label="Retour à l'accueil"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 3.172 3.172 12H5v8h5v-5h4v5h5v-8h1.828L12 3.172z"/>
		</svg>
		Accueil
	</a>
</div>

<style>
    .animate-fade { animation: fadeIn 1s ease forwards; opacity: 0; }
    .animate-fade-delay { animation: fadeIn 1.6s ease forwards; opacity: 0; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .animate-float { animation: floatUp 2s ease-out forwards; }
    @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-80px) scale(1.3); opacity: 0; }
    }
</style>
