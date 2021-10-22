<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">
      <slot />
    </label>

    <div class="flex items-start gap-3 bg-white rounded p-2 shadow">
      <ul v-if="validators && validators.length > 0" class="flex-1">
        <Draggable
          v-model="validators"
          class="flex items-center flex-wrap gap-3"
        >
          <li
            v-for="(validator, i) in validators"
            :key="'list' + validator.id + i"
          >
            <div class="relative rounded">
              <ValidatorsCard :validator="validator" />

              <div
                class="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-gray-700 bg-opacity-25
                  opacity-0
                  transition
                  hover:opacity-100
                "
              >
                <Buttons color="red" @click="remove(validator)">
                  <IconsTrash />
                </Buttons>
              </div>
            </div>
          </li>
        </Draggable>
      </ul>

      <span v-else class="flex-1 text-gray-500 tracking-wider text-center">
        Danh sách trống
      </span>

      <Buttons color="green" @click="showAddScreen">
        <IconsPlus />
      </Buttons>
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

    <!-- Screens -->
    <div>
      <Popups ref="screenShow" v-model="isShowAdd">
        <ValidatorsAddForAccountType
          :account-type-id="accountTypeId"
          class="lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          @add="
            validators.push($event)
            isShowAdd = false
          "
        />
      </Popups>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: { Draggable },
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
    error: {
      type: [Boolean, Object],
      default: false,
    },
    accountTypeId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      currentStep: 1,
      isShowAdd: false,
    }
  },
  computed: {
    hasError() {
      if (this.$checkType('Boolean', this.error)) return this.error
      return this.error.$error
    },
    validators: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('model', val)
      },
    },
  },
  methods: {
    remove(validator) {
      this.validators = this.validators.filter(({ id }) => validator.id !== id)
    },
    showAddScreen(element) {
      this.isShowAdd = !this.isShowAdd
    },
  },
}
</script>
