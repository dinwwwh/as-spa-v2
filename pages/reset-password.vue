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
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Thiết lập lại mật khẩu
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Hoặc
            <Links :to="{ name: 'login' }"> Đăng nhập </Links>
          </p>
        </div>

        <div class="space-y-6">
          <Inputs v-model="email" type="text" :error="$v.email" name="email">
            Email
          </Inputs>

          <Inputs
            v-model="password"
            type="password"
            :error="$v.password"
            name="mật khẩu"
          >
            Mật khẩu
          </Inputs>

          <Inputs
            v-model="confirmedPassword"
            type="password"
            :error="$v.confirmedPassword"
            name="mật khẩu xác nhận"
          >
            Xác nhận mật khẩu
          </Inputs>

          <Buttons loading="completeResetPassword" @click="resetPassword">
            Thiết lập lại mật khẩu
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
  middleware: [
    'guest',
    ({ error, query }) => {
      if (!query.token) error(404)
    },
  ],
  data() {
    return {
      email: undefined,
      password: undefined,
      confirmedPassword: undefined,
      token: this.$route.query.token,
    }
  },
  validations() {
    const { required, email, sameAs, minLength } = this.$vuelidate.rules

    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmedPassword: { required, sameAs: sameAs('password') },
    }
  },
  methods: {
    async resetPassword() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeResetPassword')
        this.$notification.error('Vui lòng kiểm tra lại thông tin.')
        return
      }

      const { status } = await this.$axios.post('reset-password', {
        email: this.email,
        password: this.password,
        token: this.token,
      })
      this.$nuxt.$emit('completeResetPassword')

      if (status < 300) this.$notification.success('Thành công')
    },
  },
}
</script>
