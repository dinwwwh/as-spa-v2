<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Mua tài khoản #{{ model.id }} </HeadingsBase3>
      </div>

      <MessagesInfo v-if="model.canBuy">
        Nếu bạn mua tài khoản thì tài khoản bạn sẽ giảm
        {{ $number.format(model.price) }}đ
      </MessagesInfo>

      <MessagesError v-else>
        Tài khoản đang được kiểm tra, đã bán,... hoặc bạn không đủ tiền.
      </MessagesError>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons
          :disabled="!model.canBuy"
          color="green"
          loading="completeBuyAccount"
          @click="buy"
        >
          Mua
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
  },
  methods: {
    async buy() {
      const { status, data } = await this.$axios.patch(
        `accounts/${this.model.id}/buy`
      )
      this.$nuxt.$emit('completeBuyAccount')

      if (status < 300) {
        this.$notification.success('Mua tài khoản thành công')
        this.$auth.updateBalance(-data.data.boughtAtPrice)
        this.$emit('model', {
          ...this.model,
          ...data.data,
        })
      }
    },
  },
}
</script>
