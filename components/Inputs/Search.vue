<template>
  <div class="relative text-sky-100 text-gray-600 focus-within:text-gray-400">
    <div
      class="
        pointer-events-none
        absolute
        inset-y-0
        left-0
        pl-3
        flex
        items-center
      "
    >
      <IconsSearch v-if="!loading" class="h-5" />
      <IconsLoading v-else class="h-5 animate-spin" />
    </div>
    <input
      name="search"
      class="
        block
        w-full
        bg-sky-700 bg-opacity-50
        py-2
        pl-10
        pr-3
        border border-transparent
        rounded-md
        leading-5
        placeholder-sky-100
        focus:outline-none
        focus:bg-white
        focus:ring-white
        focus:border-white
        focus:placeholder-gray-500
        focus:text-gray-900
        sm:text-sm
      "
      :placeholder="$attrs.placeholder || 'Tìm kiếm'"
      type="search"
      v-bind="$attrs"
      v-on="$listeners"
      @input="$emit('model', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
