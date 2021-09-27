<template>
  <GroupsSeparated v-if="isOpen">
    <div class="space-y-10">
      <HeadingsBase3>
        Nạp thẻ thủ công
        <span class="text-base font-normal text-gray-500"> (30p/thẻ) </span>
      </HeadingsBase3>

      <div class="space-y-8">
        <Selects
          v-model="telco"
          class="md:w-4/5 lg:w-3/4 xl: w-2/3"
          :options="telcos"
          :error="$v.telco"
          name="loại thẻ"
        >
          Loại thẻ
        </Selects>

        <Selects
          v-model="faceValue"
          class="md:w-4/5 lg:w-3/4 xl: w-2/3"
          :options="faceValues"
          display-key="display"
          value-key="value"
          :error="$v.faceValue"
          name="mệnh giá"
        >
          Mệnh giá
        </Selects>

        <Inputs
          v-model="serial"
          class="md:w-4/5 lg:w-3/4 xl: w-2/3"
          :error="$v.serial"
          name="số seri"
          type="text"
          placeholder="20000234782344"
        >
          Số seri
        </Inputs>

        <Inputs
          v-model="code"
          class="md:w-4/5 lg:w-3/4 xl: w-2/3"
          :error="$v.code"
          name="mã"
          type="text"
          placeholder="324688234782344"
        >
          Mã
        </Inputs>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end">
        <Buttons loading="completeRechargeLocalCard" @click="recharge">
          Nạp thẻ
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  data() {
    return {
      telco: undefined,
      faceValue: undefined,
      serial: undefined,
      code: undefined,
    }
  },
  computed: {
    isOpen() {
      return this.$app.findConfig('open_recharging_card')
    },
    telcos() {
      if (!this.isOpen) return []
      return this.$app
        .findConfig('recharged_card_telcos')
        .map((telco) => telco.name)
    },
    faceValues() {
      if (!this.isOpen || !this.telco) return []
      return (
        this.$app
          .findConfig('recharged_card_telcos')
          .find((telco) => telco.name === this.telco)
          .faceValues.map((faceValue) => ({
            display: `${this.$number.format(
              faceValue.value
            )}đ = ${this.$number.format(
              (faceValue.value * faceValue.tax) / 100
            )}đ trên app`,
            value: faceValue.value,
          })) || []
      )
    },
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      telco: {
        required,
      },
      faceValue: {
        required,
      },
      serial: {
        required,
      },
      code: {
        required,
      },
    }
  },
  methods: {
    async recharge() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeRechargeLocalCard')
        this.$notification.error('Vui lòng kiểm tra lại thông tin.')
        return
      }

      const { status } = await this.$axios.post('recharged-cards/recharge', {
        telco: this.telco,
        faceValue: this.faceValue,
        serial: this.serial,
        code: this.code,
      })
      this.$nuxt.$emit('completeRechargeLocalCard')

      if (status < 300) {
        this.$notification.success(
          'Nạp thẻ thành công, thẻ trong trạng thái chờ duyệt.'
        )
      }
    },
  },
}
</script>
