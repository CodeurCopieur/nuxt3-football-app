<script lang="ts" setup>

const { getLeagues } = useFootballApi();

const filterType = ref<String>('All');
const state = reactive({
  leagues: []
});


const filteredLeagues = computed(() => {
  let filtered = state.leagues
    // if (filterType.value === 'All') {
    //   return state.leagues;
    // }
    // return state.leagues.filter(l => l.league.type === filterType.value);
    if (filterType.value !== 'All') {
      filtered = filtered.filter(l => l.league.type === filterType.value);
    }
    return filtered.sort((a, b) => a.league.id - b.league.id);
  });

onMounted(async () => {
  try {
    state.leagues = await getLeagues();
    
  } catch (error) {
    console.error('Failed to fetch leagues:', error);
  }
});
</script>

<template>
  <div class="home my-8 container max-w-screen-lg max-w-screen-xl mx-auto px-6 py-8 lg:max-w-7xl">
    <h1>Football Leagues</h1>
    <select v-model="filterType">
      <option value="All">All</option>
      <option value="Cup">Cup</option>
      <option value="League">League</option>
    </select>
    <ul class="mt-2">
      <li v-for="league in filteredLeagues" :key="league.league.id" :id="league.league.id">
        <span>{{ league.league.name }}</span><br>
        <span>{{ league.league.type }}</span>
        <img :src="league.league.logo" :alt="league.league.name">
      </li>
    </ul>
  </div>
</template>
