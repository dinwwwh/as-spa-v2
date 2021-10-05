<template>
  <div>
    <div
      class="
        h-96
        md:grid-cols-2
        md:rounded-2xl
        relative
        grid grid-cols-1 grid-rows-1
        gap-2
        overflow-hidden
        rounded-md
        shadow-sm
      "
    >
      <!-- Main image -->
      <div
        class="h-full bg-center bg-cover"
        :style="`background-image: url(${imageUrls[0]});`"
      ></div>
      <!-- Other images -->
      <div class="md:grid hidden h-full grid-cols-2 grid-rows-2 gap-2">
        <div
          v-for="i in 4"
          :key="imageUrls[i]"
          class="bg-center bg-cover"
          :style="`background-image: url(${imageUrls[i]});`"
        ></div>
      </div>

      <!-- View full images -->
      <button
        class="
          bottom-2
          right-2
          hover:transform
          hover:scale-105
          absolute
          flex
          items-center
          gap-1
          px-2
          py-1
          transition-transform
          bg-white
          border border-gray-400 border-solid
          rounded-md
          shadow
        "
        @click="isShowDetail = true"
      >
        <IconsViewGrid class="size-lg text-gray-600" />
        <span class="text-sm font-medium text-gray-600"> Xem chi tiết </span>
      </button>
    </div>

    <!-- View detail -->
    <PopupsFullScreen v-model="isShowDetail">
      <div class="max-w-2xl px-2 mx-auto space-y-4">
        <div v-for="imagePath in imageUrls" :key="imagePath + 'detail'">
          <img :src="imagePath" class="w-full rounded" />
        </div>
      </div>
    </PopupsFullScreen>
  </div>
</template>

<script>
export default {
  props: {
    imageUrls: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      isShowDetail: false,
    }
  },
}
</script>
