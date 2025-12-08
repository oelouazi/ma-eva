<script lang="ts">
  import { base } from '$app/paths';

  let tab: 'fr' | 'en' = 'fr';
  let hearts: { id: number; x: number; y: number }[] = [];
  let count = 0;

  function addHeart(e: MouseEvent) {
    const id = count++;
    hearts = [...hearts, { id, x: e.clientX, y: e.clientY }];
    setTimeout(() => {
      hearts = hearts.filter(h => h.id !== id);
    }, 2000);
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      addHeart(e as unknown as MouseEvent);
    }
  }
</script>

<div
  role="region"
  tabindex="0"
  class="min-h-screen bg-pink-100 px-4 sm:px-6 py-6 flex flex-col items-center relative"
  on:click={addHeart}
  on:keydown={handleKey}
>
  {#each hearts as h (h.id)}
    <span class="pointer-events-none fixed text-pink-500 animate-heart select-none" style={`left:${h.x}px; top:${h.y}px`} aria-hidden="true">❤️</span>
  {/each}

  <h1 class="text-2xl sm:text-3xl text-pink-600 font-bold mb-4 sm:mb-6 text-center">Poésies ✨</h1>

  <div class="mb-5 sm:mb-6 flex flex-wrap gap-2 bg-white rounded-full shadow p-1">
    <button type="button" class="px-4 py-2 rounded-full transition data-[active=true]:bg-pink-500 data-[active=true]:text-white data-[active=false]:bg-transparent data-[active=false]:text-pink-600 hover:bg-pink-100" data-active={tab==='fr'} on:click={() => tab='fr'}>
      Français
    </button>
    <button type="button" class="px-4 py-2 rounded-full transition data-[active=true]:bg-pink-500 data-[active=true]:text-white data-[active=false]:bg-transparent data-[active=false]:text-pink-600 hover:bg-pink-100" data-active={tab==='en'} on:click={() => tab='en'}>
      Anglais
    </button>
  </div>

  {#if tab==='fr'}
    <div class="w-full max-w-xl bg-white p-5 sm:p-6 rounded-2xl shadow-lg text-pink-700 leading-relaxed text-base sm:text-lg space-y-4 animate-[fadeIn_200ms_ease]">
      <p>
        Même avec ma prosopagnosie,<br>
        j’arriverai toujours à te reconnaître parmi la foule,<br>
        parce que ce que je vois en toi est au-delà du tangible.
      </p>
    </div>
  {/if}

  {#if tab==='en'}
    <div class="w-full max-w-xl bg-white p-5 sm:p-6 rounded-2xl shadow-lg text-pink-700 leading-relaxed text-base sm:text-lg space-y-4 animate-[fadeIn_200ms_ease]">
      <p>
        I wanted to write about our connection,<br>
        but it would feel like pure invention.<br>
        Because every word, every affection,<br>
        only seems to travel in my direction.
      </p>
    </div>
  {/if}

  <a href={`${base}/`} class="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] inline-flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 active:scale-[0.98] transition">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.172 3.172 12H5v8h5v-5h4v5h5v-8h1.828L12 3.172z"/></svg>
    Accueil
  </a>
</div>

<style>
  @keyframes fadeIn { from { opacity:0; transform:translateY(6px);} to {opacity:1; transform:translateY(0);} }
  @keyframes floatUp { 0%{transform:translateY(0);opacity:1;} 100%{transform:translateY(-10px);opacity:0.8;} }
  .animate-heart { animation: floatUp 1.8s ease-out forwards; will-change: transform, opacity; font-size:1.25rem; }
</style>
