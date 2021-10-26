<template>
  <div class="space-y-4">
    <div class="flex items-center justify-end">
      <InputsSearch
        v-model="params._search"
        :loading="isSearching"
        class="md:min-w-[250px]"
        @model="onSearchChange"
      />
    </div>

    <ValidationTable :validations="validations" />

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
  async asyncData({ $axios }) {
    const params = {
      _perPage: 12,
      _search: undefined,
    }

    const { data: validations, meta } = await $axios.$get('validations', {
      params,
    })

    return {
      params,
      validations,
      meta,
      isSearching: false,
    }
  },
  methods: {
    onPageChange: debounce(async function (page) {
      const { data: validations, meta } = await this.$axios.$get(
        'validations',
        {
          params: {
            ...this.params,
            page,
          },
        }
      )

      this.validations = validations
      this.meta = meta
    }, 200),
    onSearchChange: debounce(async function () {
      this.isSearching = true
      const { data: validations, meta } = await this.$axios.$get(
        'validations',
        {
          params: this.params,
        }
      )

      this.validations = validations
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
