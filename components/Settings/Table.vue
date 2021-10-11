<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <span v-if="field === 'key'"> Mã </span>
          <span v-else-if="field === 'description'"> Mô tả </span>
          <span v-else-if="field === 'updatedAt'"> Cập nhật </span>
          <span v-else-if="field === 'actions'" class="sr-only"> Actions </span>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="setting in settings" :key="setting.key">
      <TablesData v-for="field in fields" :key="field + setting.key">
        <span v-if="field === 'key'" class="font-medium text-gray-800">
          {{ setting.key }}
        </span>
        <span v-else-if="field === 'description'">
          {{ $string.limit(setting.description, 40) }}
        </span>
        <span v-else-if="field === 'updatedAt'">
          {{ $dayjs(setting.updatedAt).fromNow() }}
        </span>
        <div v-else-if="field === 'actions'" class="flex items-center gap-2">
          <button
            v-if="setting.canUpdate"
            title="Chỉnh sửa"
            @click="showUpdate(setting)"
          >
            <IconsPencilAlt class="hover:text-indigo-500" />
          </button>
        </div>
      </TablesData>
    </TablesRow>

    <template #other>
      <Popups v-model="isShowUpdate">
        <SettingsUpdate
          v-if="currentSetting"
          class="!shadow-none"
          :setting-key="currentSetting.key"
        />
      </Popups>
    </template>
  </Tables>
</template>

<script>
export default {
  props: {
    settings: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['key', 'description', 'updatedAt', 'actions'],
    },
  },
  data() {
    return {
      currentSetting: undefined,
      isShowUpdate: false,
    }
  },
  methods: {
    showUpdate(setting) {
      this.currentSetting = setting
      this.isShowUpdate = true
    },
  },
}
</script>

