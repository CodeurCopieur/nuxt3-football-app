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

  const getLeagueInfo = async (leagueId: string, season: string) => {
    try {
      const response = await $axios.get('/leagues', {
        params: { id: leagueId, season }
      });
      return response.data.response[0];
    } catch (error) {
      console.error('Error fetching league info:', error);
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

  const getTeamsByLeague = async (leagueId: number, season: number) => {
    try {
      const response = await $axios.get('/teams', {
        params: { league: leagueId, season }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching teams by league:', error);
      throw error;
    }
  };

  const getTopScorers = async (leagueId: number, season: number) => {
    try {
      const response = await $axios.get('/players/topscorers', {
        params: { league: leagueId, season }
      });
      return response.data.response[0];
    } catch (error) {
      console.error('Error fetching top scorers:', error);
      throw error;
    }
  };

  const getTopAssists = async (leagueId: number, season: number) => {
    try {
      const response = await $axios.get('/players/topassists', {
        params: { league: leagueId, season }
      });
      return response.data.response[0];
    } catch (error) {
      console.error('Error fetching top assists:', error);
      throw error;
    }
  };

  return {
    getLeagues,
    getLeagueInfo,
    getTeams,
    getTeamsByLeague,
    getTopScorers,
    getTopAssists
  };
};
