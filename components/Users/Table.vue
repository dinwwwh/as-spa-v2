<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <template v-if="field === 'name'"> Tên </template>
          <template v-else-if="field === 'login'"> Tài khoản </template>
          <template v-else-if="field === 'email'"> Email </template>
          <template v-else-if="field === 'balance'"> Số dư </template>
          <template v-else-if="field === 'updatedAt'"> Cập nhật </template>
          <template v-else-if="field === 'actions'">
            <span class="sr-only"> Hành động </span>
          </template>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="user in users" :key="user.id">
      <TablesData v-for="field in fields" :key="user.id + field">
        <template v-if="field === 'login'">
          <span class="text-gray-800 font-medium">{{ user.login }}</span>
        </template>

        <template v-else-if="field === 'name'">
          {{ user.name }}
        </template>

        <template v-else-if="field === 'email'">
          {{ user.email }}
        </template>

        <template v-else-if="field === 'balance'">
          {{ $number.format(user.balance) }}đ
        </template>

        <template v-else-if="field === 'updatedAt'">
          {{ $dayjs(user.updatedAt).fromNow() }}
        </template>

        <div v-else-if="field === 'actions'" class="flex flex-wrap gap-2">
          <button
            v-if="user.canUpdate"
            title="Cập nhật số dư"
            @click="showUpdateBalance(user)"
          >
            <IconsCashPlus class="h-5 hover:text-indigo-600 cursor-pointer" />
          </button>
          <NuxtLink
            :to="{ name: 'users-id', params: { id: user.id } }"
            title="Xem chi tiết"
          >
            <IconsEye class="h-5 hover:text-indigo-600 cursor-pointer" />
          </NuxtLink>
        </div>
      </TablesData>
    </TablesRow>

    <template #other>
      <Popups v-model="isShowUpdateBalance">
        <UsersUpdateBalance
          v-if="currentUser"
          :user-id="currentUser.id"
          class="!shadow-none"
        />
      </Popups>
    </template>
  </Tables>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['login', 'name', 'email', 'balance', 'actions'],
    },
  },
  data() {
    return {
      isShowUpdateBalance: false,
      currentUser: undefined,
    }
  },
  methods: {
    showUpdateBalance(user) {
      this.isShowUpdateBalance = true
      this.currentUser = user
    },
  },
}
</script>
