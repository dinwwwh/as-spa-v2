<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <span v-if="field === 'id'"> ID </span>
          <span v-else-if="field === 'description'"> Mô tả </span>
          <span v-else-if="field === 'status'"> Trạng thái </span>
          <span v-else-if="field === 'updatedAt'"> Cập nhật </span>
          <span v-else-if="field === 'createdAt'"> Cập nhật </span>
          <span v-else-if="field === 'actions'" class="sr-only"> Actions </span>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="validation in validations" :key="validation.id">
      <TablesData v-for="field in fields" :key="field + validation.id">
        <span v-if="field === 'id'" class="font-medium text-gray-800">
          {{ validation.id }}
        </span>

        <span v-else-if="field === 'description'">
          {{ $string.limit(validation.description, 28) }}
        </span>

        <span
          v-else-if="field === 'status'"
          :class="
            $app.validation.getStatusMeaning(validation).classes +
            ' py-1 px-2 rounded-full'
          "
        >
          {{ $app.validation.getStatusMeaning(validation).name }}
        </span>

        <span v-else-if="field === 'createdAt'">
          {{ $dayjs(validation.createdAt).fromNow() }}
        </span>

        <span v-else-if="field === 'updatedAt'">
          {{ $dayjs(validation.updatedAt).fromNow() }}
        </span>

        <div v-else-if="field === 'actions'" class="flex items-center gap-2">
          <NuxtLink
            :to="{
              name: 'validations-id',
              params: {
                id: validation.id,
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
  props: {
    validations: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['id', 'status', 'description', 'updatedAt', 'actions'],
    },
  },
}
</script>

