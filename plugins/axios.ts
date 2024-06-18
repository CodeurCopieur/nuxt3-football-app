import { defineNuxtPlugin } from 'nuxt/app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const axiosInstance = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
    headers: {
      'X-RapidAPI-Key': config.public.rapidApiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  });

  nuxtApp.provide('axios', axiosInstance);
});

