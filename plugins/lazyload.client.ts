import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', {
    mounted(el: HTMLImageElement) {
      const loadImage = () => {
        el.src = el.dataset.src as string;
        el.classList.add('loaded');
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(el);
          }
        });
      });

      observer.observe(el);
    }
  });
});
