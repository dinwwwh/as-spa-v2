<template>
  <div class="space-y-4">
    <div class="flex items-center justify-end">
      <InputsSearch
        v-model="search"
        class="md:min-w-[250px]"
        :loading="isSearching"
        @model="onChangeSearch"
      />
    </div>

    <AccountsTable
      :accounts="accounts"
      :fields="['id', 'status', 'tags', 'boughtAtPrice', 'boughtAt', 'actions']"
    />

    <PaginationsCenteredNumbers
      v-if="meta.lastPage > 1"
      v-model="meta.currentPage"
      :last-page="meta.lastPage"
      @model="onChangePage"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'

const params = {
  _relationships: ['tags'],
  _computed: true,
  _perPage: 12,
}

export default {
  async asyncData({ $axios }) {
    const { data: accounts, meta } = await $axios.$get(
      'accounts/bought-by-me',
      {
        params,
      }
    )

    return {
      accounts,
      search: undefined,
      meta,
      isSearching: false,
    }
  },
  methods: {
    onChangeSearch: debounce(async function (_search) {
      this.isSearching = true
      const { data: accounts, meta } = await this.$axios.$get(
        'accounts/bought-by-me',
        {
          params: {
            ...params,
            _search,
          },
        }
      )

      this.accounts = accounts
      this.meta = meta
      this.isSearching = false
    }, 500),

    onChangePage: debounce(async function (page) {
      const { data: accounts, meta } = await this.$axios.$get(
        'accounts/bought-by-me',
        {
          params: {
            ...params,
            search: this.search,
            page,
          },
        }
      )

      this.accounts = accounts
      this.meta = meta
    }, 200),
  },
}
</script>
