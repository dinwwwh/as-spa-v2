<template>
  <div class="my-16 space-y-12">
    <div class="space-y-2">
      <HeadingsBase1> Tài khoản #{{ account.id }} </HeadingsBase1>
      <div class="flex gap-3">
        <Badges class="first-letter:uppercase">
          {{ account.accountType.name }}
        </Badges>
        <Badges
          :color="$app.account.getStatusMeaning(account).color"
          class="first-letter:uppercase"
        >
          {{ $app.account.getStatusMeaning(account).name }}
        </Badges>
      </div>
    </div>

    <AccountsImagesSection
      :image-urls="account.images.map((image) => image.url)"
    />

    <Groups v-if="account.canUpdate">
      <Buttons color="yellow" @click="showUpdate = !showUpdate">
        Cập nhật
      </Buttons>
    </Groups>

    <!-- FOR BUYER -->
    <Groups v-if="$auth.user('id') === account.buyerId" class="space-y-6">
      <HeadingsBase3> Dành cho người mua tài khoản </HeadingsBase3>
      <Buttons color="yellow" @click="isShowBuyerInfos = !isShowBuyerInfos">
        Xem thông tin tài khoản
      </Buttons>
    </Groups>

    <div class="grid md:grid-cols-5 gap-6">
      <Groups class="space-y-6 md:col-span-3">
        <div class="flex gap-3 flex-wrap">
          <TagsBadgesLarge
            v-for="tag in account.tags"
            :key="'tag' + tag.slug"
            :tag="tag"
          />
        </div>
        <p class="text-gray-800">{{ account.description }}</p>
        <p class="text-yellow-500 flex gap-2 items-end text-xl tracking-wider">
          {{ $number.format(account.price) }}
          <AppBalance />
        </p>
      </Groups>

      <Groups class="md:col-span-2 space-y-2">
        <HeadingsBase3> Khi mua bạn sẽ nhận được </HeadingsBase3>

        <ul role="list">
          <li
            v-for="info in account.buyerOkeInfos"
            :key="info.id"
            class="py-4 flex md:py-0 md:pb-4"
          >
            <IconsCheck class="text-green-500" />
            <span class="ml-3 text-base text-gray-500">
              {{ info.name }}
            </span>
          </li>
        </ul>

        <Buttons class="w-full" @click="showBuy = !showBuy">
          Mua tài khoản này
        </Buttons>
      </Groups>
    </div>

    <Popups v-model="showUpdate">
      <AccountsUpdate :account-id="account.id" class="shadow-none" />
    </Popups>

    <Popups v-model="showBuy">
      <AccountsBuy v-model="account" class="shadow-none" />
    </Popups>

    <Popups v-model="isShowBuyerInfos">
      <AccountsBuyerInfos :account-id="account.id" class="shadow-none" />
    </Popups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: account } = await $axios.$get(`accounts/${params.id}`, {
      params: {
        _relationships: ['images', 'tags', 'buyerOkeInfos', 'accountType'],
        _computed: true,
        _abilities: true,
      },
    })

    return {
      account,
      showUpdate: false,
      showBuy: false,
      isShowBuyerInfos: false,
    }
  },
}
</script>
