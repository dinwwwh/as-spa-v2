<template>
  <section class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
    <div class="divide-y divide-gray-200">
      <div class="px-4 py-5 sm:px-6">
        <h2 id="notes-title" class="text-lg font-medium text-gray-900">
          Bình luận
        </h2>
      </div>

      <div v-if="comments.length > 0" class="px-4 py-6 sm:px-6">
        <ul role="list" class="space-y-8">
          <li v-for="comment in comments" :key="comment.id">
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="comment.creator.avatarUrl"
                />
              </div>
              <div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-gray-900">
                    {{ comment.creator.name }}
                  </a>
                </div>
                <div class="mt-1 text-sm text-gray-700">
                  <p>
                    {{ comment.content }}
                  </p>
                </div>
                <div class="mt-2 text-sm space-x-2">
                  <span class="text-gray-500 font-medium">
                    {{ $dayjs(comment.createdAt).fromNow() }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-6 sm:px-6">
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" :src="$auth.user('avatarUrl')" />
        </div>
        <div class="min-w-0 flex-1">
          <Textareas
            v-model="content"
            :error="$v.content"
            name="nội dung"
            placeholder="Hãy viết gì đó..."
          />
          <div class="mt-3 flex items-center justify-end">
            <Buttons loading="completeCreateAccount" @click="createComment">
              Bình luận
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    commentableId: {
      type: Number,
      required: true,
    },
    commentableType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      params: {
        _commentableId: this.commentableId,
        _commentableType: this.commentableType,
        _relationships: ['creator'],
        _computed: true,
        _orderBy: 'asc',
      },
      content: undefined,
      comments: [],
    }
  },
  async fetch() {
    const { data: comments } = await this.$axios.$get(`comments`, {
      params: this.params,
    })

    this.comments = comments
  },
  validations() {
    const { required, minLength } = this.$vuelidate.rules

    return {
      content: {
        required,
        minLength: minLength(5),
      },
    }
  },
  methods: {
    async createComment() {
      this.$v.content.$touch()
      if (this.$v.content.$invalid) return

      const { status, data } = await this.$axios.post('comments', {
        ...this.params,
        content: this.content,
        commentableId: this.commentableId,
        commentableType: this.commentableType,
      })
      this.$nuxt.$emit('completeCreateAccount')

      if (status === 201) {
        this.$notification.success('Bình luận thành công')
        this.comments.push(data.data)
      }
    },
  },
}
</script>

