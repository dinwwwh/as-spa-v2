<template>
  <nav class="flex items-center justify-center" aria-label="Progress">
    <p class="text-sm font-medium">
      Bước {{ currentStep }} trên {{ lastStep }}
    </p>
    <ol role="list" class="ml-8 flex items-center space-x-5">
      <!-- Completed Step -->
      <li v-for="step in currentStep - 1" :key="step">
        <button
          class="
            block
            w-2.5
            h-2.5
            bg-indigo-600
            rounded-full
            hover:bg-indigo-900
          "
          @click="moveTo(step)"
        >
          <span class="sr-only"> Bước {{ step }} </span>
        </button>
      </li>

      <!-- Current Step -->
      <li>
        <div
          class="relative flex items-center justify-center"
          aria-current="step"
        >
          <span class="absolute w-5 h-5 p-px flex" aria-hidden="true">
            <span class="w-full h-full rounded-full bg-indigo-200"></span>
          </span>
          <span
            class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Bước {{ currentStep }}</span>
        </div>
      </li>

      <!-- Upcoming Step -->
      <li v-for="step in lastStep - currentStep" :key="step">
        <div
          class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400"
        >
          <span class="sr-only">Bước {{ step }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'currentStep',
    event: 'moved',
  },
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    lastStep: {
      type: Number,
      required: true,
    },
  },
  methods: {
    moveTo(step) {
      this.$emit('moved', step)
    },
  },
}
</script>

