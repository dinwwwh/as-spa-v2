<template>
  <div class="space-y-4">
    <div class="flex items-center justify-end">
      <InputsSearch
        v-model="params._search"
        :loading="isSearching"
        @model="onSearchChange"
      />
    </div>

    <AccountTypesTable v-model="accountTypes" />

    <PaginationsCenteredNumbers
      v-model="meta.currentPage"
      :last-page="meta.lastPage"
      @model="onPageChange"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  async asyncData({ $axios }) {
    const params = {
      _perPage: 12,
    }

    const { data: accountTypes, meta } = await $axios.$get('account-types', {
      params,
    })

    return {
      params,
      accountTypes,
      meta,
      isSearching: false,
    }
  },
  methods: {
    onPageChange: debounce(async function (page) {
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types',
        {
          params: {
            ...this.params,
            page,
          },
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
    }, 300),
    onSearchChange: debounce(async function () {
      this.isSearching = true

      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types',
        {
          params: this.params,
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
