<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <NuxtLink :to="{ name: 'accounts-id', params: { id: account.id } }">
        <img
          class="h-48 w-full object-cover"
          :src="mainImage.url"
          alt="main image"
        />
      </NuxtLink>
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <div class="flex items-center flex-wrap gap-2">
          <TagsBadges v-for="tag in tags" :key="tag.slug" :tag="tag" />
        </div>
        <NuxtLink
          :to="{ name: 'accounts-id', params: { id: account.id } }"
          class="block mt-2"
        >
          <p class="mt-3 text-base text-gray-500">
            {{ account.description }}
          </p>
        </NuxtLink>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <NuxtLink :to="{ name: 'users-id', params: { id: creator.id } }">
            <img
              class="h-10 w-10 rounded-full"
              :src="creator.avatarUrl"
              alt="avatar"
            />
          </NuxtLink>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <NuxtLink
              :to="{ name: 'users-id', params: { id: creator.id } }"
              class="hover:underline"
            >
              {{ creator.name }}
            </NuxtLink>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time datetime="2020-03-16">
              {{ $dayjs(account.createdAt).fromNow() }}
            </time>
          </div>
        </div>
        <div class="flex-1 h-full flex items-end gap-1 justify-end">
          <span class="text-lg font-semibold text-yellow-400">
            {{ $number.format(account.price) }}
          </span>
          <AppBalance class="h-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  computed: {
    creator() {
      return this.account?.creator || {}
    },
    mainImage() {
      return this.account?.mainImage || {}
    },
    tags() {
      return (this.account?.tags || []).slice(0, 5)
    },
  },
}
</script>
