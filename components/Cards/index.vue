<template>
  <Groups>
    <div>
      <span
        class="
          flex
          items-center
          justify-center
          h-12
          w-12
          rounded-md
          bg-gray-100
        "
      >
        <slot name="icon">
          <IconsList class="h-6" />
        </slot>
      </span>
    </div>
    <div class="mt-6">
      <h3 class="text-lg font-medium text-gray-700"><slot /></h3>
      <p class="mt-2 text-base text-gray-500"><slot name="description" /></p>
    </div>
  </Groups>
</template>

<script>
export default {}
</script>
