<template>
  <div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-class="opacity-0 translate-y-1/4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1/4"
    >
      <div
        v-if="isShow"
        class="bg-gray-50 fixed inset-0 z-50 overflow-y-auto overflow-x-hidden"
      >
        <!-- Header -->
        <div class="flex flex-row-reverse py-4 px-2 sm:px-6 lg:px-8">
          <!-- Close action -->
          <button
            type="button"
            class="
              -mr-1
              flex
              p-2
              rounded-md
              hover:bg-indigo-500
              focus:outline-none
              focus:ring-2 focus:ring-white
            "
            @click="isShow = false"
          >
            <IconsX class="size-xl text-gray-600" />
          </button>
        </div>
        <!-- Body -->
        <div>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShow: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('change', !!val)
      },
    },
  },
}
</script>
