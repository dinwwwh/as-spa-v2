<template>
  <div class="pt-16 pb-20 space-y-12">
    <HeadingsBase1 class="text-center">
      Danh sách tài khoản đang bán của game {{ tag.name }}
    </HeadingsBase1>

    <div class="space-y-4">
      <div class="flex justify-end">
        <InputsSearch
          v-model="search"
          :loading="isSearching"
          class="md:min-w-[400px]"
          @model="onChangeSearch"
        />
      </div>

      <p
        v-if="!accounts || accounts.length === 0"
        class="text-gray-500 tracking-wider text-center"
      >
        Rất tiếc 😥😥😥 tất cả tài khoản hiện tại đều đã bán
      </p>

      <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AccountsCard
          v-for="account in accounts"
          :key="account.id"
          :account="account"
        />
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

const axiosParams = {
  _perPage: 12,
  _relationships: ['mainImage', 'creator', 'tags'],
  _computed: true,
}

export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const [{ data: tag }, { data: accounts, meta }] = await Promise.all([
      $axios.$get(`tags/${params.slug}`),
      $axios.$get(`tags/${params.slug}/accounts/selling`, {
        params: axiosParams,
      }),
    ])

    return {
      tag,
      accounts,
      meta,
      search: undefined,
      isSearching: false,
    }
  },
  methods: {
    onChangePage: debounce(async function (page) {
      const { data: accounts, meta } = await this.$axios.$get(
        `tags/${this.$route.params.slug}/accounts/selling`,
        {
          params: {
            ...axiosParams,
            _search: this.search,
            page,
          },
        }
      )

      this.accounts = accounts
      this.meta = meta
    }, 200),
    onChangeSearch: debounce(async function (_search) {
      this.isSearching = true
      const { data: accounts, meta } = await this.$axios.$get(
        `tags/${this.$route.params.slug}/accounts/selling`,
        {
          params: {
            ...axiosParams,
            _search,
          },
        }
      )

      this.accounts = accounts
      this.meta = meta
      this.isSearching = false
    }, 500),
  },
}
</script>
