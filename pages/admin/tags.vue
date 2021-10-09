<template>
  <div class="space-y-12">
    <div class="space-y-3">
      <div class="flex justify-end">
        <InputsSearch
          v-model="search"
          :loading="isSearching"
          class="md:min-w-[300px]"
          @model="onChangeSearch"
        />
      </div>
      <TagsTable :tags="tags" />
      <PaginationsCenteredNumbers
        v-if="meta.lastPage > 1"
        v-model="meta.currentPage"
        :last-page="meta.lastPage"
        @model="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

const params = {
  _abilities: true,
  _relationships: ['parent'],
  _perPage: 12,
}

export default {
  middleware: [
    ({ $auth, error }) => {
      !$auth.user.canManageTag && error(403)
    },
  ],
  async asyncData({ $axios }) {
    const { data: tags, meta } = await $axios.$get('tags', {
      params,
    })

    return {
      tags,
      meta,
      search: undefined,
      isSearching: false,
    }
  },
  methods: {
    async onPageChange(page) {
      const { data: tags, meta } = await this.$axios.$get('tags', {
        params: {
          ...params,
          page,
          _search: this.search,
        },
      })

      this.tags = tags
      this.meta = meta
    },
    onChangeSearch: debounce(async function (_search) {
      this.isSearching = true
      const { data: tags, meta } = await this.$axios.$get('tags', {
        params: {
          ...params,
          _search,
        },
      })

      this.tags = tags
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
