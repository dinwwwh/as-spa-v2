<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="
        flex
        items-center
        gap-3
        p-3
        text-blue-600
        bg-blue-100
        border border-blue-300 border-solid
        rounded-md
        font-medium
        relative
      "
    >
      <div><IconsInformationCircle class="h-6" /></div>
      <div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>
