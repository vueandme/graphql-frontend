<template>
  <div>
    <form @submit.prevent="getFormValues">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          name="title"
          type="text"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="year">
          Year
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="year"
          name="year"
          type="number"
        />
      </div>
      <div class="flex justify-end pt-2">
        <button
          role="submit"
          class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
        >
          Add
        </button>
        <button
          type="button"
          class="modal-close px-4 bg-secondary p-3 rounded-lg text-white"
          @click="$emit('cancel', $event)"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    getFormValues(event) {
      const formData = {
        title: event.target.elements.title.value,
        year: event.target.elements.year.value
      }

      this.$emit('submit', formData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
