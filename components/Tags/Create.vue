<template>
  <GroupsSeparated>
    <div class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Tạo nhãn </HeadingsBase3>
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

    <template #footer>
      <div class="flex gap-3 items-center justify-end">
        <Buttons color="green" loading="completeCreateTag" @click="create">
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
      tag: {},
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
    async create() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeCreateTag')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }

      const { status, data } = await this.$axios.post('tags', {
        ...this.tag,
        _abilities: true,
        _computed: true,
        _relationships: ['parent'],
      })
      this.$nuxt.$emit('completeCreateTag')

      if (status < 300) {
        this.$emit('created', data.data)
        this.$notification.success('Tạo nhãn thành công')
      }
    },
  },
}
</script>
