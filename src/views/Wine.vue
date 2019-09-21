<template>
  <div class="w-full flex mt-8 border border-grey-light rounded">
    <img src="../assets/wine.png" alt="Wine" class="wine-placeholder m-6" />
    <ApolloQuery
      class="w-full"
      :query="require('../graphql/getWine.query.gql')"
      :variables="{ id: $route.params.id }"
    >
      <template v-slot="{ result: { data, error, loading } }">
        <div
          v-if="data && data.getWine"
          class="flex flex-col justify-between w-full my-5"
        >
          <h2 class="text-black font-bold text-xl mb-2 text-center">
            {{ data.getWine.title }}
          </h2>
          <h3 class="font-bold text-lg mb-2 text-center">
            {{ data.getWine.year }}
          </h3>
          <p class="mb-2">Province: {{ data.getWine.province }}</p>
          <p class="mb-2">Winery: {{ data.getWine.winery }}</p>
          <p class="mb-2">Variety: {{ data.getWine.variety }}</p>
          <p class="mb-3 text-grey-darker text-base">
            {{ data.getWine.description }}
          </p>
          <ApolloMutation
            :mutation="require('../graphql/deleteWine.mutation.gql')"
            :variables="{ id: data.getWine.id }"
            :update="updateCache"
            class="self-end"
            @done="$router.push('/')"
          >
            <template v-slot="{ mutate, loading, error }">
              <button
                type="button"
                class="modal-close px-4 hover:bg-main bg-secondary py-3 rounded-lg text-white mr-6"
                @click="mutate()"
              >
                Delete
              </button>
            </template>
          </ApolloMutation>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import allWinesQuery from '../graphql/allWines.query.gql'
export default {
  data() {
    return {
      wine: {}
    }
  },
  methods: {
    updateCache(store) {
      const data = store.readQuery({ query: allWinesQuery })
      data.allWines = data.allWines.filter(
        wine => wine.id !== this.$route.params.id
      )
      store.writeQuery({ query: allWinesQuery, data })
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
