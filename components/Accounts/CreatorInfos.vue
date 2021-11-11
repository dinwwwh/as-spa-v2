<template>
  <Groups class="space-y-8">
    <AppLoading v-if="$fetchState.pending" />
    <template v-if="!$fetchState.pending">
      <HeadingsBase3>
        Thông tin tài khoản #{{ account.id }} cho người đăng
      </HeadingsBase3>

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
          _relationships: ['infos'],
          _sensitive: true,
        },
      }
    )

    this.account = account
  },
  computed: {
    infos() {
      return this.account.infos.filter((info) => info.pivot.value)
    },
  },
}
</script>
