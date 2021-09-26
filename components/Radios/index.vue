<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="h-4 w-4"
      :class="{
        'focus:ring-indigo-500 text-indigo-600 border-gray-300': !error,
        'focus:ring-red-500 text-red-600 border-red-300': error,
      }"
      :checked="isChecked"
      @click="checkInput"
    />

    <div class="ml-3 text-sm">
      <!-- Label -->
      <label :for="id" class="font-medium text-gray-700"> <slot /> </label>

      <!-- Description -->
      <p :class="{ 'text-gray-500': !error, 'text-red-500': error }">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    // Provide by v-model
    modelValue: {
      type: null,
      required: true,
    },
    // Contain value of this radio tag
    value: {
      type: null,
      default: true,
    },
    // Determine whether this radio tag has error
    error: {
      type: null,
      default: false,
    },
  },
  data() {
    return {
      id: undefined,
    }
  },
  computed: {
    isChecked() {
      return this.modelValue === this.value
    },
  },
  mounted() {
    this.id = this._uid
  },
  methods: {
    // When user click this tag
    checkInput(e) {
      if (this.isChecked) {
        this.$emit('change', null)
      } else {
        this.$emit('change', this.value)
      }
    },
  },
}
</script>
