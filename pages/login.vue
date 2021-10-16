<template>
  <div class="min-h-screen bg-white flex">
    <div
      class="
        flex-1 flex flex-col
        justify-center
        py-12
        px-4
        sm:px-6
        lg:flex-none
        lg:px-20
        xl:px-24
      "
    >
      <div class="mx-auto w-full max-w-sm lg:w-96 space-y-8">
        <div>
          <AppLogo />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Đăng nhập</h2>
          <p class="mt-2 text-sm text-gray-600">
            Hoặc
            <Links :to="{ name: 'register' }"> Đăng ký </Links>
          </p>
        </div>

        <div class="space-y-6">
          <Inputs v-model="loginOrEmail" type="text">
            Tài khoản / Email
          </Inputs>

          <Inputs v-model="password" type="password"> Mật khẩu </Inputs>

          <div class="flex items-center justify-between">
            <Checkboxes v-model="remember">Lưu thông tin</Checkboxes>

            <Links class="text-sm" :to="{ name: 'forgot-password' }">
              Quyên mật khẩu?
            </Links>
          </div>

          <Buttons class="w-full" loading="completeLogin" @click="login">
            Đăng nhập
          </Buttons>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['guest'],
  data() {
    return {
      loginOrEmail: undefined,
      password: undefined,
      remember: undefined,
    }
  },
  head() {
    return {
      title: 'Đăng nhập',
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      loginOrEmail: {
        required,
      },
      password: {
        required,
      },
    }
  },
  methods: {
    async login() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$notification.error('Thông tin cung cấp không hợp lệ.')
        this.$nuxt.$emit('completeLogin')
        return
      }

      const success = await this.$auth.login(
        this.loginOrEmail,
        this.password,
        this.remember
      )
      this.$nuxt.$emit('completeLogin')

      if (success) {
        this.$nuxt.$router.push('/')
      }
    },
  },
}
</script>
