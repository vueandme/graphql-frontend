<template>
  <div>
    <h1 class="mt-4 text-black font-bold text-xl mb-2">
      Here should be some wines...
    </h1>
    <div v-if="allWines.length" class="flex flex-wrap">
      <WineCard v-for="wine in allWines" :key="wine.id" :wine="wine" />
      <button
        class="modal-open bg-transparent border border-gray-500 hover:border-main text-gray-500 hover:text-main font-bold py-2 px-4 rounded-full"
        @click="modalOpen = true"
      >
        Add a new wine
      </button>
    </div>
    <WineModal v-if="modalOpen" @close="closeModal">
      <template #form>
        <WineForm @submit="addNewWine" @cancel="closeModal" />
      </template>
    </WineModal>
  </div>
</template>

<script>
import WineCard from '../components/WineCard'
import WineModal from '../components/WineModal'
import WineForm from '../components/WineForm'
export default {
  components: {
    WineCard,
    WineModal,
    WineForm
  },
  data() {
    return {
      // This array should be populated with data fetched from the API
      allWines: [],
      modalOpen: false
    }
  },
  methods: {
    closeModal(e) {
      if (e.type === 'click' || e.keyCode === 27) this.modalOpen = false
    },
    addNewWine(wine) {
      // The mutation logic for adding new wine should be written here
      console.log(wine)
      this.closeModal()
    }
  },
  mounted() {
    document.addEventListener('keyup', this.closeModal)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.closeModal)
  }
}
</script>
