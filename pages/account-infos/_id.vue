<template>
  <div class="my-16 space-y-8">
    <div>
      <HeadingsBase1>
        Thông tin tài khoản {{ accountInfo.name }}
        <BadgesLarge>#{{ accountInfo.id }}</BadgesLarge>
      </HeadingsBase1>
    </div>

    <MessagesInfo v-if="accountInfo.description">
      {{ accountInfo.description }}
    </MessagesInfo>

    <Groups v-if="accountInfo.canUpdate" class="flex items-center justify-end">
      <Buttons
        v-if="accountInfo.canUpdate"
        color="yellow"
        @click="showUpdateScreen = !showUpdateScreen"
      >
        Cập nhật
      </Buttons>
    </Groups>

    <Popups v-model="showUpdateScreen">
      <AccountInfosUpdate v-model="accountInfo" class="shadow-none" />
    </Popups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: accountInfo } = await $axios.$get(
      `account-infos/${params.id}`,
      {
        params: {
          _abilities: true,
          _relationships: ['accountType'],
        },
      }
    )

    return {
      accountInfo,
      showUpdateScreen: false,
    }
  },
}
</script>
