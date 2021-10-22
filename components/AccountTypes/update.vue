<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />

    <div v-if="!$fetchState.pending" class="space-y-8">
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

        <ValidatorsSelectMultipleForAccountType
          v-model="createdValidators"
          :account-type-id="accountTypeId"
        >
          Các bài kiểm tra khi tài khoản đăng lên
          <template #description>
            Kiểm tra theo đúng thứ tự từ trái qua phải
          </template>
        </ValidatorsSelectMultipleForAccountType>

        <ValidatorsSelectMultipleForAccountType
          v-model="updatedValidators"
          :account-type-id="accountTypeId"
        >
          Các bài kiểm tra khi tài khoản cập nhật
          <template #description>
            Kiểm tra theo đúng thứ tự từ trái qua phải
          </template>
        </ValidatorsSelectMultipleForAccountType>

        <ValidatorsSelectMultipleForAccountType
          v-model="boughValidators"
          :account-type-id="accountTypeId"
        >
          Các bài kiểm tra khi tài khoản được mua
          <template #description>
            Kiểm tra theo đúng thứ tự từ trái qua phải
          </template>
        </ValidatorsSelectMultipleForAccountType>
      </div>
    </div>

    <template v-if="!$fetchState.pending" #footer>
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
  props: {
    accountTypeId: {
      type: [String, Number],
      required: true,
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      accountType: {},
      createdValidators: [],
      updatedValidators: [],
      boughValidators: [],
    }
  },
  async fetch() {
    const { data: accountType } = await this.$axios.$get(
      `account-types/${this.accountTypeId}`,
      {
        params: {
          _abilities: true,
          _relationships: ['tags', 'users', 'accountInfos', 'validators'],
        },
      }
    )

    const { CREATED_TYPE, UPDATED_TYPE, BOUGHT_TYPE } = this.$app.validator
    this.accountType = accountType
    this.createdValidators = accountType.validators.filter(
      ({ pivot }) => pivot.type === CREATED_TYPE
    )
    this.updatedValidators = accountType.validators.filter(
      ({ pivot }) => pivot.type === UPDATED_TYPE
    )
    this.boughValidators = accountType.validators.filter(
      ({ pivot }) => pivot.type === BOUGHT_TYPE
    )
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

      const { CREATED_TYPE, UPDATED_TYPE, BOUGHT_TYPE } = this.$app.validator
      const createdValidators = this.createdValidators.map((validator) => ({
        ...validator,
        pivot: {
          ...validator.pivot,
          type: CREATED_TYPE,
        },
      }))
      const updatedValidators = this.updatedValidators.map((validator) => ({
        ...validator,
        pivot: {
          ...validator.pivot,
          type: UPDATED_TYPE,
        },
      }))
      const boughValidators = this.boughValidators.map((validator) => ({
        ...validator,
        pivot: {
          ...validator.pivot,
          type: BOUGHT_TYPE,
        },
      }))

      const { status } = await this.$axios.put(
        `account-types/${this.accountType.id}`,
        {
          ...this.accountType,
          validators: [
            ...createdValidators,
            ...updatedValidators,
            ...boughValidators,
          ],
        }
      )
      this.$nuxt.$emit('completeUpdateAccountType')

      if (status < 300) {
        this.$notification.success('Cập nhật thành công')
      }
    },
  },
}
</script>
