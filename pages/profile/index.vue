<template>
  <div class="space-y-10">
    <AuthProfileUpdate :user="profile" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data: profile } = await $axios.$get('profile', {
      params: {
        _computed: true,
      },
    })

    return {
      profile,
    }
  },
}
</script>
