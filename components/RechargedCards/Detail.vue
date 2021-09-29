<template>
  <div class="space-y-6">
    <!-- INFOS -->
    <div class="grid md:grid-cols-2 gap-6">
      <Groups class="space-y-4">
        <HeadingsBase4 class="tracking-wide text-gray-500">
          THẺ NẠP #{{ rechargedCard.id }}
        </HeadingsBase4>

        <div v-if="rechargedCard.creator" class="space-y-1">
          <p class="text-gray-600">Người tạo</p>
          <UsersShort :user="rechargedCard.creator" />
        </div>

        <div v-if="rechargedCard.approver" class="space-y-1">
          <p>Người phê duyệt</p>
          <UsersShort :user="rechargedCard.approver" />
        </div>
      </Groups>

      <Groups class="space-y-4">
        <div class="flex gap-3 items-center">
          <span
            class="
              text-indigo-600
              tracking-wide
              px-2
              py-1
              rounded-full
              bg-indigo-100
              font-medium
            "
          >
            {{ rechargedCard.telco }}
          </span>
          <span
            :class="
              'px-2 py-1 rounded-full font-medium text-sm ' +
              $app.rechargedCard.getStatus(rechargedCard).classes
            "
          >
            {{ $app.rechargedCard.getStatus(rechargedCard).name }}
          </span>
        </div>

        <div class="space-y-2">
          <div class="flex gap-3 items-center">
            <span class="text-gray-600 sm:min-w-[72px]"> Mệnh giá </span>
            <span class="tracking-wide font-medium">
              {{ $number.format(rechargedCard.faceValue) }}đ
            </span>
          </div>

          <div class="flex gap-3 items-center">
            <span class="text-gray-600 sm:min-w-[72px]"> Số seri </span>
            <span class="tracking-wide font-medium">{{
              rechargedCard.serial
            }}</span>
            <IconsDocumentDuplicate
              class="text-gray-500 hover:text-gray-700 hover:cursor-pointer h-5"
              @click="$copy(rechargedCard.serial)"
            />
          </div>

          <div v-if="rechargedCard.code" class="flex gap-3 items-center">
            <span class="text-gray-600 sm:min-w-[72px]"> Mã </span>
            <span class="tracking-wide font-medium">{{
              rechargedCard.code
            }}</span>
            <IconsDocumentDuplicate
              class="text-gray-500 hover:text-gray-700 hover:cursor-pointer h-5"
              @click="$copy(rechargedCard.code)"
            />
          </div>

          <div class="flex gap-3 items-center">
            <span class="text-gray-600 sm:min-w-[72px]"> Cập nhật </span>
            <span class="tracking-wide font-medium">
              {{ $dayjs(rechargedCard.updatedAt).fromNow() }}
            </span>
          </div>
        </div>
      </Groups>
    </div>

    <!-- APPROVING -->
    <Groups
      v-if="rechargedCard.canStartApproving || rechargedCard.canEndApproving"
      class="space-y-4"
    >
      <div v-if="rechargedCard.canEndApproving" class="space-y-4">
        <Inputs
          v-model="realFaceValue"
          type="text"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
          :error="$v.realFaceValue"
          name="mệnh giá thực"
        >
          Mệnh giá thực
        </Inputs>
        <Inputs
          v-model="receivedValue"
          type="text"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
          :error="$v.receivedValue"
          name="tiền nhật"
        >
          Tiền nhận
          <template #description> Số tiền mà người nạp sẽ nhận được. </template>
        </Inputs>
      </div>

      <div class="flex items-center justify-end gap-3">
        <Buttons
          v-if="rechargedCard.canStartApproving"
          color="yellow"
          loading="completeStartApproving"
          @click="startApproving"
        >
          Bắt đầu phê duyệt
        </Buttons>
        <Buttons
          v-if="rechargedCard.canEndApproving"
          color="yellow"
          loading="completeEndApproving"
          @click="endApproving"
        >
          Kết thúc phê duyệt
        </Buttons>
      </div>
    </Groups>
  </div>
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
  data() {
    return {
      realFaceValue: this.model.realFaceValue || this.model.faceValue,
      receivedValue: undefined,
    }
  },
  computed: {
    rechargedCard: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('model', val)
      },
    },
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      realFaceValue: {
        required,
      },
      receivedValue: {
        required,
      },
    }
  },
  methods: {
    async startApproving() {
      const {
        status,
        data: { data: rechargedCard },
      } = await this.$axios.patch(
        `recharged-cards/${this.rechargedCard.id}/start-approving`,
        {
          _relationships: ['creator', 'approver'],
          _sensitive: true,
          _computed: true,
          _abilities: true,
        }
      )
      this.$nuxt.$emit('completeStartApproving')

      if (status < 300) {
        this.$notification.success('Thành công')
        this.rechargedCard = rechargedCard
      }
    },
    async endApproving() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeEndApproving')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }
      const {
        status,
        data: { data: rechargedCard },
      } = await this.$axios.patch(
        `recharged-cards/${this.rechargedCard.id}/end-approving`,
        {
          realFaceValue: this.realFaceValue,
          receivedValue: this.receivedValue,
          _relationships: ['creator', 'approver'],
          _sensitive: true,
          _computed: true,
          _abilities: true,
        }
      )
      this.$nuxt.$emit('completeEndApproving')

      if (status < 300) {
        this.$notification.success('Thành công')
        this.rechargedCard = rechargedCard
      }
    },
  },
}
</script>
