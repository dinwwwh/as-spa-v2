<template>
  <div class="space-y-1">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot />
    </label>

    <!-- Textarea -->
    <textarea
      :id="id"
      :value="model"
      class="
        shadow-sm
        block
        w-full
        sm:text-sm
        border border-gray-300
        rounded-md
        focus:ring-indigo-500
        focus:border-indigo-500
      "
      :class="{
        'border-red-300': hasError,
        'border-gray-300': !hasError,
        'bg-gray-100 cursor-not-allowed': $attrs.disabled !== undefined,
      }"
      v-bind="$attrs"
      :rows="$attrs.rows || 3"
      @focus="$checkType('Object', error) && error.$reset()"
      @blur="$checkType('Object', error) && error.$touch()"
      @input="$emit('model', $event.target.value)"
    ></textarea>

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
