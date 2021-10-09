<template>
  <div class="rounded bg-white shadow overflow-hidden">
    <div>
      <img src="https://picsum.photos/id/237/1080/1080" alt="image" />
    </div>
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
