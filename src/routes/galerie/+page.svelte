<script lang="ts">
  import { snaps } from '$lib/image';
  import { onMount } from 'svelte';

  let visible: boolean[] = [];
  let modalOpen = false;
  let selectedIndex = 0;

  // Zoom doux
  let zoom = 0.9;
  const ZOOM_MIN = 0.9;
  const ZOOM_MAX = 2;
  const ZOOM_STEP = 0.15;

  onMount(() => {
    visible = snaps.map(() => false);
    snaps.forEach((_, i) => {
      setTimeout(() => {
        visible[i] = true;
        visible = [...visible];
      }, i * 120);
    });

    const onKey = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === '+') zoomIn();
      if (e.key === '-') zoomOut();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function openModal(i: number) {
    selectedIndex = i;
    zoom = ZOOM_MIN;
    modalOpen = true;
  }
  function closeModal() {
    modalOpen = false;
    zoom = ZOOM_MIN;
  }
  function next() {
    selectedIndex = (selectedIndex + 1) % snaps.length;
    zoom = ZOOM_MIN;
  }
  function prev() {
    selectedIndex = (selectedIndex - 1 + snaps.length) % snaps.length;
    zoom = ZOOM_MIN;
  }
  function zoomIn() {
    zoom = Math.min(zoom + ZOOM_STEP, ZOOM_MAX);
  }
  function zoomOut() {
    zoom = Math.max(zoom - ZOOM_STEP, ZOOM_MIN);
  }
</script>

<div class="min-h-screen bg-pink-100 px-4 sm:px-6 py-6">
  <h1 class="text-center text-2xl sm:text-3xl text-pink-600 font-bold mb-4 sm:mb-6">Tes snaps 😍</h1>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
    {#each snaps as snap, i}
      <div class="relative group">
        <img
          src={snap}
          alt="Snap"
          class="rounded-xl shadow-lg transition duration-300 ease-out
                 hover:scale-105 hover:rotate-1 active:scale-105 active:rotate-1
                 cursor-pointer"
          class:opacity-100={visible[i]}
          class:translate-y-0={visible[i]}
          class:opacity-0={!visible[i]}
          class:translate-y-6={!visible[i]}
          loading="lazy"
          on:click={() => openModal(i)}
        />
        <span class="pointer-events-none absolute -top-2 -right-2 hidden group-hover:block text-pink-400 text-xl animate-float">✨</span>
      </div>
    {/each}
  </div>

  <!-- Bouton fixe bas droite avec zones sûres iOS -->
  <a
    href="/"
    class="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)]
           inline-flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white shadow-lg
           hover:bg-pink-600 active:scale-[0.98] transition"
    aria-label="Retour à l'accueil"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3.172 3.172 12H5v8h5v-5h4v5h5 v-8h1.828L12 3.172z"/>
    </svg>
    Accueil
  </a>
</div>

{#if modalOpen}
  <div
    class="fixed inset-0 bg-black/70 z-40 flex items-center justify-center"
    on:click={(e) => e.target === e.currentTarget && closeModal()}
  >
    <div class="relative z-50 max-w-[92vw] max-h-[92vh] flex items-center justify-center">
      <img
        src={snaps[selectedIndex]}
        alt="Snap en grand"
        class="select-none max-w-[92vw] max-h-[82vh] object-contain"
        style={`transform: scale(${zoom}); transform-origin: center; transition: transform 200ms ease`}
        draggable="false"
      />

      <button
        class="absolute top-4 right-4 bg-white/80 hover:bg-white text-black rounded-full px-3 py-1 shadow"
        on:click={closeModal}
        aria-label="Fermer"
      >✕</button>

      <div class="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-1/2 -translate-x-1/2 flex gap-2">
        <button class="bg-white/80 hover:bg-white text-black rounded px-3 py-1 shadow" on:click={zoomOut} aria-label="Zoom -">−</button>
        <button class="bg-white/80 hover:bg-white text-black rounded px-3 py-1 shadow" on:click={zoomIn} aria-label="Zoom +">+</button>
      </div>

      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow"
        on:click={prev}
        aria-label="Précédent"
      >❮</button>
      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow"
        on:click={next}
        aria-label="Suivant"
      >❯</button>
    </div>
  </div>
{/if}

<style>
  img { transition-property: transform, opacity; }
  @keyframes floatUp { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-10px); opacity: 0.8; } }
  .animate-float { animation: floatUp 1.2s ease-in-out infinite alternate; }
</style>