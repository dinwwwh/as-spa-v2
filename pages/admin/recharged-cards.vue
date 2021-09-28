<template>
  <div class="space-y-12">
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-3">
      <Stats class="flex-1">
        Đang chờ
        <template #stat>
          <p class="text-blue-500">{{ pendingRechargedCards.length }}</p>
        </template>
      </Stats>

      <Stats class="flex-1">
        Đang duyệt
        <template #stat>
          <p class="text-green-500">{{ approvingRechargedCards.length }}</p>
        </template>
      </Stats>

      <Stats class="flex-1">
        Tổng
        <template #stat>
          <p class="text-gray-500">{{ meta.total }}</p>
        </template>
      </Stats>
    </div>

    <div class="space-y-6">
      <RechargedCardsTable :recharged-cards="rechargedCards" />

      <PaginationsCenteredNumbers
        v-model="meta.currentPage"
        :last-page="meta.lastPage"
        @model="onPageChange"
      />
    </div>
  </div>
</template>

<script>
const params = {
  _perPage: 12,
  _relationships: ['creator'],
  _sensitive: true,
}

export default {
  async asyncData({ $axios }) {
    const [
      { data: rechargedCards, meta },
      { data: approvingRechargedCards },
      { data: pendingRechargedCards },
    ] = await Promise.all([
      $axios.$get('recharged-cards', {
        params,
      }),
      $axios.$get('recharged-cards/approving'),
      $axios.$get('recharged-cards/pending'),
    ])

    return {
      rechargedCards,
      meta,
      pendingRechargedCards,
      approvingRechargedCards,
    }
  },
  methods: {
    async onPageChange(page) {
      const { data: rechargedCards, meta } = await this.$axios.$get(
        'recharged-cards',
        {
          params: {
            ...params,
            page,
          },
        }
      )
      this.rechargedCards = rechargedCards
      this.meta = meta
    },
  },
}
</script>
