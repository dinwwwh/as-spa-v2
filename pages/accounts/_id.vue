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

    <div class="grid md:grid-cols-5 gap-6">
      <Groups class="space-y-6 md:col-span-3">
        <div class="flex gap-3">
          <TagsBadgesLarge
            v-for="tag in account.tags"
            :key="'tag' + tag.slug"
            :tag="tag"
          />
        </div>
        <p class="text-gray-800">{{ account.description }}</p>
      </Groups>

      <Groups class="md:col-span-2">
        <Buttons class="w-full" @click="showBuy = !showBuy">
          Mua tài khoản này
        </Buttons>
      </Groups>
    </div>

    <Popups v-model="showUpdate">
      <AccountsUpdate v-model="account" class="shadow-none" />
    </Popups>

    <Popups v-model="showBuy">
      <AccountsBuy v-model="account" class="shadow-none" />
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
      showBuy: false,
    }
  },
}
</script>
