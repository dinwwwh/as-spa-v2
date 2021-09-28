<template>
  <div
    class="
      shadow
      border-b border-gray-200
      rounded-sm
      sm:rounded-lg
      overflow-x-auto
    "
  >
    <table class="divide-y divide-gray-200 w-full">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="field in fields"
            :key="field"
            scope="col"
            class="
              px-6
              py-3
              uppercase
              text-left text-xs
              font-medium
              text-gray-500
              tracking-wider
            "
          >
            <template v-if="field === 'telco'"> Nhà mạng </template>
            <template v-else-if="field === 'serial'"> Số Seri </template>
            <template v-else-if="field === 'code'"> mã </template>
            <template v-else-if="field === 'status'"> trạng thái </template>
            <template v-else-if="field === 'creator'"> Người nạp </template>
            <template v-else-if="field === 'actions'">
              <span class="sr-only">Actions</span>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="rechargedCard in rechargedCards"
          :key="rechargedCard.id"
          class="odd:bg-gray-100 even:bg-gray-50"
        >
          <td
            v-for="field in fields"
            :key="field + rechargedCard.id"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            <template v-if="field === 'telco'">
              <span class="font-medium text-gray-900">
                {{ rechargedCard.telco }}
              </span>
            </template>

            <template v-else-if="field === 'serial'">
              {{ rechargedCard.serial }}
            </template>

            <template v-else-if="field === 'code'">
              {{ rechargedCard.code }}
            </template>

            <template v-else-if="field === 'status'">
              <span
                :class="
                  'px-2 py-1 rounded-full font-medium ' +
                  $app.rechargedCard.getStatus(rechargedCard).classes
                "
              >
                {{ $app.rechargedCard.getStatus(rechargedCard).name }}
              </span>
            </template>

            <template v-else-if="field === 'creator'">
              {{ rechargedCard.creator && rechargedCard.creator.name }}
            </template>

            <template v-else-if="field === 'actions'">
              <NuxtLink
                :to="{
                  name: 'recharged-cards-id',
                  params: {
                    id: rechargedCard.id,
                  },
                }"
                class="hover:text-indigo-500"
              >
                <IconsEye />
              </NuxtLink>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    rechargedCards: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => ['telco', 'serial', 'creator', 'status', 'actions'],
    },
  },
}
</script>
