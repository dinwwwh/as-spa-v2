<template>
  <BadgesLarge :color="$app.tag.getColor(tag)"> {{ tag.name }} </BadgesLarge>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
}
</script>

