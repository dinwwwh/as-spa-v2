<template>
  <Groups v-on="$listeners">
    <div class="flex gap-1">
      <HeadingsBase4 class="flex-1">
        {{ validatorable.validator.name }}
      </HeadingsBase4>

      <Badges v-if="validatorable.order !== null">
        {{ validatorable.order }}
      </Badges>
      <Badges v-else> Ưu tiên </Badges>
    </div>
    <p class="text-gray-500 text-sm">
      {{ validatorable.validator.description }}
    </p>
  </Groups>
</template>

<script>
export default {
  props: {
    validatorable: {
      type: Object,
      required: true,
      validator(validatorable) {
        return validatorable.validator
      },
    },
  },
}
</script>
