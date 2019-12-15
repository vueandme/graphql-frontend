<template>
  <div>
    <h2 class="text-xl text-bold m-3" v-if="loading">
      Loading...
    </h2>
    <div v-else class="flex flex-wrap">
      <WineCard v-for="wine in wines" :key="wine.id" :wine="wine" />
    </div>
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
import { ref } from '@vue/composition-api'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import WineCard from '../components/WineCard'
import WineModal from '../components/WineModal'
import WineForm from '../components/WineForm'
import allWinesQuery from '../graphql/allWines.query.gql'
import addWineMutation from '../graphql/addWine.mutation.gql'
import wineSubscription from '../graphql/wineSub.subscription.gql'
export default {
  setup() {
    const modalOpen = ref(false)
    const { result, loading } = useQuery(allWinesQuery)
    const wines = useResult(result, null, data => data.allWines)

    const { mutate, onDone } = useMutation(addWineMutation, () => ({
      update: (store, { data: { addWine } }) => {
        const data = store.readQuery({ query: allWinesQuery })
        data.allWines.push(addWine)
        store.writeQuery({ query: allWinesQuery, data })
      }
    }))

    const addNewWine = wine => {
      mutate({ wine })
    }

    onDone(() => {
      modalOpen.value = false
    })

    return { result, wines, loading, addNewWine, modalOpen }
  },
  components: {
    WineCard,
    WineModal,
    WineForm
  },
  methods: {
    checkButton(e) {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    },
    closeModal() {
      this.modalOpen = false
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
