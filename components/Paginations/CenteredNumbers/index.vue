<template>
  <nav
    class="
      border-t border-gray-200
      px-4
      flex
      items-center
      justify-between
      sm:px-0
    "
  >
    <!-- Previous page -->
    <div class="-mt-px w-0 flex-1 flex">
      <PaginationsCenteredNumbersPreviousPage
        v-if="previousPage"
        @click="changePage(previousPage)"
      />
    </div>

    <div class="hidden md:-mt-px md:flex">
      <!-- First page -->
      <PaginationsCenteredNumbersPage
        :highlighted="model === 1"
        @click="changePage(1)"
      >
        1
      </PaginationsCenteredNumbersPage>

      <!-- ... -->
      <PaginationsCenteredNumbersTripleDot v-if="pages[0] > 2" />

      <!-- Pages -->
      <PaginationsCenteredNumbersPage
        v-for="(page, i) in pages"
        :key="i"
        :highlighted="page === model"
        @click="changePage(page)"
      >
        {{ page }}
      </PaginationsCenteredNumbersPage>

      <!-- ... -->
      <PaginationsCenteredNumbersTripleDot
        v-if="pages.slice(-1)[0] < lastPage - 1"
      />

      <!-- Last page -->
      <PaginationsCenteredNumbersPage
        v-if="lastPage > 1"
        :highlighted="lastPage === model"
        @click="changePage(lastPage)"
      >
        {{ lastPage }}
      </PaginationsCenteredNumbersPage>
    </div>

    <!-- Next page -->
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <PaginationsCenteredNumbersNextPage
        v-if="nextPage"
        @click="changePage(nextPage)"
      />
    </div>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'model',
  },
  props: {
    // last page number
    lastPage: {
      type: Number,
      required: true,
      default: 5000,
    },
    // current page up-to-date with parent scope
    model: {
      type: Number,
      required: true,
      default: 300,
    },
    // Determine page quantity in per end
    quantityPerEnd: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      pages: [],
      previousPage: undefined,
      nextPage: undefined,
    }
  },
  watch: {
    model() {
      this.generatePage()
    },
  },
  created() {
    this.generatePage()
  },
  methods: {
    generatePage() {
      this.pages = []

      let minPage = this.model - this.quantityPerEnd
      while (minPage <= 1) {
        minPage++
      }

      let maxPage = minPage + 2 * this.quantityPerEnd
      while (maxPage >= this.lastPage) {
        maxPage--
        if (minPage - 1 > 1) {
          minPage--
        }
      }

      // Cases special
      if (minPage === 2 && maxPage < this.lastPage - 1) {
        maxPage++
      }
      if (minPage === 3) {
        minPage--
      }
      if (maxPage === this.lastPage - 1 && minPage > 2) {
        minPage--
      }
      if (maxPage === this.lastPage - 2) {
        maxPage++
      }

      for (let page = minPage; page <= maxPage; page++) {
        this.pages.push(page)
      }

      this.nextPage = this.model < this.lastPage ? this.model + 1 : null
      this.previousPage = this.model > 1 ? this.model - 1 : null
    },
    changePage(pageNumber) {
      this.$emit('model', pageNumber)
    },
  },
}
</script>
