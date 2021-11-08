<template>
  <div class="space-y-12">
    <AccountTypesCreate />
  </div>
</template>

<script>
export default {
  middleware: [
    ({ $auth, error }) => {
      $auth.can('createAccountType') || error(403)
    },
  ],
  head() {
    return {
      title: `Tạo kiểu tài khoản`,
    }
  },
}
</script>
