<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />

    <div v-if="!$fetchState.pending" class="space-y-6">
      <div class="space-y-2">
        <HeadingsBase3>
          Cập nhật số dư người dùng @{{ user.login }}
        </HeadingsBase3>
        <MessagesInfo>
          Số lượng này sẽ cộng/trừ vào số dư người dùng
        </MessagesInfo>
      </div>

      <div class="space-y-4">
        <Inputs
          v-model="amount"
          type="number"
          :error="$v.amount"
          name="số lượng"
        >
          Số lượng
          <template #description>
            Nếu là trừ tiền vui lòng thêm dấu - ở đầu.
          </template>
        </Inputs>

        <Textareas
          v-model="description"
          placeholder="Vì tôi thích cộng tiền cho bạn"
          :error="$v.description"
          name="lý do"
        >
          Lý do
        </Textareas>
      </div>
    </div>

    <template v-if="!$fetchState.pending" #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons
          color="green"
          loading="completeUpdateBalance"
          @click="updateBalance"
        >
          Lưu
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    userId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      user: undefined,
      amount: undefined,
      description: undefined,
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      amount: {
        required,
      },
      description: {
        required,
      },
    }
  },
  async fetch() {
    const { data: user } = await this.$axios.$get(`users/${this.userId}`, {
      params: {
        _sensitive: true,
      },
    })

    this.user = user
  },
  methods: {
    async updateBalance() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        this.$nuxt.$emit('completeUpdateBalance')
        return
      }

      const { status, data } = await this.$axios.$patch(
        `users/${this.userId}/balance`,
        {
          amount: this.amount,
          description: this.description,
          _sensitive: true,
        }
      )
      this.$nuxt.$emit('completeUpdateBalance')

      if (status < 300) {
        this.$notification.success('Lưu thành công')
        this.$emit('updated', data.data)
      }
    },
  },
}
</script>
