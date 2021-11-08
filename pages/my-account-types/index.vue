<template>
  <div>
    <div class="space-y-4">
      <AccountTypesTable v-model="accountTypes" />

      <PaginationsCenteredNumbers
        v-if="meta.lastPage > 1"
        v-model="meta.currentPage"
        :last-page="meta.lastPage"
        @change="onChangePage"
      />
    </div>
  </div>
</template>

<script>
const params = {
  _perPage: 12,
  _relationships: [],
}

export default {
  middleware: [
    ({ $auth, error }) => {
      $auth.can('createAccountType') || error(403)
    },
  ],
  async asyncData({ $axios }) {
    const { data: accountTypes, meta } = await $axios.$get(
      'account-types/created-by-me',
      {
        params,
      }
    )

    return {
      accountTypes,
      meta,
    }
  },
  head() {
    return {
      title: `Danh sách kiểu tài khoản`,
    }
  },
  methods: {
    async onChangePage(page) {
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types/created-by-me',
        {
          params: {
            ...params,
            page,
          },
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
    },
  },
}
</script>
