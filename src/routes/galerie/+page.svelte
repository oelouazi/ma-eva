<script lang="ts">
  import { snaps } from '$lib/image';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let hearts: { id:number; x:number; y:number }[] = [];
  let count = 0;
  let visible:boolean[] = [];
  let modalOpen = false;
  let selectedIndex = 0;
  let zoom = 1;
  const ZOOM_MIN = 1.2, ZOOM_MAX=2, ZOOM_STEP=0.15;

  function addHeart(e:MouseEvent){
    const id = count++;
    hearts = [...hearts, {id, x:e.clientX, y:e.clientY}];
    setTimeout(()=> hearts = hearts.filter(h=>h.id!==id), 2000);
  }

  function handleKey(e: KeyboardEvent){
    if(e.key==='Enter' || e.key===' ') addHeart(e as unknown as MouseEvent);
  }

  onMount(()=>{
    visible = snaps.map(()=>false);
    snaps.forEach((_,i)=>{
      setTimeout(()=>{
        visible[i]=true; visible=[...visible];
      }, i*120);
    });
    const onKey=(e:KeyboardEvent)=>{
      if(!modalOpen) return;
      if(e.key==='Escape') closeModal();
      if(e.key==='ArrowRight') next();
      if(e.key==='ArrowLeft') prev();
      if(e.key==='+' || e.key==='=') zoomIn();
      if(e.key==='-') zoomOut();
    }
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  });

  function openModal(i:number){ selectedIndex=i; zoom=ZOOM_MIN; modalOpen=true;}
  function closeModal(){ modalOpen=false; zoom=ZOOM_MIN;}
  function next(){ selectedIndex=(selectedIndex+1)%snaps.length; zoom=ZOOM_MIN;}
  function prev(){ selectedIndex=(selectedIndex-1+snaps.length)%snaps.length; zoom=ZOOM_MIN;}
  function zoomIn(){ zoom=Math.min(zoom+ZOOM_STEP, ZOOM_MAX);}
  function zoomOut(){ zoom=Math.max(zoom-ZOOM_STEP, ZOOM_MIN);}
  function onWheelZoom(e:WheelEvent){ if(!modalOpen) return; e.preventDefault(); e.deltaY>0?zoomOut():zoomIn();}
</script>

<div role="region" tabindex="0" class="min-h-screen bg-pink-100 px-4 sm:px-6 py-6" on:click={addHeart} on:keydown={handleKey}>
  <h1 class="text-center text-2xl sm:text-3xl text-pink-600 font-bold mb-4 sm:mb-6">Tes snaps 😍</h1>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
    {#each snaps as snap,i}
      <button type="button" class="relative group rounded-xl overflow-hidden p-0 border-none cursor-pointer" on:click={()=>openModal(i)}>
        <img src={snap} alt="Snap" class="rounded-xl shadow-lg transition duration-300 ease-out hover:scale-105 hover:rotate-1 active:scale-105 active:rotate-1 select-none" class:opacity-100={visible[i]} class:translate-y-0={visible[i]} class:opacity-0={!visible[i]} class:translate-y-6={!visible[i]} loading="lazy"/>
        <span class="pointer-events-none absolute -top-2 -right-2 hidden group-hover:block text-pink-400 text-xl animate-float" aria-hidden="true">✨</span>
      </button>
    {/each}
  </div>

  {#each hearts as h (h.id)}
    <span class="fixed pointer-events-none select-none text-pink-500 text-2xl animate-fade animate-float" style={`left:${h.x}px; top:${h.y}px`} aria-hidden="true">💖</span>
  {/each}

  <a href={`${base}/`} class="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] inline-flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 active:scale-[0.98] transition">
    Accueil
  </a>
</div>

{#if modalOpen}
  <div role="dialog" aria-modal="true" class="fixed inset-0 bg-black/70 z-40 flex items-center justify-center" on:click={(e)=>e.target===e.currentTarget&&closeModal()} on:wheel|passive={onWheelZoom}>
    <div class="relative z-50 max-w-[92vw] max-h-[92vh] flex items-center justify-center">
      <img src={snaps[selectedIndex]} alt="Snap en grand" class="select-none max-w-[92vw] max-h-[82vh] object-contain" style={`transform: scale(${zoom}); transform-origin: center; transition: transform 200ms ease;`} draggable="false"/>
      <button class="absolute top-4 right-4 bg-white/80 hover:bg-white text-black rounded-full px-3 py-1 shadow" on:click={closeModal} aria-label="Fermer">✕</button>
      <div class="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-1/2 -translate-x-1/2 flex gap-2">
        <button class="bg-white/80 hover:bg-white text-black rounded px-3 py-1 shadow" on:click={zoomOut} aria-label="Zoom -">−</button>
        <button class="bg-white/80 hover:bg-white text-black rounded px-3 py-1 shadow" on:click={zoomIn} aria-label="Zoom +">+</button>
      </div>
      <button class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow" on:click={prev} aria-label="Précédent">❮</button>
      <button class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow" on:click={next} aria-label="Suivant">❯</button>
    </div>
  </div>
{/if}

<style>
  .animate-fade { animation: fadeIn 1s ease forwards; opacity: 0; }
  .animate-fade-delay { animation: fadeIn 1.6s ease forwards; opacity: 0; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .animate-float { animation: floatUp 2s ease-out forwards; }
  @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-80px) scale(1.3); opacity: 0; } }
</style>
