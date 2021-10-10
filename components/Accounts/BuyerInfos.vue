<template>
  <Groups class="space-y-8">
    <AppLoading v-if="$fetchState.pending" />
    <template v-if="!$fetchState.pending">
      <HeadingsBase3>
        Thông tin tài khoản #{{ account.id }} cho người mua
      </HeadingsBase3>

      <MessagesError v-if="isBuyerNotOke">
        Bạn đã xác nhận tài khoản này sai thông tin
      </MessagesError>

      <ul role="list">
        <li
          v-for="info in infos"
          :key="info.id"
          class="py-4 flex md:py-0 md:pb-4"
        >
          <span class="text-gray-800 text-base"> {{ info.name }}: </span>
          <span class="ml-3 text-base text-gray-500">
            {{ info.pivot.value }}
          </span>
          <IconsDocumentDuplicate
            class="text-gray-500 ml-2 h-5 cursor-pointer hover:text-indigo-500"
            @click="$copy(info.pivot.value)"
          />
        </li>
      </ul>

      <div v-if="isNeedConfirm" class="space-y-2">
        <MessagesInfo class="max-w-[80vw]">
          Bằng việc xác nhận tài khoảng đúng thông tin bạn sẽ được cung cấp thêm
          các thông tin còn thiếu
        </MessagesInfo>
        <MessagesWarning class="max-w-[80vw]">
          Hệ thống tự xác nhận là tài khoảng đúng thông tin sau 1 giờ kể từ khi
          mua
        </MessagesWarning>

        <div class="flex items-center justify-end gap-3">
          <Buttons
            color="red"
            loading="completeConfirmAccount"
            @click="confirm(false)"
          >
            Sai thông tin
          </Buttons>
          <Buttons
            color="green"
            loading="completeConfirmAccount"
            @click="confirm(true)"
          >
            Đúng thông tin
          </Buttons>
        </div>
      </div>
    </template>
  </Groups>
</template>

<script>
export default {
  props: {
    accountId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      account: {},
    }
  },
  async fetch() {
    const { data: account } = await this.$axios.$get(
      `accounts/${this.accountId}`,
      {
        params: {
          _relationships: ['buyerInfos', 'buyerOkeInfos'],
          _sensitive: true,
        },
      }
    )

    this.account = account
  },
  computed: {
    isBuyer() {
      return (
        this.account.buyerId === this.$auth.user('id') &&
        this.account.confirmedAt &&
        this.$dayjs(this.account.confirmedAt).diff(new Date()) > 0
      )
    },
    isBuyerOke() {
      return (
        this.account.buyerId === this.$auth.user('id') &&
        this.account.confirmedAt &&
        this.$dayjs(this.account.confirmedAt).diff(new Date()) <= 0
      )
    },
    isBuyerNotOke() {
      return (
        this.account.buyerId === this.$auth.user('id') &&
        !this.account.confirmedAt
      )
    },
    infos() {
      if (this.isBuyer) return this.account.buyerInfos
      if (this.isBuyerOke) return this.account.buyerOkeInfos
      return []
    },
    isNeedConfirm() {
      return (
        this.account.confirmedAt &&
        this.$dayjs(this.account.confirmedAt).diff(new Date()) > 0
      )
    },
  },

  methods: {
    async confirm(oke) {
      const { status, data } = await this.$axios.patch(
        `accounts/${this.account.id}/confirm`,
        {
          oke,
          _relationships: ['buyerInfos', 'buyerOkeInfos'],
          _sensitive: true,
        }
      )
      this.$nuxt.$emit('completeConfirmAccount')

      if (status < 300) {
        this.account = data.data
        this.$notification.success('Xác nhận thành công')
        this.$emit('confirmed', { ...data.data })
      }
    },
  },
}
</script>
