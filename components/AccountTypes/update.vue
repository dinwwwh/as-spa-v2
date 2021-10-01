<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div>
        <HeadingsBase3>
          Cập nhật kiểu tài khoản {{ accountType.name }}
          <span class="text-base italic text-gray-500">
            #{{ accountType.id }}
          </span>
        </HeadingsBase3>
      </div>

      <div class="space-y-6">
        <Inputs
          v-model="accountType.name"
          type="text"
          :class="inputClasses"
          :error="$v.accountType.name"
          name="tên"
          placeholder="đăng ký ảo"
        >
          Tên
        </Inputs>

        <Textareas
          v-model="accountType.description"
          type="text"
          :class="inputClasses"
          :error="$v.accountType.description"
          name="mô tả"
          placeholder="gồm những nick không có khả năng lấy lại mật khẩu."
        >
          Mô tả
        </Textareas>

        <TagsSelectsMultiple
          v-model="accountType.tags"
          :error="$v.accountType.tags"
          :class="inputClasses"
          name="nhãn"
        />

        <UsersSelectsMultiple
          v-model="accountType.users"
          :error="$v.accountType.users"
          :class="inputClasses"
        >
          Những người có thể sử dụng
          <template #description>
            Là những người có thể sử dụng kiểu tài khoản này để đăng tài khoản.
          </template>
        </UsersSelectsMultiple>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Buttons
          color="yellow"
          loading="completeUpdateAccountType"
          @click="update"
        >
          Cập nhật
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
  computed: {
    accountType: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('model', val)
      },
    },
  },
  validations() {
    const { required, minLength } = this.$vuelidate.rules

    return {
      accountType: {
        name: {
          required,
        },
        description: {},
        tags: {
          required,
          minLength: minLength(1),
        },
        users: {
          required,
          minLength: minLength(1),
        },
      },
    }
  },
  methods: {
    async update() {
      this.$v.accountType.$touch()
      if (this.$v.accountType.$invalid) {
        this.$nuxt.$emit('completeUpdateAccountType')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const { status } = await this.$axios.put(
        `account-types/${this.accountType.id}`,
        this.accountType
      )
      this.$nuxt.$emit('completeUpdateAccountType')

      if (status < 300) {
        this.$notification.success('Cập nhật thành công')
      }
    },
  },
}
</script>
