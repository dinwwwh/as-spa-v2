<template>
  <NuxtLink :to="{ name: 'index' }" class="h-12 w-auto inline-block">
    <img
      class="w-full h-full"
      :src="$app.findConfig('app_logo_url')"
      alt="Workflow"
    />
  </NuxtLink>
</template>

<script>
export default {}
</script>
