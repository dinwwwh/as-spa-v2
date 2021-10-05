<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Đăng tài khoản để bán </HeadingsBase3>
        <span class="text-gray-500 text-sm">
          Tài khoản sẽ thuộc kiểu tài khoản
          <Badges> {{ accountType.name }} </Badges>
        </span>
      </div>

      <div class="space-y-6">
        <Textareas
          v-model="account.description"
          :class="inputClasses"
          :error="$v.account.description"
          name="mô tả"
        >
          Mô tả
          <template #description>
            Những dòng mô tả này sẽ giúp người mua tìm được tài khoản một cách
            dễ dàng hơn
          </template>
        </Textareas>

        <Inputs
          v-model="account.price"
          :class="inputClasses"
          type="number"
          :error="$v.account.price"
          name="giá"
        >
          Giá bán
          <template #description>
            Là giá bán tài khoản này trên hệ thống.
          </template>
        </Inputs>

        <Inputs
          v-model="account.cost"
          :class="inputClasses"
          type="number"
          :error="$v.account.cost"
          name="chi phí"
        >
          Chi phí
          <span class="text-gray-500 text-xs italic font-light">
            không bắt buộc
          </span>
          <template #description>
            Không có mục đích gì khác ngoài việc giúp bạn thống kê doanh thu.
          </template>
        </Inputs>

        <TagsSelectsMultiple
          v-model="account.tags"
          :class="inputClasses"
          :error="$v.account.tags"
        >
          <template #description>
            Mỗi nhãn tương đương với một thuộc tính có trong nick của bạn
            <span class="text-gray-500 text-xs italic">
              vd: sever 3, vật phẩm a, vật phẩm b
            </span>
          </template>
        </TagsSelectsMultiple>

        <InputsFiles
          v-model="account.mainImage"
          :class="inputClasses"
          :error="$v.account.mainImage"
          accept="image/*"
          name="ảnh chính"
        >
          Ảnh chính
        </InputsFiles>

        <InputsFiles
          v-model="account.otherImages"
          multiple
          accept="image/*"
          :class="inputClasses"
          :error="$v.account.otherImages"
        >
          Những ảnh phụ
        </InputsFiles>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end">
        <Buttons color="green" loading="completeCreateAccount" @click="create">
          Tạo
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
      default: undefined,
    },
    accountType: {
      type: Object,
      required: true,
      validator(val) {
        return val.accountInfos !== undefined
      },
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      account: this.model || {},
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      account: {
        price: {
          required,
        },
        tags: {
          required,
        },
        mainImage: {
          required,
        },
      },
    }
  },
  methods: {
    async create() {
      this.$v.account.$touch()
      if (this.$v.account.$invalid) {
        this.$nuxt.$emit('completeCreateAccount')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const {
        status,
        data: { data: account },
      } = await this.$axios.post(
        `account-types/${this.$route.params.id}/accounts`,
        this.$formData({
          description: this.account.description,
          cost: this.account.cost,
          price: this.account.price,
          tags: this.account.tags,
          images: [this.account.mainImage, ...(this.account.otherImages ?? [])],
          _relationships: ['images', 'tags'],
          _abilities: true,
          _computed: true,
        })
      )

      this.$nuxt.$emit('completeCreateAccount')

      if (status < 300) {
        this.$emit('model', account)
        this.$notification.success('Đăng thành công')
      }
    },
  },
}
</script>
