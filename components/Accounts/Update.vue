<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />
    <template v-if="!$fetchState.pending">
      <div class="space-y-8">
        <div class="space-y-2">
          <HeadingsBase3> Cập nhật tài khoản #{{ account.id }} </HeadingsBase3>
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

          <Inputs
            v-for="accountInfo in account.accountType.creatorAccountInfos"
            :key="accountInfo.id"
            type="text"
            :model="getValueOfAccountInfo(accountInfo)"
            :error="$v.account.creatorInfos"
            name="những thông tin này"
            @model="onUpdateAccountInfo(accountInfo, $event)"
          >
            {{ accountInfo.name }}
            <template #description>{{ accountInfo.description }}</template>
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

          <Checkboxes v-model="hasUpdateImages"> Cập nhật ảnh </Checkboxes>

          <template v-if="hasUpdateImages">
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
          </template>
        </div>
      </div>
    </template>

    <template v-if="!$fetchState.pending" #footer>
      <div class="flex items-center justify-end">
        <Buttons color="green" loading="completeUpdateAccount" @click="update">
          Lưu
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    accountId: {
      type: Number,
      required: true,
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      account: undefined,
      hasUpdateImages: false,
    }
  },
  async fetch() {
    const { data: account } = await this.$axios.$get(
      `accounts/${this.accountId}`,
      {
        params: {
          _sensitive: true,
          _relationships: [
            'accountType.creatorAccountInfos',
            'creatorInfos',
            'tags',
          ],
        },
      }
    )

    this.account = account
  },
  validations() {
    const { required } = this.$vuelidate.rules

    const result = {
      account: {
        price: {
          required,
        },
        tags: {
          required,
        },
        creatorInfos: {
          required,
        },
      },
    }

    if (this.hasUpdateImages)
      result.account.mainImage = {
        required,
      }

    return result
  },
  methods: {
    async update() {
      this.$v.account.$touch()
      if (this.$v.account.$invalid) {
        this.$nuxt.$emit('completeUpdateAccount')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const data = {
        _method: 'PUT',
        description: this.account.description,
        creatorInfos: this.account.creatorInfos,
        cost: this.account.cost,
        price: this.account.price,
        tags: this.account.tags,
        _relationships: ['images', 'tags'],
        _abilities: true,
        _computed: true,
      }

      if (this.hasUpdateImages)
        data.images = [
          this.account.mainImage,
          ...(this.account.otherImages ?? []),
        ]
      const {
        status,
        data: { data: account },
      } = await this.$axios.post(
        `accounts/${this.accountId}`,
        this.$formData(data)
      )

      this.$nuxt.$emit('completeUpdateAccount')

      if (status < 300) {
        this.$emit('updated', account)
        this.$notification.success('Lưu thành công')
      }
    },

    getValueOfAccountInfo(accountInfo) {
      return this.account.creatorInfos.find(({ id }) => id === accountInfo.id)
        ?.pivot?.value
    },

    onUpdateAccountInfo(accountInfo, pivotValue) {
      if (this.getValueOfAccountInfo(accountInfo)) {
        this.account.creatorInfos = this.account.creatorInfos.map((i) => {
          if (i.id === accountInfo.id) {
            return {
              ...accountInfo,
              pivot: {
                value: pivotValue,
              },
            }
          }
          return i
        })
      } else {
        this.account.creatorInfos.push({
          ...accountInfo,
          pivot: {
            value: pivotValue,
          },
        })
      }
    },
  },
}
</script>
