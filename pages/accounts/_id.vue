<template>
  <div class="my-16 space-y-12">
    <AccountsImagesSection
      :image-urls="account.images.map((image) => image.url)"
    />

    <Groups v-if="account.canUpdate">
      <Buttons color="yellow" @click="showUpdate = !showUpdate">
        Cập nhật
      </Buttons>
    </Groups>

    <Groups class="space-y-6">
      <div class="flex gap-3">
        <TagsBadgesLarge
          v-for="tag in account.tags"
          :key="'tag' + tag.id"
          :tag="tag"
        />
      </div>
      <p class="text-gray-800">{{ account.description }}</p>
    </Groups>

    <Popups v-model="showUpdate">
      <AccountsUpdate v-model="account" class="shadow-none" />
    </Popups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: account } = await $axios.$get(`accounts/${params.id}`, {
      params: {
        _relationships: ['images', 'tags'],
        _computed: true,
        _abilities: true,
      },
    })

    return {
      account,
      showUpdate: false,
    }
  },
}
</script>
