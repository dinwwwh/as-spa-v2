<template>
  <Badges :color="$app.tag.getColor(tag)"> {{ tag.name }} </Badges>
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

