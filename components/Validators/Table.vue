<template>
  <Tables>
    <template #head>
      <TablesHeadRow>
        <TablesHeader v-for="field in fields" :key="field">
          <template v-if="field === 'id'"> ID </template>
          <template v-else-if="field === 'name'"> Tên </template>
          <template v-else-if="field === 'description'"> Mô tả </template>
          <template v-else-if="field === 'updatedAt'"> Cập nhật </template>
          <template v-else-if="field === 'actions'">
            <span class="sr-only"> Hành động </span>
          </template>
        </TablesHeader>
      </TablesHeadRow>
    </template>

    <TablesRow v-for="validator in validators" :key="validator.id">
      <TablesData v-for="field in fields" :key="validator.id + field">
        <template v-if="field === 'id'">
          <span class="text-gray-800 font-medium">
            {{ validator.id }}
          </span>
        </template>

        <template v-else-if="field === 'name'">
          <span class="text-gray-800 font-medium">
            {{ $string.limit(validator.name, 44) }}
          </span>
        </template>

        <template v-else-if="field === 'description'">
          {{ $string.limit(validator.description, 30) }}
        </template>

        <template v-else-if="field === 'updatedAt'">
          {{ $dayjs(validator.updatedAt).fromNow() }}
        </template>

        <div v-else-if="field === 'actions'" class="flex flex-wrap gap-2">
          <button
            v-if="validator.canUpdate"
            title="Cập nhật"
            @click="showUpdate(validator)"
          >
            <IconsPencilAlt class="h-5 hover:text-indigo-600 cursor-pointer" />
          </button>
        </div>
      </TablesData>
    </TablesRow>

    <template #other>
      <Popups v-model="isShowUpdate">
        <ValidatorsUpdate
          v-if="currentValidator"
          :validator-id="currentValidator.id"
          class="!shadow-none"
        />
      </Popups>
    </template>
  </Tables>
</template>

<script>
export default {
  props: {
    validators: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['id', 'name', 'description', 'actions'],
    },
  },
  data() {
    return {
      isShowUpdate: false,
      currentValidator: undefined,
    }
  },
  methods: {
    showUpdate(validator) {
      this.isShowUpdate = true
      this.currentValidator = validator
    },
  },
}
</script>
