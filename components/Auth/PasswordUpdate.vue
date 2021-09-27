<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <HeadingsBase3>Cập nhật mật khẩu</HeadingsBase3>

      <div class="space-y-6">
        <Inputs
          v-model="oldPassword"
          type="password"
          class="md:w-4/5 lg:3/4 xl:w-2/3"
          :error="$v.oldPassword"
          name="mật khẩu cũ"
        >
          Mật khẩu cũ
        </Inputs>

        <Inputs
          v-model="newPassword"
          type="password"
          class="md:w-4/5 lg:3/4 xl:w-2/3"
          :error="$v.newPassword"
          name="mật khẩu mới"
        >
          Mật khẩu mới
        </Inputs>

        <Inputs
          v-model="confirmedPassword"
          type="password"
          class="md:w-4/5 lg:3/4 xl:w-2/3"
          :error="$v.confirmedPassword"
          name="mật khẩu xác nhận"
        >
          Xác nhận mật khẩu
        </Inputs>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end">
        <Buttons
          color="gray"
          loading="completeUpdatePassword"
          @click="updatePassword"
        >
          Cập nhật
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: undefined,
      newPassword: undefined,
      confirmedPassword: undefined,
    }
  },
  validations() {
    const { required, sameAs, minLength } = this.$vuelidate.rules

    return {
      oldPassword: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
      confirmedPassword: {
        required,
        sameAs: sameAs('newPassword'),
      },
    }
  },
  methods: {
    async updatePassword() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$notification.error('Vui lòng kiểm tra lại thông tin.')
        this.$nuxt.$emit('completeUpdatePassword')
        return
      }

      const { status } = await this.$axios.patch('update-password', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
      this.$nuxt.$emit('completeUpdatePassword')

      if (status < 300) {
        this.$notification.success('Cập nhật thành công.')
        this.$v.$reset()
        this.oldPassword = undefined
        this.newPassword = undefined
        this.confirmedPassword = undefined
      }
    },
  },
}
</script>
