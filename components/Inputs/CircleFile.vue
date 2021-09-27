<template>
  <div>
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot />
    </label>
    <input
      :id="id"
      ref="file"
      type="file"
      class="hidden"
      accept="image/*"
      v-bind="$attrs"
      v-on="$listeners"
      @change="uploadFile"
    />
    <div class="mt-1 flex items-center space-x-5">
      <span
        class="inline-block h-12 w-12 overflow-hidden bg-gray-100 rounded-full"
      >
        <img
          v-if="internalPreview"
          :src="internalPreview"
          class="w-full h-full object-cover object-center"
        />
        <svg
          v-else
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <button
        type="button"
        class="
          bg-white
          py-2
          border border-gray-300
          px-3
          rounded-md
          shadow-sm
          text-sm
          leading-4
          font-medium
          text-gray-700
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        "
        :class="{
          'hover:bg-gray-50': $attrs.disabled === undefined,
          'cursor-not-allowed bg-gray-200': $attrs.disabled !== undefined,
        }"
        @click="$refs.file.click()"
      >
        <slot name="button-content">Thay đổi</slot>
      </button>
    </div>
  </div>
</template>

<script>
import { typeCheck } from 'type-check'

export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      validator(model) {
        return typeCheck('Undefined|File', model)
      },
      required: true,
    },
    preview: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      id: undefined,
      internalPreview: this.preview,
    }
  },
  watch: {
    model() {
      this.loadInternalPreview()
    },
  },
  mounted() {
    this.id = this._uid
    this.loadInternalPreview()
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0]
      this.$emit('model', file)
    },
    async loadInternalPreview() {
      this.internalPreview = (await this.$file.read(this.model)) || this.preview
    },
  },
}
</script>
