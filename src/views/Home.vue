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
        <ApolloMutation
          :mutation="require('../graphql/addWine.mutation.gql')"
          :update="updateCache"
          @done="closeModal"
        >
          <template v-slot="{ mutate, loading, error }">
            <WineForm
              @submit="mutate({ variables: { wine: $event } })"
              @cancel="closeModal"
            />
          </template>
        </ApolloMutation>
      </template>
    </WineModal>
  </div>
</template>

<script>
import WineCard from '../components/WineCard'
import WineModal from '../components/WineModal'
import WineForm from '../components/WineForm'
import allWinesQuery from '../graphql/allWines.query.gql'
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
    checkButton(e) {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    },
    closeModal() {
      this.modalOpen = false
    },
    updateCache(
      store,
      {
        data: { addWine }
      }
    ) {
      const data = store.readQuery({ query: allWinesQuery })
      data.allWines.push(addWine)
      store.writeQuery({ query: allWinesQuery, data })
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
