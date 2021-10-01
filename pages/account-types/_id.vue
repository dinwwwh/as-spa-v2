<template>
  <div class="my-16 space-y-12">
    <div class="space-y-6">
      <HeadingsBase1>
        Kiểu tài khoản {{ accountType.name }}
        <span class="text-xl text-gray-500 italic">#{{ accountType.id }}</span>
      </HeadingsBase1>

      <div>
        <Buttons color="yellow" @click="showUpdateScreen = !showUpdateScreen">
          Cập nhật
        </Buttons>
      </div>
    </div>

    <div class="space-y-2">
      <HeadingsBase5> Các nhãn </HeadingsBase5>
      <div class="flex gap-2 flex-wrap">
        <Badges v-for="tag in accountType.tags" :key="tag.id">
          {{ tag.name }}
        </Badges>
      </div>
    </div>

    <Popups v-model="showUpdateScreen">
      <AccountTypesUpdate v-model="accountType" class="shadow-none" />
    </Popups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: accountType } = await $axios.$get(
      `account-types/${params.id}`,
      {
        params: {
          _abilities: true,
          _relationships: ['tags', 'users'],
        },
      }
    )

    return {
      accountType,
      showUpdateScreen: false,
    }
  },
}
</script>
