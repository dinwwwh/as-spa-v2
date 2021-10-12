<template>
  <main class="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav class="space-y-1">
          <!-- Current: "bg-gray-50 text-orange-600 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" -->
          <NuxtLink
            :to="{
              name: 'admin',
            }"
            class="
              text-gray-700
              hover:text-gray-800
              hover:bg-gray-50
              group
              rounded-md
              px-3
              py-2
              flex
              items-center
              text-sm
              font-medium
            "
          >
            <IconsDashBoard
              class="
                text-gray-400
                group-hover:text-gray-500
                flex-shrink-0
                -ml-1
                mr-3
                size-2xl
                _icon
              "
            />
            <span class="truncate"> Thống kê </span>
          </NuxtLink>

          <NuxtLink
            :to="{
              name: 'admin-recharged-cards',
            }"
            class="
              text-gray-700
              hover:text-gray-800
              hover:bg-gray-50
              group
              rounded-md
              px-3
              py-2
              flex
              items-center
              text-sm
              font-medium
            "
          >
            <IconsCreditCard
              class="
                text-gray-400
                group-hover:text-gray-500
                flex-shrink-0
                -ml-1
                mr-3
                size-2xl
                _icon
              "
            />
            <span class="truncate"> Thẻ nạp </span>
          </NuxtLink>

          <NuxtLink
            v-if="$auth.can('manageTag')"
            :to="{
              name: 'admin-tags',
            }"
            class="
              text-gray-700
              hover:text-gray-800
              hover:bg-gray-50
              group
              rounded-md
              px-3
              py-2
              flex
              items-center
              text-sm
              font-medium
            "
          >
            <IconsTag
              class="
                text-gray-400
                group-hover:text-gray-500
                flex-shrink-0
                -ml-1
                mr-3
                size-2xl
                _icon
              "
            />
            <span class="truncate"> Nhãn </span>
          </NuxtLink>

          <NuxtLink
            v-if="$auth.can('manageUser')"
            :to="{
              name: 'admin-users',
            }"
            class="
              text-gray-700
              hover:text-gray-800
              hover:bg-gray-50
              group
              rounded-md
              px-3
              py-2
              flex
              items-center
              text-sm
              font-medium
            "
          >
            <IconsUsers
              class="
                text-gray-400
                group-hover:text-gray-500
                flex-shrink-0
                -ml-1
                mr-3
                size-2xl
                _icon
              "
            />
            <span class="truncate"> Người dùng </span>
          </NuxtLink>

          <NuxtLink
            v-if="$auth.can('manageSetting')"
            :to="{
              name: 'admin-settings',
            }"
            class="
              text-gray-700
              hover:text-gray-800
              hover:bg-gray-50
              group
              rounded-md
              px-3
              py-2
              flex
              items-center
              text-sm
              font-medium
            "
          >
            <IconsCog
              class="
                text-gray-400
                group-hover:text-gray-500
                flex-shrink-0
                -ml-1
                mr-3
                size-2xl
                _icon
              "
            />
            <span class="truncate"> Cài đặt </span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Detail -->
      <div class="lg:col-span-9">
        <NuxtChild />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'primary',
  middleware: ['auth'],
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply bg-gray-50 text-indigo-600 hover:bg-white;
}
.nuxt-link-exact-active ._icon {
  @apply text-indigo-500 group-hover:text-indigo-600;
}
</style>
