<script lang="ts">
  import { snaps } from '$lib/image';
  import { onMount } from 'svelte';

  let visible: boolean[] = [];

  onMount(() => {
    visible = snaps.map(() => false);
    snaps.forEach((_, i) => {
      setTimeout(() => {
        visible[i] = true;
        visible = [...visible]; // important: réassignation pour déclencher la réactivité
      }, i * 120);
    });
  });
</script>

<div class="min-h-screen bg-pink-100 p-6">
  <h1 class="text-center text-3xl text-pink-600 font-bold mb-6">Tes snaps 😍</h1>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {#each snaps as snap, i}
      <div class="relative group">
        <img
          src={snap}
          alt="Snap"
          class="rounded-xl shadow-lg transition duration-500 ease-out hover:scale-105 hover:rotate-1 cursor-pointer"
          class:opacity-100={visible[i]}
          class:translate-y-0={visible[i]}
          class:opacity-0={!visible[i]}
          class:translate-y-6={!visible[i]}
          loading="lazy"
        />
        <span class="pointer-events-none absolute -top-2 -right-2 hidden group-hover:block text-pink-400 text-xl animate-float">✨</span>
      </div>
    {/each}
  </div>
</div>

<style>
  img { transition-property: transform, opacity; }
  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-10px); opacity: 0.8; }
  }
  .animate-float { animation: floatUp 1.2s ease-in-out infinite alternate; }
</style>
