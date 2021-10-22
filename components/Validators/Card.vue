<template>
  <Groups v-on="$listeners">
    <HeadingsBase4> {{ validator.name }} </HeadingsBase4>
    <p class="text-gray-500 text-sm">{{ validator.description }}</p>
  </Groups>
</template>

<script>
export default {
  props: {
    validator: {
      type: Object,
      required: true,
    },
  },
}
</script>
