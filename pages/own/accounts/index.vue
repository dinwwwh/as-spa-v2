<template>
  <div class="space-y-4">
    <div class="flex item-center justify-end">
      <InputsSearch
        v-model="params._search"
        :loading="isSearching"
        @model="onSearchChange"
      />
    </div>

    <AccountsTable
      :accounts="accounts"
      :fields="['id', 'description', 'price', 'status', 'tags', 'actions']"
    />

    <PaginationsCenteredNumbers
      v-if="meta.lastPage > 1"
      v-model="meta.currentPage"
      :last-page="meta.lastPage"
      @model="onPageChange"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  async asyncData({ $axios, $auth }) {
    const params = {
      _perPage: 12,
      _creatorId: $auth.user('id'),
      _relationships: ['tags'],
    }
    const { data: accounts, meta } = await $axios.$get('accounts', {
      params,
    })

    return {
      accounts,
      meta,
      params,
      isSearching: false,
    }
  },
  methods: {
    onSearchChange: debounce(async function () {
      this.isSearching = true
      const { data: accounts, meta } = await this.$axios.$get('accounts', {
        params: this.params,
      })

      this.accounts = accounts
      this.meta = meta
      this.isSearching = false
    }),
    onPageChange: debounce(async function (page) {
      const { data: accounts, meta } = await this.$axios.$get('accounts', {
        params: {
          ...this.params,
          page,
        },
      })

      this.accounts = accounts
      this.meta = meta
    }),
  },
}
</script>
