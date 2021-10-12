<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <InputsSearch
        v-model="search"
        :loading="isSearching"
        class="md:min-w-[250px]"
        @model="onChangeSearch"
      />
    </div>

    <UsersTable :users="users" />

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
  _perPage: 12,
  _sensitive: true,
  _abilities: true,
}

export default {
  middleware: [
    ({ $auth, error }) => {
      !$auth.can('manageUser') && error(403)
    },
  ],
  async asyncData({ $axios }) {
    const { data: users, meta } = await $axios.$get('users', {
      params,
    })

    return {
      users,
      meta,
      search: undefined,
      isSearching: false,
    }
  },
  methods: {
    onChangePage: debounce(async function (page) {
      const { data: users, meta } = await this.$axios.$get('users', {
        params: {
          ...params,
          page,
          _search: this.search,
        },
      })

      this.users = users
      this.meta = meta
    }, 200),
    onChangeSearch: debounce(async function (_search) {
      this.isSearching = true
      const { data: users, meta } = await this.$axios.$get('users', {
        params: {
          ...params,
          _search,
        },
      })

      this.users = users
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
