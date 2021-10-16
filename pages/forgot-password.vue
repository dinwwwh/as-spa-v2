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
            Quyên mật khẩu
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Hoặc
            <Links :to="{ name: 'login' }"> Đăng nhập </Links>
          </p>
        </div>

        <div class="space-y-6">
          <Inputs
            v-model="email"
            type="text"
            name="email"
            placeholder="Email của bạn"
            :error="$v.email"
          />

          <MessagesInfo v-if="info">{{ info }}</MessagesInfo>

          <Buttons
            class="w-full"
            loading="completeForgotPassword"
            @click="forgotPassword"
          >
            Quyên mật khẩu
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
      email: undefined,
      info: undefined,
    }
  },
  head() {
    return {
      title: 'Quyên mật khẩu',
    }
  },
  validations() {
    return {
      email: {
        required: this.$vuelidate.rules.required,
        email: this.$vuelidate.rules.email,
      },
    }
  },
  methods: {
    async forgotPassword() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$notification.$error('Vui lòng điền email')
        this.$nuxt.$emit('completeForgotPassword')
        return
      }

      const { status } = await this.$axios.post('forgot-password', {
        email: this.email,
      })
      this.$nuxt.$emit('completeForgotPassword')

      if (status < 300) {
        this.info =
          'Chúng tôi đã gửi đường dẫn lấy lại mật khẩu qua email của bạn.'
      }
    },
  },
}
</script>
