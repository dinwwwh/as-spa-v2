<template>
  <div class="my-16 space-y-12">
    <div class="space-y-6">
      <HeadingsBase1>
        Kiểu tài khoản {{ accountType.name }}
        <span class="text-xl text-gray-500 italic">#{{ accountType.id }}</span>
      </HeadingsBase1>

      <div class="flex items-center gap-3">
        <Buttons color="yellow" @click="showUpdateScreen = !showUpdateScreen">
          Cập nhật
        </Buttons>
        <Buttons
          color="green"
          @click="showCreateAccountInfo = !showCreateAccountInfo"
        >
          Thêm thông tin tài khoản
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

    <div class="space-y-2">
      <HeadingsBase5> Các thông tin tài khoản </HeadingsBase5>
      <div class="flex gap-2 flex-wrap">
        <NuxtLink
          v-for="accountInfo in accountType.accountInfos"
          :key="accountInfo.id"
          :to="{ name: 'account-infos-id', params: { id: accountInfo.id } }"
        >
          <Badges>
            {{ accountInfo.name }}
          </Badges>
        </NuxtLink>
      </div>
    </div>

    <Popups v-model="showUpdateScreen">
      <AccountTypesUpdate v-model="accountType" class="shadow-none" />
    </Popups>

    <Popups v-model="showCreateAccountInfo">
      <AccountInfosCreate
        :account-type="accountType"
        class="shadow-none"
        @created="accountType.accountInfos.push($event)"
      />
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
          _relationships: ['tags', 'users', 'accountInfos'],
        },
      }
    )

    return {
      accountType,
      showUpdateScreen: false,
      showCreateAccountInfo: false,
    }
  },
}
</script>
