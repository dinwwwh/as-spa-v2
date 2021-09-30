<template>
  <div>
    <SelectsMultiple
      v-bind="$attrs"
      :model="model"
      :options="options"
      track-by="id"
      :custom-label="(o) => `${o.name} / @${o.login}`"
      :loading="loading"
      @model="$emit('model', $event)"
      @search-change="onSearch"
      v-on="$listeners"
    >
      <slot> Các người dùng </slot>
      <template #description>
        <slot name="description">
          Bạn có thể tìm kiếm theo tên, id, username và email.
        </slot>
      </template>
    </SelectsMultiple>
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
      loading: false,
      currentSearch: undefined,
    }
  },
  methods: {
    onSearch(query) {
      clearTimeout(this.currentSearch)

      if (!query) {
        return
      }

      this.currentSearch = setTimeout(async () => {
        this.loading = true
        const { data: users } = await this.$axios.$get(
          'users/search-strictly',
          {
            params: {
              _search: query,
            },
          }
        )
        this.options = users
        this.loading = false
      }, 500)
    },
  },
}
</script>
