// import { useNuxtApp } from 'nuxt/app';

export const useFootballApi = () => {
  const { $axios } = useNuxtApp();

  const getLeagues = async () => {
    try {
      const response = await $axios.get('/leagues');
      return response.data.response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  };

  const getTeams = async (leagueId: number) => {
    try {
      const response = await $axios.get(`/teams?league=${leagueId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  };

  return {
    getLeagues,
    getTeams
  };
};
