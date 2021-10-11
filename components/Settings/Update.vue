<template>
  <GroupsSeparated>
    <AppLoading v-if="$fetchState.pending" />
    <div v-if="!$fetchState.pending" class="space-y-8">
      <HeadingsBase3> Cập nhật cài đặt "{{ setting.key }}" </HeadingsBase3>

      <div class="space-y-4">
        <Textareas v-model="setting.description"> Mô tả </Textareas>

        <MessagesInfo class="md:max-w-[80vw]">
          {{ setting.structureDescription }}
        </MessagesInfo>

        <Textareas
          :model="JSON.stringify(setting.value)"
          @model="onUpdateValue"
        >
          Dữ liệu
          <template #description>
            Dữ liệu phải đúng cú pháp json, và tuôn theo cấu trúc của nó.
          </template>
        </Textareas>
      </div>
    </div>

    <template v-if="!$fetchState.pending" #footer>
      <div class="flex items-center gap-3 justify-end">
        <Buttons color="green" loading="completeUpdateSetting" @click="update">
          Lưu
        </Buttons>
      </div>
    </template>
  </GroupsSeparated>
</template>

<script>
export default {
  props: {
    settingKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      setting: undefined,
    }
  },
  async fetch() {
    const { data: setting } = await this.$axios.$get(
      `settings/${this.settingKey}`,
      {
        params: {
          _sensitive: true,
        },
      }
    )

    this.setting = setting
  },
  methods: {
    async update() {
      const { status } = await this.$axios.put(
        `settings/${this.settingKey}`,
        this.setting
      )
      this.$nuxt.$emit('completeUpdateSetting')

      if (status < 300) {
        this.$emit('updated', this.setting)
        this.$notification.success('Lưu thành công')
      }
    },
    onUpdateValue(value) {
      try {
        this.setting.value = JSON.parse(value)
      } catch (error) {}
    },
  },
}
</script>
