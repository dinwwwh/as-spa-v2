<template>
  <div class="mt-16">
    <RechargedCardsDetail v-model="rechargedCard" />
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: rechargedCard } = await $axios.$get(
      `recharged-cards/${params.id}`,
      {
        params: {
          _relationships: ['creator', 'approver'],
          _computed: true,
          _sensitive: true,
          _abilities: true,
        },
      }
    )
    return {
      rechargedCard,
    }
  },
  head() {
    return {
      title: `Thẻ nạp #${this.rechargedCard?.id}`,
    }
  },
}
</script>
