<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3>
          Cập nhật trường thông tin tài khoản
          <BadgesLarge>{{ model.name }}</BadgesLarge>
          <Badges color="green">#{{ model.id }}</Badges>
        </HeadingsBase3>
        <p>
          Thông tin này phục vụ việc cung cấp thông tin khi tạo nick thuộc
          <Badges color="indigo"> {{ model.accountType.name }} </Badges>
        </p>
      </div>

      <div class="space-y-6">
        <Inputs
          v-model="accountInfo.name"
          :class="inputClasses"
          :error="$v.accountInfo.name"
          type="text"
          placeholder="tài khoản, số diện thoại,..."
          name="tên"
        >
          Tên
        </Inputs>

        <Textareas
          v-model="accountInfo.description"
          :class="inputClasses"
          :error="$v.accountInfo.description"
          placeholder="đây là tài khoản bạn dùng khi đăng nhập vào game, đây là số điện thoại được sử dụng để khôi phục mật khẩu,..."
          name="mô tả"
        >
          Mô tả
        </Textareas>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons color="green" loading="completeCreate" @click="update">
          Lưu
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      accountInfo: { ...this.model },
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      accountInfo: {
        name: {
          required,
        },
        description: {},
      },
    }
  },
  methods: {
    async update() {
      this.$v.accountInfo.$touch()
      if (this.$v.accountInfo.$invalid) {
        this.$nuxt.$emit('completeCreate')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const {
        status,
        data: { data: accountInfo },
      } = await this.$axios.put(
        `account-infos/${this.accountInfo.id}`,
        this.accountInfo
      )
      this.$nuxt.$emit('completeCreate')

      if (status < 300) {
        this.$notification.success('Lưu thành công')
        this.$emit('model', {
          ...this.accountInfo,
          ...accountInfo,
        })
      }
    },
  },
}
</script>
