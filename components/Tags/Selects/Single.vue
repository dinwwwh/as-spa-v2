<template>
  <div>
    <SelectsSearchable
      v-bind="$attrs"
      :model="model"
      :options="options"
      track-by="name"
      :custom-label="(o) => o.name"
      :loading="loading"
      @model="$emit('model', $event)"
      @search-change="onSearch"
      v-on="$listeners"
    >
      <slot> Nhãn </slot>
      <template #description>
        <slot name="description"> Hãy viết có dấu nếu có thể. </slot>
      </template>
    </SelectsSearchable>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: null,
      required: true,
    },
  },
  data() {
    return {
      options: [],
      firstSearchedTags: [],
      loading: false,
      currentSearch: undefined,
    }
  },
  async fetch() {
    const { data: tags } = await this.$axios.$get('tags', {
      params: {
        _perPage: 12,
      },
    })
    this.options = tags
    this.firstSearchedTags = tags
  },
  methods: {
    onSearch(query) {
      clearTimeout(this.currentSearch)

      if (!query) {
        this.options = this.firstSearchedTags
        return
      }

      this.currentSearch = setTimeout(async () => {
        this.loading = true
        const { data: tags } = await this.$axios.$get('tags', {
          params: {
            _search: query,
          },
        })
        this.options = tags
        this.loading = false
      }, 500)
    },
  },
}
</script>
