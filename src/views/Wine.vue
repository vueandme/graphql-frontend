<template>
  <ApolloQuery
    :query="$options.getWineQuery"
    :variables="{ id: $route.params.id }"
  >
    <template #default="{result: {data, error}, isLoading}">
      <div v-if="isLoading">
        Loading
      </div>
      <div
        v-if="!isLoading"
        class="w-full flex mt-8 border border-grey-light rounded"
      >
        <img src="../assets/wine.png" alt="Wine" class="wine-placeholder m-6" />
        <div class="flex flex-col justify-between w-full my-5">
          <h2 class="text-black font-bold text-xl mb-2 text-center">
            Hello, I am wine with id {{ data.getWine.id }} Year:
            <em>{{ data.getWine.year }}</em>
          </h2>
          <div>
            From: {{ data.getWine.winery }} - {{ data.getWine.province }}
          </div>
          <p class="text-grey-darker text-base">
            {{ data.getWine.description }}
          </p>
          <ApolloMutation
            :mutation="$options.deleteWine"
            :variables="{ id: $route.params.id }"
            :update="rmFromCache"
            @done="$router.replace('/')"
          >
            <template #default="{ mutate}">
              <button
                type="button"
                class="modal-close px-4 hover:bg-main bg-secondary py-3 rounded-lg text-white self-end mr-6"
                @click="mutate"
              >
                Delete
              </button>
            </template>
          </ApolloMutation>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import getWineQuery from '../graphql/getWine.query.gql'
import allWinesQuery from '../graphql/allWines.query.gql'
import deleteWine from '../graphql/deleteWine.mutation.gql'

export default {
  getWineQuery,
  deleteWine,
  methods: {
    rmFromCache(store) {
      const data = store.readQuery({ query: allWinesQuery })
      data.allWines = data.allWines.filter(w => w.id !== this.$route.params.id)
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
