<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <HeadingsBase3>Thông tin</HeadingsBase3>

      <div class="space-y-6">
        <Inputs
          v-model="name"
          type="text"
          class="md:w-4/5 lg:3/4 xl:w-2/3"
          :error="$v.name"
        >
          Tên
        </Inputs>

        <div class="space-y-1">
          <p class="block text-sm font-medium text-gray-700">Giới tính</p>

          <div class="flex items-center gap-3">
            <Radios v-model="gender" value="male"> Nam </Radios>
            <Radios v-model="gender" value="female"> Nữ </Radios>
            <Radios v-model="gender" value="other"> Khác </Radios>
          </div>
        </div>

        <InputsCircleFile v-model="avatar" :preview="user.avatarUrl">
          Ảnh đại diện
        </InputsCircleFile>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end items-center">
        <Buttons color="gray" loading="completeUpdate" @click="update">
          Cập nhật
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.user.name,
      gender: this.user.gender,
      avatar: undefined,
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      name: {
        required,
      },
    }
  },
  methods: {
    async update() {
      const { status } = await this.$axios.post(
        'update-profile',
        this.$formData({
          _method: 'PATCH',
          name: this.name,
          gender: this.gender,
          avatar: this.avatar,
        })
      )
      this.$nuxt.$emit('completeUpdate')

      if (status < 300) {
        this.$notification.success('Cập nhật thành công.')
      }
    },
  },
}
</script>
