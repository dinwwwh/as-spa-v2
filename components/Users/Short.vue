<template>
  <NuxtLink
    :to="{ name: 'users-id', params: { id: user.id } }"
    class="flex items-center group"
  >
    <div>
      <img class="inline-block h-9 w-9 rounded-full" :src="user.avatarUrl" />
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {{ user.name }}
      </p>
      <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
        @{{ user.login }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
