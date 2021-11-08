<template>
  <div class="my-12 space-y-8">
    <div class="border-b border-gray-200">
      <div class="sm:flex sm:items-baseline">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Kiểu tài khoản của tôi
        </h3>
        <div class="mt-4 sm:mt-0 sm:ml-10">
          <nav class="-mb-px flex space-x-8">
            <NuxtLink
              :to="{
                name: 'my-account-types-create',
              }"
              class="
                _link
                text-gray-500
                hover:text-gray-700 hover:border-gray-300
                whitespace-nowrap
                pb-4
                px-1
                border-b-2
                font-medium
                text-sm
              "
              aria-current="page"
            >
              Tạo mới
            </NuxtLink>

            <NuxtLink
              :to="{
                name: 'my-account-types',
              }"
              class="
                _link
                text-gray-500
                hover:text-gray-700 hover:border-gray-300
                whitespace-nowrap
                pb-4
                px-1
                border-b-2
                font-medium
                text-sm
              "
              aria-current="page"
            >
              Danh sách
            </NuxtLink>

            <NuxtLink
              :to="{
                name: 'my-account-types-approvable',
              }"
              class="
                _link
                text-gray-500
                hover:text-gray-700 hover:border-gray-300
                whitespace-nowrap
                pb-4
                px-1
                border-b-2
                font-medium
                text-sm
              "
              aria-current="page"
            >
              Phê duyệt
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: 'primary',
  middleware: [
    'auth',
    function ({ error, $auth }) {
      if (!$auth.can('createAccountType')) {
        return error(403)
      }
    },
  ],
}
</script>

<style scoped>
.nuxt-link-exact-active._link {
  @apply border-indigo-500 text-indigo-600;
}
</style>
