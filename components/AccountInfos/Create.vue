<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Tạo thông tin tài khoản </HeadingsBase3>
        <p>
          Thông tin này phục vụ việc cung cấp thông tin khi tạo nick thuộc
          <Badges color="indigo"> {{ accountType.name }} </Badges>
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

        <Checkboxes v-model="accountInfo.canCreator" :class="inputClasses">
          Người tạo tài khoản có thể xem và chỉnh sửa
          <template #description>
            Chỉ áp dụng khi tài khoản đang bán. Cũng là thông tin yêu cầu người
            đăng tài khoản cung cấp.
          </template>
        </Checkboxes>

        <Checkboxes v-model="accountInfo.canBuyer" :class="inputClasses">
          Người mua có thể xem - 1
          <template #description>
            Chỉ áp dụng khi tài khoản đã được mua và đang chờ xác nhận
          </template>
        </Checkboxes>

        <Checkboxes v-model="accountInfo.canBuyerOke" :class="inputClasses">
          Người mua có thể xem - 2
          <template #description>
            Chỉ áp dụng khi tài khoản đã được mua và đã xác nhận là tài khoản
            đúng thông tin
          </template>
        </Checkboxes>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons color="green" loading="completeCreate" @click="create">
          Tạo
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    accountType: {
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
      accountInfo: {
        canCreator: true,
        canBuyer: false,
        canBuyerOke: true,
      },
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
    async create() {
      this.$v.accountInfo.$touch()
      if (this.$v.accountInfo.$invalid) {
        this.$nuxt.$emit('completeCreate')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const {
        status,
        data: { data: accountInfo },
      } = await this.$axios.post(
        `account-types/${this.accountType.id}/account-infos`,
        this.accountInfo
      )
      this.$nuxt.$emit('completeCreate')

      if (status < 300) {
        this.$emit('created', accountInfo)
        this.$notification.success('Tạo thành công')
      }
    },
  },
}
</script>
