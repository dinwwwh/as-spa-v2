<template>
  <div class="space-y-1 min-w-[220px]">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="uid">
      <slot />
    </label>
    <!-- Input -->
    <input
      :id="uid"
      ref="input"
      hidden
      type="file"
      v-bind="$attrs"
      :multiple="multiple"
      v-on="$listeners"
      @change="onChange"
    />
    <!-- Appearance -->
    <div
      class="
        flex
        justify-between
        gap-4
        px-2
        py-1
        border border-solid
        bg-gray-300
        rounded-md
        border-gray-300
        focus:border-2 focus:border-indigo-500
        focus:ring-indigo-500
      "
      :class="{
        'border-red-300': hasError,
      }"
      tabindex="0"
      @focus="$checkType('Object', error) && error.$reset()"
      @click="$checkType('Object', error) && error.$reset()"
      @blur="$checkType('Object', error) && error.$touch()"
    >
      <div class="px-2 text-lg font-semibold text-white rounded">
        {{ numberOfFiles }}
        {{ numberOfFiles === 1 ? 'file' : 'files' }}
      </div>

      <div class="flex gap-3">
        <Buttons
          v-if="multiple || !numberOfFiles"
          color="green"
          size="xs"
          @click="$refs.input.click()"
        >
          <IconsPlus class="size-lg" />
        </Buttons>

        <Buttons v-if="numberOfFiles" color="red" size="xs" @click="reset">
          <IconsTrash class="size-lg" />
        </Buttons>
      </div>
    </div>
    <!-- Description -->
    <p
      class="mt-1 text-sm"
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
import { typeCheck } from 'type-check'
import createFileList from 'create-file-list'

export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    model: {
      validator(val) {
        return typeCheck('Array|File', val)
      },
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      uid: undefined,
    }
  },
  computed: {
    fileOrFiles: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('model', val)
      },
    },
    numberOfFiles() {
      let numberOfFiles = 0
      if (this.$checkType('Array', this.fileOrFiles)) {
        numberOfFiles = this.fileOrFiles.length
      } else if (this.$checkType('File', this.fileOrFiles)) {
        numberOfFiles = 1
      }
      return numberOfFiles
    },
    hasError() {
      if (this.$checkType('Boolean', this.error)) return this.error
      return this.error.$error
    },
  },
  created() {
    if (!this.fileOrFiles[0]) {
      this.$emit('model', this.multiple ? [] : undefined)
    }
  },
  mounted() {
    this.uid = this._uid
  },
  methods: {
    createFileList,
    onChange() {
      if (!this.multiple) {
        this.$emit('model', this.$refs.input.files[0])
      } else {
        this.$refs.input.files.forEach((file) => {
          this.fileOrFiles.push(file)
        })
      }
    },
    reset() {
      this.fileOrFiles = this.multiple ? [] : undefined
      this.$refs.input.files = createFileList()
    },
  },
}
</script>
