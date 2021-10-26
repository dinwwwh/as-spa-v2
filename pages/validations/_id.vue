<template>
  <div class="my-16 space-y-12">
    <HeadingsBase1> Xác minh dối tượng #{{ validation.id }} </HeadingsBase1>

    <Groups class="space-y-4">
      <HeadingsBase4 v-if="validation.approver">
        Người phê duyệt
      </HeadingsBase4>
      <UsersShort v-if="validation.approver" :user="validation.approver" />

      <HeadingsBase4 v-if="validation.description"> Mô tả </HeadingsBase4>
      <MessagesError v-if="validation.description">
        {{ validation.description }}
      </MessagesError>
    </Groups>

    <Groups v-if="link">
      <NuxtLink :to="link.route" target="_blank">
        <Buttons>
          <IconsEye class="mr-1 h-5" /> Xem {{ link.name }} liên kết
        </Buttons>
      </NuxtLink>
    </Groups>

    <MessagesInfo>
      {{ validation.validatorable.validator.description }}
    </MessagesInfo>

    <MessagesWarning>
      {{ validation.validatorable.validator.approverDescription }}
    </MessagesWarning>

    <Groups v-if="validation.canStartApproving" class="space-y-2">
      <HeadingsBase3> Bạn có thể bắt đầu phê duyệt </HeadingsBase3>
      <Buttons
        color="green"
        loading="completeStartApprovingValidation"
        @click="startApproving"
      >
        Bắt đầu phê duyệt
      </Buttons>
    </Groups>

    <Groups v-if="validation.canReadValidationableInfos" class="space-y-6">
      <HeadingsBase3> Các thông tin cung cấp thêm cho bạn </HeadingsBase3>

      <div class="space-y-2">
        <div
          v-for="(info, field) in validation.validationableInfos"
          :key="field"
          class="flex gap-3 items-center"
        >
          <span class="text-gray-600 sm:min-w-[72px]"> {{ field }} </span>
          <span class="tracking-wide font-medium"> {{ info }} </span>
          <IconsDocumentDuplicate
            class="text-gray-500 hover:text-gray-700 hover:cursor-pointer h-5"
            @click="$copy(info)"
          />
        </div>
      </div>
    </Groups>

    <Groups v-if="validation.canEndApproving" class="space-y-6">
      <HeadingsBase3> Kết thúc phê duyệt </HeadingsBase3>

      <div class="space-y-4">
        <Inputs
          v-for="field in validation.validatorable.validator.updatableFields"
          :key="'update' + field"
          v-model="endingApproving.updatedValues[field]"
          type="text"
          :error="$v.endingApproving.updatedValues[field]"
        >
          {{ field }}
        </Inputs>
      </div>

      <div class="space-y-4">
        <Checkboxes
          v-model="endingApproving.isError"
          :error="$v.endingApproving.isError"
        >
          Phê duyệt thất bại
          <template #description> Nếu sai thông tin, ... </template>
        </Checkboxes>
        <Textareas
          v-model="endingApproving.description"
          :error="$v.endingApproving.description"
        >
          Mô tả
          <template #description>
            Mô tả tại sao lại thất bại, tại sao lại thành công
          </template>
        </Textareas>
      </div>

      <Buttons
        color="green"
        pending="completeEndApprovingValidation"
        @click="endApproving"
      >
        Kế thúc phê duyệt
      </Buttons>
    </Groups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params: routeParams }) {
    const params = {
      _sensitive: true,
      _abilities: true,
      _computed: true,
      _relationships: ['validatorable.validator', 'approver'],
    }

    const { data: validation } = await $axios.$get(
      `validations/${routeParams.id}`,
      {
        params,
      }
    )

    return {
      validation,
      params,
      endingApproving: {
        updatedValues: {},
      },
    }
  },
  computed: {
    link() {
      return this.$app.validation.getValidationableLink(this.validation)
    },
  },
  validations() {
    const { required } = this.$vuelidate.rules

    const updatedValues = {}
    if (!this.endingApproving.isError)
      for (const field of this.validation.validatorable.validator
        .updatableFields) {
        updatedValues[field] = { required }
      }

    const description = {}
    if (this.endingApproving.isError) {
      description.required = required
    }

    return {
      endingApproving: {
        required,
        updatedValues,
        description,
      },
    }
  },
  methods: {
    async startApproving() {
      const { status, data } = await this.$axios.patch(
        `validations/${this.validation.id}/start-approving`,
        this.params
      )
      this.$nuxt.$emit('completeStartApprovingValidation')

      if (status < 300) {
        this.$notification.success('Bắt đầu phê duyệt thành công')
        this.validation = data.data
      }
    },
    async endApproving() {
      this.$v.endingApproving.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeEndApprovingValidation')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const { status, data } = await this.$axios.patch(
        `validations/${this.validation.id}/end-approving`,
        {
          ...this.params,
          ...this.endingApproving,
        }
      )
      this.$nuxt.$emit('completeEndApprovingValidation')

      if (status < 300) {
        this.$notification.success('Kết thúc phê duyệt thành công')
        this.validation = data.data
      }
    },
  },
}
</script>
