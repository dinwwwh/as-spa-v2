<template>
  <div class="my-16 space-y-24">
    <Heros />

    <div class="space-y-4">
      <div class="flex justify-end">
        <InputsSearch
          v-model="search"
          class="md:min-w-[400px]"
          :loading="isSearching"
          @model="onChangeSearch"
        />
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.slug"
          :to="{ name: 'tags-slug', params: { slug: tag.slug } }"
        >
          <TagsCard :tag="tag" />
        </NuxtLink>
      </div>

      <PaginationsCenteredNumbers
        v-if="meta.lastPage > 1"
        v-model="meta.currentPage"
        :last-page="meta.lastPage"
        @model="onChangePage"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

const params = {
  _perPage: 12,
  type: 1,
}

export default {
  layout: 'primary',
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
  head() {
    return {
      title: 'Trang chủ',
    }
  },
  methods: {
    async onChangePage(page) {
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
