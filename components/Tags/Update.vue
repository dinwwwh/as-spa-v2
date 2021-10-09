<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />

    <div v-if="!$fetchState.pending" class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Cập nhật nhãn "{{ tag.name }}" </HeadingsBase3>
      </div>

      <div class="space-y-6">
        <Inputs
          v-model="tag.name"
          type="text"
          :error="$v.tag.name"
          :class="inputClasses"
        >
          Tên
        </Inputs>

        <Selects
          v-model="tag.type"
          :options="typeOptions"
          value-key="value"
          display-key="display"
          :class="inputClasses"
        >
          Kiểu nhãn
        </Selects>

        <Textareas
          v-model="tag.description"
          :error="$v.tag.description"
          placeholder="Nhãn này mô tả đối tượng của bạn thuộc a, b, c..."
          :class="inputClasses"
        >
          Mô tả
        </Textareas>

        <TagsSelectsSingle
          v-model="tag.parent"
          :error="$v.tag.parent"
          :class="inputClasses"
        >
          Nhãn cha
          <span class="text-gray-500 text-xs italic"> không bắt buộc </span>
          <template #description>
            Tất cả các đối tượng (như bài viết, tài khoản, ...) sử dụng nhãn này
            trong tương lai sẽ thay thế bằng nhãn cha.
          </template>
        </TagsSelectsSingle>
      </div>
    </div>

    <template v-if="!$fetchState.pending" #footer>
      <div class="flex gap-3 items-center justify-end">
        <Buttons color="green" loading="completeUpdateTag" @click="update">
          Lưu
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    tagSlug: {
      type: String,
      required: true,
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tag: undefined,
      hasMigrateInFuture: false,
      migratedTag: false,
      typeOptions: [
        {
          display: 'Dùng để miêu tả thuộc tính',
          value: null,
        },
        {
          display: 'Dùng để miêu tả thể loại',
          value: 1,
        },
      ],
    }
  },
  async fetch() {
    const { data: tag } = await this.$axios.$get(`tags/${this.tagSlug}`, {
      params: {
        _relationships: ['parent'],
      },
    })

    this.tag = tag
  },
  validations() {
    const { required } = this.$vuelidate.rules
    return {
      tag: {
        name: {
          required,
        },
        description: {},
      },
    }
  },
  methods: {
    async update() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeUpdateTag')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }
      if (this.tag.slug === this.tag?.parent?.slug) {
        this.$nuxt.$emit('completeUpdateTag')
        this.$notification.error('Nhãn đích đến phải khác nhãn ban đầu')
        return
      }

      const { status, data } = await this.$axios.put(`tags/${this.tag.slug}`, {
        ...this.tag,
        _abilities: true,
        _computed: true,
        _relationships: ['parent'],
      })
      this.$nuxt.$emit('completeUpdateTag')

      if (status < 300) {
        this.tag = data.data
        this.$emit('updated', { ...data.data })
        this.$notification.success('Lưu nhãn thành công')
      }
    },
  },
}
</script>
