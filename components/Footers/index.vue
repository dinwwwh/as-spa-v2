<template>
  <footer class="bg-white">
    <div
      class="
        max-w-7xl
        mx-auto
        py-10
        px-4
        sm:px-6
        md:flex md:items-center md:justify-between
        lg:px-8
      "
    >
      <!-- Connections -->
      <div class="flex justify-center space-x-6 md:order-2">
        <a
          :href="$app.findConfig('facebook_url')"
          class="text-gray-400 hover:text-indigo-500"
          target="_blank"
        >
          <span class="sr-only">Facebook</span>
          <IconsFacebook />
        </a>
      </div>

      <!-- Signature -->
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">
          &copy; 2021, Made by
          <a
            href="https://dinhdjj.com"
            class="text-indigo-500 tracking-wider"
            target="_blank"
          >
            @dinhdjj
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

