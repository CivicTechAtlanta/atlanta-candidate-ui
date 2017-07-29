<template>
  <v-app light>
    <v-toolbar primary light>
    </v-toolbar>
    <main>
      <!-- <v-container fluid> -->
      <router-view></router-view>
      <!-- </v-container> -->
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
