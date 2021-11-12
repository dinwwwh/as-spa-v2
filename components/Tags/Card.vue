<template>
  <div class="rounded bg-white shadow overflow-hidden">
    <div
      class="pt-[66%] bg-center bg-cover"
      :style="`background-image: url(${tag.mainImageUrl})`"
    ></div>
    <div class="flex justify-end py-4 px-2">
      <HeadingsBase4> {{ tag.name }} </HeadingsBase4>
    </div>
  </div>
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
