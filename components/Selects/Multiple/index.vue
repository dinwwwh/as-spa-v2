<template>
  <!-- @change-search is event need handle -->
  <!-- vue multiselect -->

  <div class="space-y-1">
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700">
      <slot />
    </label>

    <!-- Select -->
    <client-only>
      <MultiSelect
        :id="id"
        v-bind="$attrs"
        :loading="$attrs.loading || false"
        :internal-search="$attrs.loading || false"
        :value="model"
        :options="options"
        :placeholder="$attrs.placeholder || 'Vui lòng chọn'"
        :class="{
          'has-error': hasError,
        }"
        select-label="Nhấn để chọn"
        multiple
        hide-selected
        v-on="$listeners"
        @input="$emit('model', $event)"
        @open="$checkType('Object', error) && error.$reset()"
        @close="$checkType('Object', error) && error.$touch()"
      >
        <template #noOptions>
          <p class="text-gray-500 text-sm">
            Danh sách trống, gõ gì đó để tìm kiếm
          </p>
        </template>
        <template #noResult>
          <p class="text-gray-500 text-sm">
            Không tìm thấy kết quả nào phù hợp
          </p>
        </template>
      </MultiSelect>
    </client-only>

    <!-- Description -->
    <p
      class="text-sm"
      :class="{
        'text-gray-500': !hasError,
        'text-red-500': hasError,
      }"
    >
      <template v-if="$checkType('Object', error) && error.$error">
        {{ $vuelidate.message(error, $attrs.name) }}
      </template>
      <template v-else>
        <slot name="description" />
      </template>
    </p>
  </div>
</template>

<script>
import MultiSelect from 'vue-multiselect'
export default {
  components: { MultiSelect },
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: Array,
      required: true,
      default() {
        const val = []
        this.$emit('model', val)
        return val
      },
    },
    options: {
      type: Array,
      required: true,
    },
    error: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      id: undefined,
    }
  },
  computed: {
    hasError() {
      if (this.$checkType('Object', this.error)) return this.error.$error
      return this.error
    },
  },
  mounted() {
    this.id = this._uid
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.has-error .multiselect__tags {
  @apply !border-red-100;
}
</style>
