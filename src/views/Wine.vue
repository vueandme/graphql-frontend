<template>
  <div class="w-full flex mt-8 border border-grey-light rounded">
    <img src="../assets/wine.png" alt="Wine" class="wine-placeholder m-6" />
    <div class="flex flex-col justify-between w-full my-5">
      <h2 class="text-black font-bold text-xl mb-2 text-center">
        {{ wine.title }}
      </h2>
      <h3 class="font-bold text-lg mb-2 text-center">
        {{ wine.year }}
      </h3>
      <p class="mb-2">Province: {{ wine.province }}</p>
      <p class="mb-2">Winery: {{ wine.winery }}</p>
      <p class="mb-2">Variety: {{ wine.variety }}</p>
      <p class="mb-3 text-grey-darker text-base">
        {{ wine.description }}
      </p>
      <div class="flex w-full justify-end">
        <button
          type="button"
          @click="deleteWine"
          class="modal-close px-4 hover:bg-main bg-secondary py-3 rounded-lg text-white self-end mr-6"
        >
          Delete
        </button>
        <button
          type="button"
          @click="toggleFavorites"
          class="px-4 hover:bg-main bg-secondary py-3 rounded-lg text-white mr-6"
        >
          Toggle favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import getWineQuery from '../graphql/getWine.query.gql'
import allWinesQuery from '../graphql/allWines.query.gql'
import deleteWineMutation from '../graphql/deleteWine.mutation.gql'
import toggleFavoritesMutation from '../graphql/toggleFavorites.mutation.gql'
export default {
  data() {
    return {
      wine: {}
    }
  },
  apollo: {
    wine: {
      query: getWineQuery,
      variables() {
        return {
          id: this.$route.params.id
        }
      },
      update(data) {
        return data.getWine
      }
    }
  },
  methods: {
    deleteWine() {
      this.$apollo
        .mutate({
          mutation: deleteWineMutation,
          variables: { id: this.wine.id },
          update: store => {
            const data = store.readQuery({ query: allWinesQuery })
            data.allWines = data.allWines.filter(
              wine => wine.id !== this.wine.id
            )
            store.writeQuery({ query: allWinesQuery, data })
          }
        })
        .finally(() => this.$router.push('/'))
    },
    toggleFavorites() {
      this.$apollo.mutate({
        mutation: toggleFavoritesMutation,
        variables: { id: this.wine.id },
        refetchQueries: [{ query: allWinesQuery }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wine-placeholder {
  max-width: 80px;
}

.modal-close {
  max-width: 90px;
}
</style>
