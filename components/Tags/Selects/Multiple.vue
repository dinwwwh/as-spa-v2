<template>
  <div>
    <SelectsMultipleTaggable
      v-bind="$attrs"
      :model="model"
      :options="options"
      track-by="name"
      :custom-label="(o) => o.name"
      :loading="loading"
      @model="$emit('model', $event)"
      @tag="onTag"
      @search-change="onSearch"
      v-on="$listeners"
    >
      <slot> Các nhãn </slot>
      <template #description>
        <slot name="description"> Hãy viết có dấu nếu có thể. </slot>
      </template>
    </SelectsMultipleTaggable>
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
      type: Array,
      required: true,
      default() {
        const val = []
        this.$emit('model', val)
        return val
      },
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
    onTag(name) {
      if (!this.model.find((tag) => tag.name === name)) {
        this.$emit('model', [...this.model, { name }])
      }
    },
  },
}
</script>
