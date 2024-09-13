<script lang="ts" setup>
  interface State {
    league: string;
  }
  const state = reactive<State>({
    leagues: "leagues",
  });
</script>

<template>
 <h1>Home Leagues</h1>
 <Content :type="state.leagues" />
</template>

<style lang="scss" scoped>
  
</style>