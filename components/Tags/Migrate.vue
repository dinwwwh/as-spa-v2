<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />

    <div v-if="!$fetchState.pending" class="space-y-8">
      <div class="space-y-2">
        <HeadingsBase3> Di cư nhãn "{{ tag.name }}" </HeadingsBase3>

        <MessagesInfo class="max-w-[80vw]">
          Việc này sẽ chuyển tất cả các thực thẻ chứa nhãn "{{ tag.name }}" (như
          tài khoản, bài viết, ...) sang một nhãn khác.
        </MessagesInfo>
      </div>

      <div class="space-y-6">
        <TagsSelectsSingle v-model="migratedTag" :error="$v.migratedTag">
          Nhãn đích đến
        </TagsSelectsSingle>

        <Checkboxes v-model="hasMigrateInFuture" :class="inputClasses">
          Di cư cả trong tương lai
        </Checkboxes>
      </div>
    </div>

    <template v-if="!$fetchState.pending" #footer>
      <div class="flex gap-3 items-center justify-end">
        <Buttons color="green" loading="completeMigrateTag" @click="migrate">
          Di cư
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
    }
  },
  async fetch() {
    const { data: tag } = await this.$axios.$get(`tags/${this.tagSlug}`, {
      params: {},
    })

    this.tag = tag
  },
  validations() {
    const { required } = this.$vuelidate.rules
    return {
      migratedTag: {
        slug: {
          required,
        },
      },
    }
  },
  methods: {
    async migrate() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$nuxt.$emit('completeMigrateTag')
        this.$notification.error('Vui lòng kiểm tra lại thông tin')
        return
      }
      if (this.tag.slug === this.migratedTag.slug) {
        this.$nuxt.$emit('completeMigrateTag')
        this.$notification.error('Nhãn đích đến phải khác nhãn ban đầu')
        return
      }

      const { status, data } = await this.$axios.patch(
        `tags/${this.tag.slug}/migrate/${this.migratedTag.slug}`,
        {
          hasMigrateInFuture: this.hasMigrateInFuture,
        }
      )
      this.$nuxt.$emit('completeMigrateTag')

      if (status < 300) {
        this.$notification.success('Di cư nhãn thành công')
        this.$emit('migrated', data)
      }
    },
  },
}
</script>
