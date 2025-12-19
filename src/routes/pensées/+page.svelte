<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  type Person = 'Oualid' | 'Maeva';
  let tab: Person = 'Oualid';

  // État d’édition
  let editing = false;
  let todayText = '';

  // Clés localStorage: pensées par personne et par date (YYYY-MM-DD)
  const todayKey = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const storageKey = (person: Person) => `pensees:${person}:${todayKey()}`;

  function loadToday(person: Person) {
    const key = storageKey(person);
    const val = localStorage.getItem(key);
    todayText = val ?? '';
    // Si vide, passer en édition pour pouvoir créer
    editing = todayText === '';
  }

  function saveToday() {
    const key = storageKey(tab);
    const text = todayText.trim();
    if (text.length === 0) {
      // Suppression si vide
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, text);
    }
    editing = false;
  }

  function startEdit() {
    editing = true;
  }

  function cancelEdit() {
    // Recharger depuis storage (annule modifications)
    loadToday(tab);
    editing = false;
  }

  onMount(() => {
    loadToday(tab);
  });

  // Changement d’onglet
  function switchTab(person: Person) {
    tab = person;
    loadToday(tab);
  }
</script>

<div class="min-h-screen bg-pink-100 px-4 sm:px-6 py-6 flex flex-col items-center">
  <h1 class="text-2xl sm:text-3xl text-pink-600 font-bold mb-4 sm:mb-6 text-center">Pensées 🧠</h1>

  <!-- Onglets -->
  <div class="mb-5 sm:mb-6 flex flex-wrap gap-2 bg-white rounded-full shadow p-1">
    <button
      type="button"
      class="px-4 py-2 rounded-full transition
             data-[active=true]:bg-pink-500 data-[active=true]:text-white
             data-[active=false]:bg-transparent data-[active=false]:text-pink-600 hover:bg-pink-100"
      data-active={tab === 'Oualid'}
      on:click={() => switchTab('Oualid')}
    >
      Oualid
    </button>
    <button
      type="button"
      class="px-4 py-2 rounded-full transition
             data-[active=true]:bg-pink-500 data-[active=true]:text-white
             data-[active=false]:bg-transparent data-[active=false]:text-pink-600 hover:bg-pink-100"
      data-active={tab === 'Maeva'}
      on:click={() => switchTab('Maeva')}
    >
      Maeva
    </button>
  </div>

  <!-- Carte "Pensée d’aujourd’hui" -->
  <div class="w-full max-w-xl bg-white p-5 sm:p-6 rounded-2xl shadow-lg text-pink-700 space-y-4 animate-[fadeIn_200ms_ease]">
    <div class="flex items-baseline justify-between">
      <h2 class="text-lg sm:text-xl font-semibold text-pink-600">Pensée d’aujourd’hui</h2>
      <span class="text-xs text-pink-500 opacity-80">{todayKey()}</span>
    </div>

    {#if editing}
      <div class="space-y-3">
        <textarea
          bind:value={todayText}
          class="w-full min-h-32 rounded-xl border border-pink-200 p-3 outline-none focus:ring-2 focus:ring-pink-300"
          placeholder={`Écris la pensée du jour pour ${tab.toLowerCase()}…`}
        />
        <div class="flex gap-2 justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
            on:click={saveToday}
          >
            Enregistrer
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
            on:click={cancelEdit}
          >
            Annuler
          </button>
        </div>
      </div>
    {:else}
      {#if todayText}
        <div class="whitespace-pre-wrap leading-relaxed text-base sm:text-lg">{todayText}</div>
        <div class="flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
            on:click={startEdit}
          >
            Modifier
          </button>
        </div>
      {:else}
        <p class="text-pink-600">Aucune pensée enregistrée pour aujourd’hui.</p>
        <div class="flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
            on:click={() => { editing = true; }}
          >
            Créer une pensée
          </button>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Bouton fixe bas droite (Accueil) -->
  <a
    href={`${base}/`}
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
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>