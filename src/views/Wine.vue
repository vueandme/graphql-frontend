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
      <button
        type="button"
        class="modal-close px-4 hover:bg-main bg-secondary py-3 rounded-lg text-white self-end mr-6"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import getWineQuery from '../graphql/getWine.query.gql'
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
