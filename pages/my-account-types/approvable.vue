<template>
  <div class="space-y-4">
    <div class="flex items-center justify-end">
      <InputsSearch
        v-model="params._search"
        class="md:min-w-[260px]"
        :loading="isSearching"
        @model="onSearchChange"
      />
    </div>

    <AccountsTable :accounts="accounts" />

    <PaginationsCenteredNumbers
      v-if="meta.lastPage > 1"
      v-model="meta.currentPage"
      :last-page="meta.lastPage"
      @model="onPageChange"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  async asyncData({ $axios }) {
    const params = {
      _perPage: 12,
      _confirmedErrorAndApprovableByMe: true,
      _ability: true,
      _relationships: ['tags'],
    }

    const { data: accounts, meta } = await $axios.$get('accounts', { params })

    return {
      accounts,
      params,
      meta,
      isSearching: false,
    }
  },
  methods: {
    onPageChange: debounce(async function (page) {
      const { data: accounts, meta } = await this.$axios.$get('accounts', {
        params: {
          ...this.params,
          page,
        },
      })

      this.accounts = accounts
      this.meta = meta
    }, 300),
    onSearchChange: debounce(async function (search) {
      this.isSearching = true
      const { data: accounts, meta } = await this.$axios.$get('accounts', {
        params: this.params,
      })

      this.accounts = accounts
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
