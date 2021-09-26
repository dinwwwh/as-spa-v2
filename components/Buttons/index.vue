<template>
  <button
    class="
      focus:outline-none
      flex
      items-center
      justify-center
      font-medium
      border border-transparent
      shadow-sm
      relative
      rounded-md
      overflow-hidden
      focus-within:ring-2 focus-within:ring-offset-2
    "
    :class="{
      ' px-4 py-2  text-sm': true,
      [`text-white bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`]: true,
      'text-opacity-10': isLoading,
    }"
    v-bind="$attrs"
    v-on="$listeners"
    @click="isLoading = true"
  >
    <slot />

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-black bg-opacity-10
      "
    >
      <IconsLoading class="h-6 animate-spin text-white" />
    </div>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'indigo',
    },
    // Received a event name loading will auto stop when event emitted
    loading: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  created() {
    if (this.loading) {
      this.$nuxt.$on(this.loading, this.onLoaded)
    }
  },
  beforeDestroy() {
    if (this.loading) {
      this.$nuxt.$off(this.loading, this.onLoaded)
    }
  },
  methods: {
    onLoaded() {
      this.isLoading = false
    },
  },
}
</script>
