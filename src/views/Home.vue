<template>
  <div>
    <h1 class="mt-4 text-black font-bold text-xl mb-2">
      Here should be some wines...
    </h1>
    <div v-if="allWines.length" class="flex flex-wrap">
      <WineCard v-for="wine in allWines" :key="wine.id" :wine="wine"></WineCard>
    </div>
  </div>
</template>

<script>
import WineCard from '../components/WineCard'
export default {
  components: {
    WineCard
  },
  data() {
    return {
      allWines: []
    }
  }
}
</script>
