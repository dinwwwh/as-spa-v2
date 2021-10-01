<template>
  <span
    class="
      inline-flex
      items-center
      px-3
      py-0.5
      rounded-full
      text-sm
      font-medium
    "
    :class="`bg-${color}-100 text-${color}-800`"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'indigo',
    },
  },
}
</script>
