<template>
  <div class="space-y-1">
    <!-- Label for select tag -->
    <label
      class="block text-sm font-medium text-gray-700"
      @click="clickedLabel"
    >
      <slot />
    </label>

    <!-- Select tag -->
    <div class="relative" @click="isShowOptions = !isShowOptions">
      <!-- Current display value -->
      <button
        ref="button"
        type="button"
        class="
          bg-white
          relative
          w-full
          border
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          sm:text-sm
        "
        :class="{
          'border-red-300 focus:border-red-500 focus:ring-red-500': hasError,
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500':
            !hasError,
        }"
      >
        <!-- Current display value -->
        <span
          class="block truncate"
          :class="{ 'text-gray-400': !selectedOption }"
        >
          {{
            getDisplace(selectedOption) ||
            $attrs.placeholder ||
            'Vui lòng chọn một'
          }}
        </span>

        <!-- Icon extend -->
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <IconsSelector class="h-5" />
        </span>
      </button>

      <!-- Item list -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          v-show="isShowOptions"
          class="
            absolute
            mt-1
            min-w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
            z-10
          "
          tabindex="-1"
          role="listbox"
        >
          <li
            v-for="(option, i) of options"
            :key="i"
            class="
              text-gray-900
              cursor-pointer
              select-none
              relative
              py-2
              pl-3
              pr-9
              group
              hover:text-white
              hover:bg-indigo-600
            "
            role="option"
            @click="updateModel(option)"
          >
            <!-- show display value of item -->
            <span
              class="block truncate"
              :class="{
                'font-semibold': isSelectedOption(option),
                'font-normal': !isSelectedOption(option),
              }"
            >
              {{ getDisplace(option) }}
            </span>

            <!-- Icon check show when selected -->
            <span
              v-show="isSelectedOption(option)"
              class="
                text-indigo-600
                absolute
                inset-y-0
                right-0
                flex
                items-center
                pr-4
                group-hover:text-white
              "
            >
              <IconsCheck class="h-5" />
            </span>
          </li>
        </ul>
      </transition>
    </div>

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
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    // Current value transfer by v-model
    model: {
      type: null,
      required: true,
    },
    // Contain entire option to show in sellect
    options: {
      type: Array,
      required: true,
    },
    // Determine value key in option to return it's value for scope parent
    valueKey: {
      type: String,
      default: undefined,
    },
    // Determine display key in option to show it's value for user interface
    displayKey: {
      type: String,
      default: undefined,
    },
    // Determine whether this tag have hasError
    error: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      isShowOptions: false,
    }
  },
  computed: {
    hasError() {
      if (this.$checkType('Boolean', this.error)) return this.error
      return this.error.$error
    },
    selectedOption() {
      return this.options.find((o) => {
        if (this.valueKey) {
          return o[this.valueKey] === this.model
        } else {
          return o === this.model
        }
      })
    },
  },
  watch: {
    isShowOptions(val) {
      if (this.$checkType('Object', this.error)) {
        val && this.error.$reset()
        !val && this.error.$touch()
      }
    },
  },
  methods: {
    updateModel(option) {
      const val = this.getValue(option)
      if (val === this.model) {
        this.$emit('model', undefined)
        return
      }
      this.$emit('model', val)
    },
    clickedLabel() {
      this.$refs.button.focus()
      this.isShowOptions = true
    },
    getDisplace(option) {
      if (!option) return
      if (this.displayKey) return option[this.displayKey]
      return option
    },
    getValue(option) {
      if (!option) return
      if (this.valueKey) return option[this.valueKey]
      return option
    },
    isSelectedOption(option) {
      if (!option) return false
      return this.getValue(option) === this.model
    },
  },
}
</script>
