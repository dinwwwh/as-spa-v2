<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <template v-if="field === 'name'"> Tên </template>
          <template v-else-if="field === 'parent'"> Thuộc về </template>
          <template v-else-if="field === 'updatedAt'"> Cập nhật </template>
          <template v-else-if="field === 'actions'">
            <span class="sr-only"> Hành động </span>
          </template>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="tag in tags" :key="tag.slug">
      <TablesData v-for="field in fields" :key="tag.slug + field">
        <template v-if="field === 'name'">
          <span class="text-gray-800 font-medium">{{ tag.name }}</span>
        </template>

        <template v-else-if="field === 'parent'">
          {{ tag.parent && tag.parent.name }}
        </template>

        <template v-else-if="field === 'updatedAt'">
          {{ $dayjs(tag.updatedAt).fromNow() }}
        </template>

        <div v-else-if="field === 'actions'" class="flex flex-wrap gap-2">
          <button
            v-if="tag.canUpdate"
            title="Di cư"
            @click="showMigrateScreen(tag)"
          >
            <IconsScissors class="h-5 hover:text-indigo-600 cursor-pointer" />
          </button>
          <button
            v-if="tag.canUpdate"
            title="Cập nhật"
            @click="showUpdateScreen(tag)"
          >
            <IconsPencilAlt class="h-5 hover:text-indigo-600 cursor-pointer" />
          </button>
          <NuxtLink
            :to="{ name: 'tags-slug', params: { slug: tag.slug } }"
            title="Xem chi tiết"
          >
            <IconsEye class="h-5 hover:text-indigo-600 cursor-pointer" />
          </NuxtLink>
        </div>
      </TablesData>
    </TablesRow>

    <template #other>
      <Popups v-model="isShowMigrateScreen">
        <TagsMigrate
          v-if="currentActionTag"
          :tag-slug="currentActionTag.slug"
          class="shadow-none"
        />
      </Popups>

      <Popups v-model="isShowUpdateScreen">
        <TagsUpdate
          v-if="currentActionTag"
          :tag-slug="currentActionTag.slug"
          class="shadow-none"
        />
      </Popups>
    </template>
  </Tables>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['name', 'parent', 'updatedAt', 'actions'],
    },
  },
  data() {
    return {
      isShowMigrateScreen: false,
      isShowUpdateScreen: false,
      currentActionTag: undefined,
    }
  },
  methods: {
    showMigrateScreen(tag) {
      this.isShowMigrateScreen = true
      this.currentActionTag = tag
    },
    showUpdateScreen(tag) {
      this.isShowUpdateScreen = true
      this.currentActionTag = tag
    },
  },
}
</script>
