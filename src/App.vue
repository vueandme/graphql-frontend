<template>
  <main class="flex flex-col">
    <nav class="bg-main py-2 shadow-md flex text-white text-xl items-center">
      <router-link to="/" class="flex">
        <img src="./assets/logo.png" alt="Cat logo" class="logo mx-3" />
        VueAndWine</router-link
      >
    </nav>
    <section class="container mx-auto flex-1">
      <router-view></router-view>
    </section>
    <WineAlert v-if="alertShown" />
  </main>
</template>

<script>
import WineAlert from './components/WineAlert'
export default {
  name: 'app',
  components: { WineAlert },
  data() {
    return {
      alertShown: false
    }
  },
  methods: {
    showAlert() {
      this.alertShown = true
      setTimeout(() => (this.alertShown = false), 3000)
    }
  }
}
</script>

<style lang="scss">
.container {
  max-width: 960px;
}

.logo {
  max-width: 30px;
}
</style>
