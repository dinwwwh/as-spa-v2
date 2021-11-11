<template>
  <div class="my-12">
    <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <!-- Account -->
      <NuxtLink
        :to="{
          name: 'my-accounts-create',
        }"
      >
        <Cards class="h-full">
          Đăng tài khoản lên shop
          <template #icon><IconsPlus /></template>
          <template #description>
            Giúp bạn đăng tài khoản lên website bán kiếm thu nhập
          </template>
        </Cards>
      </NuxtLink>
      <NuxtLink
        :to="{
          name: 'my-accounts',
        }"
      >
        <Cards class="h-full">
          Danh sách tài khoản đã đăng
          <template #description>
            Xem danh sách tài khoản đã đăng lên website
          </template>
        </Cards>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  middleware: 'auth',
  head() {
    return {
      title: 'Cửa hàng của tôi',
    }
  },
}
</script>

