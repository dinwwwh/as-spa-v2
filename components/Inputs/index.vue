<template>
  <div class="space-y-1">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot />
    </label>
    <!-- Input -->
    <input
      :id="id"
      :value="model"
      class="shadow-sm block w-full sm:text-sm rounded-md"
      :class="{
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500':
          !hasError,
        'border-red-300 focus:border-red-500 focus:ring-red-500': hasError,
        'bg-gray-100 cursor-not-allowed': $attrs.disabled !== undefined,
      }"
      v-bind="$attrs"
      v-on="$listeners"
      @focus="$checkType('Object', error) && error.$reset()"
      @blur="$checkType('Object', error) && error.$touch()"
      @input="$emit('model', $event.target.value)"
    />

    <!-- Description -->
    <p
      class="text-sm"
      :class="{
        'text-gray-500': !error,
        'text-red-500': error,
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
export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      type: null,
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
      if (this.$checkType('Boolean', this.error)) return this.error
      return this.error.$error
    },
  },
  mounted() {
    this.id = this._uid
  },
}
</script>
