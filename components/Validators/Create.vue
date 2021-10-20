<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Tạo xác thực </HeadingsBase3>
        <MessagesInfo>
          Một xác thực có nghiệm vụ kiểm tra, xác minh một đối tượng (tài khoản,
          bài viết, ...)
        </MessagesInfo>
      </div>

      <div class="space-y-4">
        <Inputs
          v-model="validator.name"
          type="text"
          name="tên"
          placeholder="Kiểm tra thông tin tài khoản - làng lá phiêu lưu ký"
          :class="inputClasses"
          :error="$v.validator.name"
        >
          Tên
          <template #description>
            Tên phải chưa được sử dụng trước đây
          </template>
        </Inputs>

        <Textareas
          v-model="validator.description"
          name="mô tả chung"
          placeholder="Múc đích xác minh thông tin tài khoản cung cấp cho người mua có đúng như mô tả"
          :error="$v.validator.description"
        >
          Mô tả chung
        </Textareas>

        <Textareas
          v-model="validator.approverDescription"
          name="mô tả cho người phê duyệt"
          placeholder="Bạn cần phải kiểm tra đầy đủ thông tin của tài khoản, từ a-z, ..."
          :error="$v.validator.approverDescription"
        >
          Mô tả cho người phê duyệt
        </Textareas>

        <SelectsMultipleTaggable
          v-model="validator.readableFields"
          :error="$v.validator.readableFields"
          :options="[]"
          @tag="validator.readableFields.push($event)"
        >
          Các thông tin cần cung cấp
          <template #description>
            Là các thông tin nhạy cảm sẽ cung cấp cho người phê duyệt.
          </template>
        </SelectsMultipleTaggable>

        <SelectsMultipleTaggable
          v-model="validator.updatableFields"
          :options="[]"
          :error="$v.validator.updatableFields"
          @tag="validator.updatableFields.push($event)"
        >
          Các thông tin cần cập nhật
          <template #description>
            Là các thông tin nhạy cảm mà người phê duyệt cần cập nhật.
          </template>
        </SelectsMultipleTaggable>

        <UsersSelectsMultiple
          v-model="validator.users"
          :error="$v.validator.users"
        >
          Phê duyệt viên
        </UsersSelectsMultiple>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons
          color="green"
          loading="completeCreateValidator"
          @click="create"
        >
          Tạo
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      validator: {
        readableFields: [],
        updatableFields: [],
      },
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      validator: {
        name: {
          required,
        },
        description: {
          required,
        },
        approverDescription: {
          required,
        },
      },
    }
  },
  methods: {
    async create() {
      this.$v.validator.$touch()
      if (this.$v.validator.$invalid) {
        this.$nuxt.$emit('completeCreateValidator')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const { status, data } = await this.$axios.post(
        'validators',
        this.validator
      )
      this.$nuxt.$emit('completeCreateValidator')

      if (status < 300) {
        this.$emit('created', data.data)
        this.$notification.success('Tạo thành công')
      }
    },
  },
}
</script>
