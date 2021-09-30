<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div>
        <HeadingsBase3>Tạo kiểu tài khoản</HeadingsBase3>
      </div>

      <div class="space-y-6">
        <Inputs
          v-model="name"
          type="text"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
          :error="$v.name"
          name="tên"
          placeholder="đăng ký ảo"
        >
          Tên
        </Inputs>

        <Textareas
          v-model="description"
          type="text"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
          :error="$v.description"
          name="mô tả"
          placeholder="gồm những nick không có khả năng lấy lại mật khẩu."
        >
          Mô tả
        </Textareas>

        <TagsSelectsMultiple
          v-model="tags"
          :error="$v.tags"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
          name="nhãn"
        />

        <UsersSelectsMultiple
          v-model="users"
          :error="$v.users"
          class="md:w-4/5 lg:w-3/4 xl:w-2/3"
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
          color="green"
          loading="completeCreateAccountType"
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
  data() {
    return {
      name: undefined,
      description: undefined,
      tags: [],
      users: [],
    }
  },
  validations() {
    const { required, minLength } = this.$vuelidate.rules

    return {
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
    }
  },
  methods: {
    async create() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeCreateAccountType')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const { status } = await this.$axios.post('account-types', {
        name: this.name,
        description: this.description,
        tags: this.tags,
        users: this.users,
      })
      this.$nuxt.$emit('completeCreateAccountType')

      if (status < 300) {
        this.$notification.success('Tạo thành công')
      }
    },
  },
}
</script>
