<template>
  <ul class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <li v-for="i in accountTypes" :key="i.id">
      <Groups
        class="h-full cursor-pointer"
        :class="{
          'ring ring-indigo-500': accountType && i.id == accountType.id,
        }"
        @click="selectAccountType(i)"
      >
        <HeadingsBase5> {{ i.name }} </HeadingsBase5>
        <Badges v-for="tag in i.tags" :key="i.id + tag.slug">
          {{ tag.name }}
        </Badges>
      </Groups>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'accountType',
    event: 'model',
  },
  props: {
    accountTypes: {
      type: Array,
      required: true,
      validator: (accountTypes) =>
        accountTypes.every((accountType) => accountType.tags),
    },
    accountType: {
      type: null,
      required: true,
    },
  },
  methods: {
    selectAccountType(accountType) {
      if (this.accountType && accountType.id === this.accountType.id) {
        this.$emit('model', null)
      } else {
        this.$emit('model', accountType)
      }
    },
  },
}
</script>
