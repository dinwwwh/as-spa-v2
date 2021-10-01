<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <span v-if="field === 'name'"> Tên </span>
          <span v-else-if="field === 'description'"> Mô tả </span>
          <span v-else-if="field === 'updatedAt'"> Cập nhật </span>
          <span v-else-if="field === 'createdAt'"> Tạo </span>
          <span v-else-if="field === 'actions'" class="sr-only"> Actions </span>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="accountType in accountTypes" :key="accountType.id">
      <TablesData v-for="field in fields" :key="field + accountType.id">
        <span v-if="field === 'name'" class="font-medium text-gray-800">
          {{ accountType.name }}
        </span>
        <span v-else-if="field === 'description'">
          {{ $string.limit(accountType.description, 28) }}
        </span>
        <span v-else-if="field === 'createdAt'">
          {{ $dayjs(accountType.createdAt).fromNow() }}
        </span>
        <span v-else-if="field === 'updatedAt'">
          {{ $dayjs(accountType.updatedAt).fromNow() }}
        </span>
        <div v-else-if="field === 'actions'" class="flex items-center gap-2">
          <NuxtLink
            :to="{
              name: 'account-types-id',
              params: {
                id: accountType.id,
              },
            }"
            class="hover:text-indigo-500"
          >
            <IconsEye />
          </NuxtLink>
        </div>
      </TablesData>
    </TablesRow>
  </Tables>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['name', 'description', 'updatedAt', 'actions'],
    },
  },
  computed: {
    accountTypes: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('model', val)
      },
    },
  },
}
</script>

