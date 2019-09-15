<template>
  <div class="w-1/2 p-2">
    <router-link
      tag="div"
      :to="{ name: 'wine', params: { id: wine.id } }"
      class="cursor-pointer rounded overflow-hidden shadow-lg px-6 py-4"
    >
      <h3 class="font-bold text-lg mb-2">
        {{ wine.title }}
      </h3>
      <div class="flex text-secondary text-md mb-2">
        <span class="pr-3">
          <i class="fas fa-wine-bottle"></i>
          {{ wine.variety }}
        </span>
        <span class="pr-3">
          <i class="far fa-calendar-alt"></i>
          {{ wine.year }}
        </span>
        <span class="pr-3">
          <i class="fas fa-map-marker-alt"></i>
          {{ wine.province }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    wine: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
