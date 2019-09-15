<template>
  <main>
    <nav class="bg-main py-2 shadow-md flex text-white text-xl items-center">
      <router-link to="/" class="flex">
        <img src="./assets/logo.png" alt="Cat logo" class="logo mx-3" />
        VueAndWine</router-link
      >
    </nav>
    <section class="container mx-auto">
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
export default {
  name: 'app'
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
