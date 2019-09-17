<template>
  <div class="w-full flex mt-8 border border-grey-light rounded">
    <img src="../assets/wine.png" alt="Wine" class="wine-placeholder m-6" />
    <div class="flex flex-col justify-between w-full my-5">
      <h2 class="text-black font-bold text-xl mb-2 text-center">
        Hello, I am wine with id {{ $route.params.id }}
      </h2>
      <p class="text-grey-darker text-base">
        Let's fetch more details about me!
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

<style lang="scss" scoped>
.wine-placeholder {
  max-width: 80px;
}

.modal-close {
  max-width: 90px;
}
</style>
