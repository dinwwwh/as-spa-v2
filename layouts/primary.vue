<template>
  <div
    class="
      max-h-[100vh] max-w-[100vw]
      sm:overflow-x-hidden
      overflow-y-auto
      bg-gray-100
    "
  >
    <div class="min-h-screen">
      <header class="shadow border-b border-solid border-gray-300">
        <nav class="bg-white">
          <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex px-2 lg:px-0">
                <div class="flex-shrink-0 flex items-center">
                  <AppLogo class="h-8 w-auto" />
                </div>
                <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <NuxtLink
                    :to="{ name: 'index' }"
                    class="
                      _desktop-menu-item
                      border-transparent
                      text-gray-500
                      hover:border-gray-300
                      hover:text-gray-700
                      inline-flex
                      items-center
                      px-1
                      pt-1
                      border-b-2
                      text-sm
                      font-medium
                    "
                  >
                    Trang chủ
                  </NuxtLink>
                </div>
              </div>
              <div
                class="
                  flex-1 flex
                  items-center
                  justify-center
                  px-2
                  lg:ml-6
                  lg:justify-end
                "
              >
                <div class="max-w-lg w-full lg:max-w-xs">
                  <div class="relative">
                    <div
                      class="
                        absolute
                        inset-y-0
                        left-0
                        pl-3
                        flex
                        items-center
                        pointer-events-none
                      "
                    >
                      <IconsSearch class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      class="
                        block
                        w-full
                        pl-10
                        pr-3
                        py-2
                        border border-gray-300
                        rounded-md
                        leading-5
                        bg-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:placeholder-gray-400
                        focus:ring-1 focus:ring-indigo-500
                        focus:border-indigo-500
                        sm:text-sm
                      "
                      placeholder="Search"
                      type="search"
                      @input="onInputAtSearch"
                      @keyup.enter="onEnterAtSearch"
                    />
                  </div>
                </div>
              </div>

              <!-- Mobile menu button -->
              <div class="flex items-center lg:hidden">
                <button
                  type="button"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    p-2
                    rounded-md
                    text-gray-400
                    hover:text-gray-500
                    hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2 focus:ring-inset focus:ring-indigo-500
                  "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  @click="isShowMobileMenu = !isShowMobileMenu"
                >
                  <IconsMenu v-if="!isShowMobileMenu" class="h-6 w-6" />
                  <IconsX v-else class="h-6 w-6" />
                </button>
              </div>

              <!-- For authenticated: avt - dropdown-menu -->
              <div
                v-if="isAuthenticated"
                class="hidden lg:ml-4 lg:flex lg:items-center"
              >
                <button
                  class="
                    flex-shrink-0
                    bg-white
                    p-1
                    text-gray-400
                    rounded-full
                    hover:text-gray-500
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                >
                  <span class="sr-only">View notifications</span>
                  <IconsBell class="size-xl" />
                </button>

                <!-- Profile dropdown -->
                <div class="ml-4 relative flex-shrink-0">
                  <div>
                    <button
                      id="user-menu-button"
                      type="button"
                      class="
                        bg-white
                        rounded-full
                        flex
                        text-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      "
                      aria-expanded="false"
                      aria-haspopup="true"
                      @click="
                        isShowDropdownMenuForDesktop =
                          !isShowDropdownMenuForDesktop
                      "
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="authProfile.avatarUrl"
                        alt=""
                      />
                    </button>
                  </div>

                  <!--Dropdown menu, show/hide based on menu state isShowDropdownMenuForDesktop. -->
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-show="isShowDropdownMenuForDesktop"
                      class="
                        z-40
                        origin-top-right
                        absolute
                        top-full
                        right-0
                        w-60
                        mt-3
                        -mr-0.5
                        sm:-mr-3.5
                        bg-white
                        rounded-lg
                        shadow-md
                        ring-1 ring-gray-900 ring-opacity-5
                        font-normal
                        text-sm text-gray-900
                        divide-y divide-gray-100
                      "
                      @click="isShowDropdownMenuForDesktop = false"
                    >
                      <p class="py-3 px-3.5 truncate">
                        <span class="block mb-0.5 text-xs text-gray-500">
                          Tài khoản
                        </span>
                        <span class="font-semibold">
                          {{ $store.state.auth.profile.email }}
                        </span>
                        <span class="flex gap-1 items-center">
                          {{
                            $number.format($store.state.auth.profile.balance)
                          }}
                          <AppBalance class="" />
                        </span>
                      </p>
                      <!-- Group 1 -->
                      <div class="py-1.5 px-3.5">
                        <NuxtLink
                          v-if="canViewAdminPage"
                          :to="{ name: 'admin' }"
                          class="
                            group
                            flex
                            items-center
                            py-1.5
                            hover:text-teal-600
                          "
                        >
                          <IconsAdmin
                            class="
                              size-xl
                              flex-none
                              mr-3
                              text-gray-400
                              group-hover:text-indigo-600
                            "
                          />
                          Quản trị
                        </NuxtLink>

                        <NuxtLink
                          :to="{ name: 'profile' }"
                          class="
                            group
                            flex
                            items-center
                            py-1.5
                            hover:text-teal-600
                          "
                        >
                          <IconsUserCircle
                            class="
                              size-xl
                              flex-none
                              mr-3
                              text-gray-400
                              group-hover:text-indigo-600
                            "
                          />
                          Hồ sơ
                        </NuxtLink>

                        <NuxtLink
                          :to="{ name: 'recharge' }"
                          class="
                            group
                            flex
                            items-center
                            py-1.5
                            hover:text-teal-600
                          "
                        >
                          <IconsCashPlus
                            class="
                              size-xl
                              flex-none
                              mr-3
                              text-gray-400
                              group-hover:text-indigo-600
                            "
                          />
                          Nạp tiền
                        </NuxtLink>
                      </div>
                      <!-- Group 2 -->
                      <div class="py-1.5 px-3.5">
                        <a
                          href="#logout"
                          class="
                            group
                            flex
                            items-center
                            py-1.5
                            hover:text-teal-600
                          "
                          @click="$auth.logout()"
                        >
                          <IconsLogout
                            class="
                              size-xl
                              flex-none
                              mr-3
                              text-gray-400
                              group-hover:text-indigo-600
                            "
                          />
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>

              <!-- For unauthenticated: login-register -->
              <div v-else class="hidden lg:ml-4 lg:flex lg:items-center">
                <NuxtLink
                  :to="{ name: 'login' }"
                  class="
                    whitespace-nowrap
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-900
                  "
                >
                  Đăng nhập
                </NuxtLink>
                <NuxtLink
                  :to="{ name: 'register' }"
                  class="
                    ml-8
                    whitespace-nowrap
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    border border-transparent
                    rounded-md
                    shadow-sm
                    text-base
                    font-medium
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                  "
                >
                  Đăng ký
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Mobile menu, show/hide based on menu state. -->
          <div v-if="isShowMobileMenu" id="mobile-menu" class="lg:hidden">
            <div class="pt-2 pb-3 space-y-1">
              <NuxtLink
                :to="{ name: 'index' }"
                class="
                  _mobile-menu-item
                  text-gray-600
                  hover:bg-gray-50
                  hover:border-gray-300
                  hover:text-gray-800
                  block
                  pl-3
                  pr-4
                  py-2
                  border-l-4
                  text-base
                  font-medium
                "
              >
                Trang chủ
              </NuxtLink>
            </div>

            <!-- For authenticated: avt-menu -->
            <div
              v-if="isAuthenticated"
              class="pt-4 pb-3 border-t border-gray-200"
            >
              <div class="flex items-center px-4">
                <div class="flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="authProfile.avatarUrl"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-gray-800">
                    {{ authProfile.name }}
                  </div>
                  <div
                    class="
                      text-sm
                      font-medium
                      text-gray-500
                      flex
                      gap-1
                      items-center
                    "
                  >
                    {{ $number.format(authProfile.balance) }}
                    <AppBalance class="" />
                  </div>
                </div>
                <button
                  class="
                    ml-auto
                    flex-shrink-0
                    bg-white
                    p-1
                    text-gray-400
                    rounded-full
                    hover:text-gray-500
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                >
                  <span class="sr-only">View notifications</span>
                  <IconsBell class="size-2xl" />
                </button>
              </div>
              <div class="mt-3 space-y-1">
                <NuxtLink
                  v-if="canViewAdminPage"
                  :to="{ name: 'admin' }"
                  class="
                    block
                    px-4
                    py-2
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                  "
                >
                  Quản trị
                </NuxtLink>
                <NuxtLink
                  :to="{ name: 'profile' }"
                  class="
                    block
                    px-4
                    py-2
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                  "
                >
                  Hồ sơ
                </NuxtLink>
                <NuxtLink
                  :to="{ name: 'recharge' }"
                  class="
                    block
                    px-4
                    py-2
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                  "
                >
                  Nạp tiền
                </NuxtLink>
                <a
                  href="#logout"
                  class="
                    block
                    px-4
                    py-2
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                  "
                  @click="$auth.logout()"
                >
                  Đăng xuất
                </a>
              </div>
            </div>

            <!-- For unauthenticated: login-register -->
            <div v-else class="py-6 px-10 border-t border-gray-200">
              <NuxtLink
                :to="{ name: 'register' }"
                class="
                  w-full
                  flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-base
                  font-medium
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                "
              >
                Đăng ký
              </NuxtLink>

              <p class="mt-4 text-center text-base font-medium text-gray-500">
                Đã có tài khoản?
                <NuxtLink
                  :to="{ name: 'login' }"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  Đăng nhập
                </NuxtLink>
              </p>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <Nuxt />
        </div>
      </main>
    </div>

    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMobileMenu: false,
      isShowDropdownMenuForDesktop: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    authProfile() {
      return this.$store.state.auth.profile ?? {}
    },
    canViewAdminPage() {
      return this.authProfile.canManageRechargedCard
    },
  },
  mounted() {
    const bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.classList.add('fix-overflow-for-body')
  },
  beforeDestroy() {
    const bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.classList.remove('fix-overflow-for-body')
  },
  methods: {
    onInputAtSearch() {},
    onEnterAtSearch() {},
  },
}
</script>

<style scoped>
._desktop-menu-item.nuxt-link-exact-active {
  @apply border-indigo-500 text-gray-900 cursor-default;
  @apply hover:border-indigo-500 hover:text-gray-900;
}
._mobile-menu-item.nuxt-link-exact-active {
  @apply bg-indigo-50 border-indigo-500 text-indigo-700 cursor-default;
  @apply hover:bg-indigo-50 hover:border-indigo-500 hover:text-gray-600;
}
</style>

<style>
.fix-overflow-for-body {
  @apply max-h-[100vh] max-w-[100vw] overflow-hidden;
}
</style>
