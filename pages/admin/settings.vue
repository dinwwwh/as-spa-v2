<template>
  <div class="space-y-4">
    <div class="flex items-center justify-end">
      <InputsSearch
        v-model="search"
        class="min-w-[250px]"
        :loading="isSearching"
        @model="onChangeSearch"
      />
    </div>

    <SettingsTable :settings="settings" />

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
  _sensitive: true,
  _perPage: 12,
  _abilities: true,
}

export default {
  middleware: [
    ({ $auth, error }) => {
      !$auth.can('manageSetting') && error(403)
    },
  ],
  async asyncData({ $axios }) {
    const { data: settings, meta } = await $axios.$get('settings', {
      params,
    })

    return {
      settings,
      meta,
      search: undefined,
      isSearching: false,
    }
  },
  methods: {
    async onChangePage(page) {
      const { data: settings, meta } = await this.$axios.$get('settings', {
        params: {
          ...params,
          page,
          _search: this.search,
        },
      })

      this.settings = settings
      this.meta = meta
    },
    debounce,
    onChangeSearch: debounce(async function (_search) {
      this.isSearching = true
      const { data: settings, meta } = await this.$axios.$get('settings', {
        params: {
          ...params,
          _search,
        },
      })

      this.settings = settings
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
