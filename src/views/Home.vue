<template>
  <div>
    <ApolloQuery :query="$options.allWinesQuery">
      <template #default="{result: {error, data}, isLoading}">
        <h1 v-if="isLoading" class="mt-4 text-black font-bold text-xl mb-2">
          Loading
        </h1>
        <div v-if="data" class="flex flex-wrap">
          <WineCard v-for="wine in data.allWines" :key="wine.id" :wine="wine" />
        </div>
      </template>
    </ApolloQuery>
    <button
      class="modal-open bg-transparent border border-gray-500 hover:border-main text-gray-500 hover:text-main font-bold py-2 px-4 rounded-full"
      @click="modalOpen = true"
    >
      Add a new wine
    </button>
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
import allWinesQuery from '../graphql/allWines.query.gql'
import addWineMutation from '../graphql/addWine.mutation.gql'

export default {
  allWinesQuery,
  components: {
    WineCard,
    WineModal,
    WineForm
  },
  data() {
    return {
      // This array should be populated with data fetched from the API
      wines: [],
      modalOpen: false
    }
  },
  methods: {
    fetchWines() {
      this.$apollo.addSmartQuery('allWines', {
        query: allWinesQuery
      })
    },
    checkButton(e) {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    },
    closeModal() {
      this.modalOpen = false
    },
    async addNewWine(wine) {
      // The mutation logic for adding new wine should be written here
      await this.$apollo.mutate({
        mutation: addWineMutation,
        variables: { wine },
        update: (store, { data: { addWine } }) => {
          const data = store.readQuery({ query: allWinesQuery })
          data.allWines.push(addWine)
          store.writeQuery({ query: allWinesQuery, data })
        }
      })
      this.closeModal()
    }
  },
  mounted() {
    document.addEventListener('keyup', this.checkButton)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.checkButton)
  }
}
</script>
