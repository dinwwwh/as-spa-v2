<template>
  <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
    <div class="text-sm font-medium text-gray-500 truncate">
      <slot />
    </div>
    <div class="mt-1 text-3xl font-semibold text-gray-900">
      <slot name="stat" />
    </div>
  </div>
</template>

<script>
export default {}
</script>
