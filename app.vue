<script setup>
    const runTimeConfig = useRuntimeConfig();
</script>
<template>
  <!-- <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div> -->
  <div id="app" class="min-h-screen">
    <NuxtLayout name="default">
      <nuxtPage />
    </NuxtLayout>
  </div>
</template>
