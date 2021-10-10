<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <template v-if="field === 'id'"> Mã </template>
          <template v-else-if="field === 'description'"> Mô tả </template>
          <template v-else-if="field === 'status'"> Trạng thái </template>
          <template v-else-if="field === 'tags'"> Nhãn </template>
          <template v-else-if="field === 'creator'"> Người đăng </template>
          <template v-else-if="field === 'buyer'"> Người mua </template>
          <template v-else-if="field === 'price'"> giá </template>
          <template v-else-if="field === 'boughtAtPrice'"> giá mua </template>
          <template v-else-if="field === 'createdAt'"> Tạo </template>
          <template v-else-if="field === 'updatedAt'"> Cập nhật </template>
          <template v-else-if="field === 'boughtAt'"> Mua </template>
          <template v-else-if="field === 'actions'">
            <span class="sr-only"> Hành động </span>
          </template>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="account in accounts" :key="account.id">
      <TablesData v-for="field in fields" :key="field + account.id">
        <template v-if="field === 'id'">{{ account.id }}</template>

        <template v-else-if="field === 'description'">
          {{ $string.limit(account.description, 40) }}
        </template>

        <template v-else-if="field === 'status'">
          <Badges :color="$app.account.getStatusMeaning(account).color">
            {{ $app.account.getStatusMeaning(account).name }}
          </Badges>
        </template>

        <div
          v-else-if="field === 'tags'"
          class="flex items-center flex-wrap gap-2"
        >
          <TagsBadges
            v-for="tag in getTags(account)"
            :key="tag.slug"
            :tag="tag"
          />
        </div>

        <template v-else-if="field === 'creator'">
          <NuxtLink
            :to="{ name: 'users-id', params: { id: getCreator(account).id } }"
          >
            {{ getCreator(account).name }}
          </NuxtLink>
        </template>

        <template v-else-if="field === 'buyer'">
          <NuxtLink
            :to="{ name: 'users-id', params: { id: getBuyer(account).id } }"
          >
            {{ getBuyer(account).name }}
          </NuxtLink>
        </template>

        <template v-else-if="field === 'price'">
          {{ $number.format(account.price) }}đ
        </template>

        <template v-else-if="field === 'boughtAtPrice'">
          <span v-if="account.boughtAtPrice">
            {{ $number.format(account.boughtAtPrice) }}đ
          </span>
        </template>

        <template v-else-if="field === 'createdAt'">
          <span v-if="account.boughtAtPrice">
            {{ $dayjs(account.createdAt).fromNow() }}
          </span>
        </template>

        <template v-else-if="field === 'updatedAt'">
          <span v-if="account.boughtAtPrice">
            {{ $dayjs(account.updatedAt).fromNow() }}
          </span>
        </template>

        <template v-else-if="field === 'boughtAt'">
          <span v-if="account.boughtAtPrice">
            {{ $dayjs(account.boughtAt).fromNow() }}
          </span>
        </template>

        <div v-else-if="field === 'actions'" class="flex items-center gap-1">
          <button
            v-if="account.buyerId === $auth.user('id')"
            title="Xem thông tin"
            @click="showBuyerInfos(account)"
          >
            <IconsInformationCircle />
          </button>

          <NuxtLink
            :to="{ name: 'accounts-id', params: { id: account.id } }"
            title="Xem chi tiết"
          >
            <IconsEye />
          </NuxtLink>
        </div>
      </TablesData>
    </TablesRow>

    <template #other>
      <Popups v-model="isShowBuyerInfos">
        <AccountsBuyerInfos
          v-if="currentAccount"
          class="shadow-none"
          :account-id="currentAccount.id"
        />
      </Popups>
    </template>
  </Tables>
</template>

<script>
export default {
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['id', 'description', 'status', 'tags', 'actions'],
    },
  },
  data() {
    return {
      currentAccount: undefined,
      isShowBuyerInfos: false,
    }
  },
  methods: {
    getTags(account) {
      return (account.tags || []).slice(0, 4)
    },
    getCreator(account) {
      return account.creator || {}
    },
    getBuyer(account) {
      return account.buyer || {}
    },
    showBuyerInfos(account) {
      this.isShowBuyerInfos = true
      this.currentAccount = account
    },
  },
}
</script>
