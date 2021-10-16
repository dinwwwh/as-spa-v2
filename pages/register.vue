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
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Đăng ký</h2>
          <p class="mt-2 text-sm text-gray-600">
            Hoặc
            <Links :to="{ name: 'login' }"> Đăng nhập </Links>
          </p>
        </div>

        <div class="space-y-6">
          <Inputs v-model="name" type="text" :error="$v.name" name="tên">
            Tên
          </Inputs>

          <Inputs
            v-model="login"
            type="text"
            :error="$v.login"
            name="tài khoản"
          >
            Tài khoản
          </Inputs>

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

          <div class="space-y-1">
            <p class="block text-sm font-medium text-gray-700">Giới tính</p>

            <div class="flex items-center gap-3">
              <Radios v-model="gender" value="male"> Nam </Radios>
              <Radios v-model="gender" value="female"> Nữ </Radios>
              <Radios v-model="gender" value="other"> Khác </Radios>
            </div>
          </div>

          <Buttons class="w-full" loading="completeRegister" @click="register">
            Đăng ký
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
      name: undefined,
      login: undefined,
      email: undefined,
      password: undefined,
      confirmedPassword: undefined,
      gender: 'male',
    }
  },
  head() {
    return {
      title: 'Đăng ký',
    }
  },
  validations() {
    const { required, email, sameAs, unique, minLength } = this.$vuelidate.rules
    const isUniqueUser = async (value) => {
      const { data } = await this.$axios.$get('users/find-strictly', {
        params: {
          _search: value,
        },
      })
      return data.length === 0
    }

    return {
      name: { required },
      login: {
        required,
        minLength: minLength(6),
        unique: unique(isUniqueUser),
      },
      email: { required, email, unique: unique(isUniqueUser) },
      password: { required, minLength: minLength(8) },
      confirmedPassword: { required, sameAs: sameAs('password') },
    }
  },
  methods: {
    async register() {
      this.$v.$touch()

      if (this.$v.$pending) {
        this.$nuxt.$emit('completeRegister')
        this.$notification.warning('Bạn ơi chậm thui')
        return
      }

      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeRegister')
        this.$notification.error('Vui lòng kiểm tra lại thông tin.')
        return
      }

      const { status } = await this.$axios.post('register', {
        name: this.name,
        login: this.login,
        email: this.email,
        password: this.password,
        gender: this.gender || 'male',
      })
      this.$nuxt.$emit('completeRegister')

      if (status < 300) {
        this.$router.push('/')
      }
    },
  },
}
</script>
