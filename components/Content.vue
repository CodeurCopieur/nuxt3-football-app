<script lang="ts" setup>

  const { getLeagues } = useFootballApi();
  const filterType = ref<String>('All');
  const filterCountry = ref('All');
  const state = reactive({
    leagues: []
  });
  const loading = ref<boolean>(true);


  const filteredLeagues = computed(() => {
    let filtered = state.leagues

    if (filterType.value !== 'All') {
      filtered = filtered.filter(l => l.league.type === filterType.value);
    }

    if (filterCountry.value !== 'All') {
      filtered = filtered.filter(l => l.country.name === filterCountry.value);
    }
    return filtered.sort((a, b) => a.league.id - b.league.id);
  });

  onMounted(async () => {
    try {
      state.leagues = await getLeagues();
    } catch (error) {
      console.error('Failed to fetch leagues:', error);
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div class="home my-8 container max-w-screen-lg mx-auto px-6 py-8">
    <h1 class="title text-center text-4xl font-bold mb-8 text-green-600">Football Leagues</h1>
    <div class="filter-container flex flex-wrap justify-center items-center gap-4 mb-8">
      <div class="flex flex-col items-center">
        <label for="type" class="filter-label mb-2 text-lg text-gray-700">Filter by Type:</label>
        <select id="type" v-model="filterType" class="filter-select p-2 border rounded text-gray-800 bg-white">
          <option value="All">All</option>
          <option value="Cup">Cup</option>
          <option value="League">League</option>
        </select>
      </div>
      <div class="flex flex-col items-center">
        <label for="country" class="filter-label mb-2 text-lg text-gray-700">Filter by Country:</label>
        <select id="country" v-model="filterCountry" class="filter-select p-2 border rounded text-gray-800 bg-white">
          <option value="All">All</option>
          <option value="World">World</option>
          <option value="France">France</option>
          <option value="England">England</option>
          <option value="Italy">Italy</option>
          <option value="Germany">Germany</option>
          <option value="Spain">Spain</option>
          <option value="Portugal">Portugal</option>
          <option value="Turkey">Turkey</option>
          <option value="Netherlands">Netherlands</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
          <option value="Argentina">Argentina</option>
          <option value="Belgium">Belgium</option>
          <option value="Greece">Greece</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Scotland">Scotland</option>
          <!-- Ajoute les autres pays ici... -->
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="league in filteredLeagues" :key="league.league.id" class="card bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
        <div class="w-24 h-24 mb-4">
          <picture>
            <img 
              v-lazy 
              :data-src="league.league.logo"
              :alt="league.league.name" 
              class="w-full h-full object-contain">
          </picture>
        </div>
        <h2 class="text-xl font-semibold text-gray-900">{{ league.league.name }}</h2>
        <span class="text-sm text-gray-500">{{ league.league.type }}</span>
      </div>
    </div>
    <div v-if="loading" class="loader-container fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
      <div class="loader border-8 border-gray-200 border-t-green-600 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  </div>
</template>

<style scoped>
/* Styles généraux */
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

img {
  margin-left: 10px;
}

/* Styles pour le titre */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

/* Styles pour le conteneur de filtre */
.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

/* Styles pour le label du filtre */
.filter-label {
  margin-right: 10px;
  font-size: 1.2rem;
  color: #34495e;
}

/* Styles pour le select du filtre */
.filter-select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
}

.filter-select:focus {
  border-color: #3498db;
}


/* Styles pour le conteneur du loader */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999; /* Ensure it is on top of other content */
}

/* Styles pour le loader */
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #42b983; /* Vue.js Green */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>