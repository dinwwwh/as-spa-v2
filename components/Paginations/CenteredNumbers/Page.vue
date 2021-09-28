<template>
  <div
    class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
    :class="{
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer':
        !highlighted,
      'border-indigo-500 text-indigo-600': highlighted,
    }"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
