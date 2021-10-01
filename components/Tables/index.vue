<template>
  <div
    class="
      shadow
      border-b border-gray-200
      rounded-sm
      sm:rounded-lg
      overflow-x-auto
    "
  >
    <table class="divide-y divide-gray-200 w-full">
      <thead class="bg-gray-50">
        <slot name="head" />
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>
