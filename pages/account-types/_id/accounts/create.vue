<template>
  <div class="my-16">
    <AccountsCreate :account-type-id="parseInt($route.params.id)" />
  </div>
</template>

<script>
export default {
  layout: 'primary',
  middleware: [
    'auth',
    async function ({ $axios, params, error }) {
      const { data: accountType } = await $axios.$get(
        `account-types/${params.id}`,
        {
          params: {
            _abilities: true,
          },
        }
      )

      if (!accountType.canCreateAccount) {
        error(403)
      }
    },
  ],
}
</script>
