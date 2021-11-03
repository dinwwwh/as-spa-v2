<template>
  <div class="space-y-8 my-12">
    <HeadingsBase1> Chọn kiểu tài khoản sẽ đăng lên shop </HeadingsBase1>

    <div class="space-y-4">
      <div class="flex items-center justify-end">
        <InputsSearch
          v-model="params._search"
          class="md:min-w-[260px]"
          :loading="isSearching"
          @model="onSearchChange"
        />
      </div>

      <ul v-if="accountTypes.length > 0" class="flex gap-4">
        <li v-for="accountType in accountTypes" :key="accountType.id">
          <NuxtLink
            :to="{
              name: 'account-types-id-accounts-create',
              params: {
                id: accountType.id,
              },
            }"
          >
            <Groups>
              <HeadingsBase5> {{ accountType.name }} </HeadingsBase5>
              <Badges
                v-for="tag in accountType.tags"
                :key="accountType.id + tag.slug"
              >
                {{ tag.name }}
              </Badges>
            </Groups>
          </NuxtLink>
        </li>
      </ul>

      <div v-else class="text-center tracking-wider text-gray-500">
        Có vẻ như bạn không có quyên sử dụng bất cứ loại tài khoản nào.
      </div>

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

export default {
  layout: 'primary',
  middleware: ['auth'],
  async asyncData({ $axios }) {
    const params = {
      _perPage: 12,
      _relationships: ['tags'],
    }

    const { data: accountTypes, meta } = await $axios.$get(
      'account-types/usable',
      {
        params,
      }
    )

    return {
      accountTypes,
      params,
      meta,
      isSearching: false,
    }
  },
  head() {
    return {
      title: 'Đăng tài khoản lên shop',
    }
  },
  methods: {
    onSearchChange: debounce(async function () {
      this.isSearching = true
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types/usable',
        {
          params: this.params,
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
      this.isSearching = false
    }, 500),
    onPageChange: debounce(async function (page) {
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types/usable',
        {
          params: {
            ...this.params,
            page,
          },
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
    }, 500),
  },
}
</script>
