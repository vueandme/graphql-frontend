<template>
  <div>
    <ApolloQuery :query="require('../graphql/allWines.query.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <h2 class="text-xl text-bold m-3" v-if="isLoading">
          Loading...
        </h2>
        <h2 class="text-xl text-bold m-3" v-else-if="error">
          {{ error }}
        </h2>
        <div v-else-if="data && data.allWines" class="flex flex-wrap">
          <WineCard v-for="wine in data.allWines" :key="wine.id" :wine="wine" />
          <button
            class="modal-open bg-transparent border border-gray-500 hover:border-main text-gray-500 hover:text-main font-bold py-2 px-4 rounded-full"
            @click="modalOpen = true"
          >
            Add a new wine
          </button>
        </div>
      </template>
    </ApolloQuery>
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
      wines: [],
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
