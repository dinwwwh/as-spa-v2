<template>
  <div class="space-y-12">
    <AccountTypesCreate />
  </div>
</template>

<script>
export default {
  middleware: [
    ({ $auth, error }) => {
      $auth.user.canCreateAccountType || error(403)
    },
  ],
}
</script>
