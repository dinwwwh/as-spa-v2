<template>
  <div class="space-y-3">
    <MessagesSuccess v-if="message.success">
      {{ message.success }}
    </MessagesSuccess>

    <MessagesInfo v-if="message.info"> {{ message.info }} </MessagesInfo>

    <MessagesWarning v-if="message.warning">
      {{ message.warning }}
    </MessagesWarning>

    <MessagesError v-if="message.error">
      {{ message.error }}
    </MessagesError>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
