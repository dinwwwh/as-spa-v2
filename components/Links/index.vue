<template>
  <NuxtLink
    class="font-medium text-indigo-600 hover:text-indigo-500"
    :to="to"
    v-on="$listeners"
  >
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
}
</script>
