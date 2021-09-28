<template>
  <div>
    <Selects v-model="value" :options="[{v:1}, {v:2}, {v:3}]" value-key="v" display-key="v" :error="$v.value">
      XIn chao
    </Selects>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  data() {
    return {
      value: undefined,
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      value: {
        required,
      },
    }
  },
}
</script>
