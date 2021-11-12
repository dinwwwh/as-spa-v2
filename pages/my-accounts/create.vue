<template>
  <div class="space-y-6">
    <StepsBullets
      :current-step="currentStep"
      :last-step="2"
      @moved="moveTo($event)"
    />

    <!-- Step 1: select account type -->
    <div v-if="currentStep === 1" class="space-y-4">
      <HeadingsBase3> Chọn kiểu tài khoản </HeadingsBase3>
      <div class="flex items-center justify-end">
        <InputsSearch
          v-model="params._search"
          class="md:min-w-[260px]"
          :loading="isSearching"
          @model="onSearchChange"
        />
      </div>

      <AccountTypesSelects
        v-if="accountTypes.length > 0"
        v-model="selectedAccountType"
        :account-types="accountTypes"
      />

      <div v-else class="text-center tracking-wider text-gray-500">
        Có vẻ như bạn không có quyên sử dụng bất cứ loại tài khoản nào.
      </div>

      <PaginationsCenteredNumbers
        v-if="meta.lastPage > 1"
        v-model="meta.currentPage"
        :last-page="meta.lastPage"
        @model="onPageChange"
      />
    </div>

    <!-- Step 2: supply account infos -->
    <AccountsCreate
      v-if="currentStep === 2 && selectedAccountType.id"
      :account-type-id="parseInt(selectedAccountType.id)"
    >
      <template #actions>
        <Buttons color="yellow" @click="backStep"> Quai lại </Buttons>
      </template>
    </AccountsCreate>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3">
      <Buttons v-if="currentStep > 1" color="yellow" @click="backStep">
        Quai lại
      </Buttons>

      <Buttons v-if="currentStep < 2" color="green" @click="nextStep">
        Tiếp túc
      </Buttons>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  layout: 'primary',
  middleware: ['auth'],
  async asyncData({ $axios }) {
    const params = {
      _perPage: 12,
      _relationships: ['tags'],
    }

    const { data: accountTypes, meta } = await $axios.$get(
      'account-types/usable',
      {
        params,
      }
    )

    return {
      accountTypes,
      params,
      meta,
      isSearching: false,
      selectedAccountType: undefined,
      currentStep: 1,
    }
  },
  validations() {
    const { required } = this.$vuelidate.rules

    return {
      selectedAccountType: {
        required,
      },
      step1: ['selectedAccountType'],
    }
  },
  head() {
    return {
      title: 'Đăng tài khoản lên shop',
    }
  },
  methods: {
    onSearchChange: debounce(async function () {
      this.isSearching = true
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types/usable',
        {
          params: this.params,
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
      this.isSearching = false
    }, 500),
    onPageChange: debounce(async function (page) {
      const { data: accountTypes, meta } = await this.$axios.$get(
        'account-types/usable',
        {
          params: {
            ...this.params,
            page,
          },
        }
      )

      this.accountTypes = accountTypes
      this.meta = meta
    }, 500),
    nextStep() {
      if (this.currentStep === 1) {
        this.$v.step1.$touch()

        if (this.$v.step1.$invalid) {
          this.$notification.error('Vui lòng kiểm tra lại thông tin')
          return
        }
      }

      this.currentStep++
    },
    backStep() {
      this.currentStep--
    },
    moveTo(step) {
      const gap = step - this.currentStep

      for (let i = 1; i <= Math.abs(gap); i++) {
        if (gap > 0) {
          this.nextStep()
        } else {
          this.backStep()
        }
      }
    },
  },
}
</script>
