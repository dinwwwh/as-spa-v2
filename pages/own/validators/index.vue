<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <InputsSearch
        v-model="params._search"
        class="md:min-w-[250px]"
        :loading="isSearching"
        @model="onSearchChange"
      />
    </div>

    <ValidatorsTable :validators="validators" />

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
      _abilities: true,
    }

    const { data: validators, meta } = await $axios.$get('validators', {
      params,
    })

    return {
      validators,
      meta,
      params,
      isSearching: false,
    }
  },
  methods: {
    onSearchChange: debounce(async function () {
      this.isSearching = true
      const { data: validators, meta } = await this.$axios.$get('validators', {
        params: this.params,
      })

      this.validators = validators
      this.meta = meta
      this.isSearching = false
    }, 500),

    onPageChange: debounce(async function (page) {
      const { data: validators, meta } = await this.$axios.$get('validators', {
        params: {
          ...this.params,
          page,
        },
      })

      this.validators = validators
      this.meta = meta
    }, 200),
  },
}
</script>
