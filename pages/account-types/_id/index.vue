<template>
  <div class="my-16 space-y-12">
    <div class="space-y-6">
      <HeadingsBase1>
        Kiểu tài khoản {{ accountType.name }}
        <span class="text-xl text-gray-500 italic">#{{ accountType.id }}</span>
      </HeadingsBase1>

      <div class="flex items-center gap-3">
        <Buttons color="yellow" @click="showUpdateScreen = !showUpdateScreen">
          Cập nhật
        </Buttons>
        <Buttons
          color="green"
          @click="showCreateAccountInfo = !showCreateAccountInfo"
        >
          Thêm thông tin tài khoản
        </Buttons>
      </div>
    </div>

    <div class="space-y-2">
      <HeadingsBase3> Các nhãn </HeadingsBase3>
      <div class="flex gap-2 flex-wrap">
        <Badges v-for="tag in accountType.tags" :key="tag.id">
          {{ tag.name }}
        </Badges>
      </div>
    </div>

    <div class="space-y-2">
      <HeadingsBase3> Các thông tin tài khoản </HeadingsBase3>
      <div class="flex gap-2 flex-wrap">
        <NuxtLink
          v-for="accountInfo in accountType.accountInfos"
          :key="accountInfo.id"
          :to="{ name: 'account-infos-id', params: { id: accountInfo.id } }"
        >
          <Badges>
            {{ accountInfo.name }}
          </Badges>
        </NuxtLink>
      </div>
    </div>

    <div class="space-y-2">
      <div class="flex justify-center">
        <HeadingsBase3 class="flex-1">
          Các bài xác thực khi tạo tài khoản
        </HeadingsBase3>

        <Buttons
          @click="
            isShowCreateCreatedValidatorable = !isShowCreateCreatedValidatorable
          "
        >
          Thêm mới
        </Buttons>
      </div>

      <ul class="flex flex-wrap gap-3">
        <li
          v-for="validatorable in createdValidatorables"
          :key="'validatorable' + validatorable.id"
        >
          <div class="relative rounded">
            <ValidatorableCard :validatorable="validatorable" />

            <div
              class="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                transition
                hover:opacity-100
              "
            >
              <Buttons color="red" @click="deleteValidatorable(validatorable)">
                <IconsTrash />
              </Buttons>
            </div>
          </div>
        </li>
      </ul>

      <p
        v-if="createdValidatorables.length === 0"
        class="text-center tracking-wider text-gray-500"
      >
        Danh sách trống
      </p>
    </div>

    <div class="space-y-2">
      <div class="flex justify-center">
        <HeadingsBase3 class="flex-1">
          Các bài xác thực khi cập nhật tài khoản
        </HeadingsBase3>

        <Buttons
          @click="
            isShowCreateUpdatedValidatorable = !isShowCreateUpdatedValidatorable
          "
        >
          Thêm mới
        </Buttons>
      </div>

      <ul class="flex flex-wrap gap-3">
        <li
          v-for="validatorable in updatedValidatorables"
          :key="'validatorable' + validatorable.id"
        >
          <div class="relative rounded">
            <ValidatorableCard :validatorable="validatorable" />

            <div
              class="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                transition
                hover:opacity-100
              "
            >
              <Buttons color="red" @click="deleteValidatorable(validatorable)">
                <IconsTrash />
              </Buttons>
            </div>
          </div>
        </li>
      </ul>

      <p
        v-if="updatedValidatorables.length === 0"
        class="text-center tracking-wider text-gray-500"
      >
        Danh sách trống
      </p>
    </div>

    <div class="space-y-2">
      <div class="flex justify-center">
        <HeadingsBase3 class="flex-1">
          Các bài xác thực khi mua tài khoản
        </HeadingsBase3>

        <Buttons
          @click="
            isShowCreateBoughtValidatorable = !isShowCreateBoughtValidatorable
          "
        >
          Thêm mới
        </Buttons>
      </div>

      <ul class="flex flex-wrap gap-3">
        <li
          v-for="validatorable in boughtValidatorables"
          :key="'validatorable' + validatorable.id"
        >
          <div class="relative rounded">
            <ValidatorableCard :validatorable="validatorable" />

            <div
              class="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                transition
                hover:opacity-100
              "
            >
              <Buttons color="red" @click="deleteValidatorable(validatorable)">
                <IconsTrash />
              </Buttons>
            </div>
          </div>
        </li>
      </ul>

      <p
        v-if="boughtValidatorables.length === 0"
        class="text-center tracking-wider text-gray-500"
      >
        Danh sách trống
      </p>
    </div>

    <Popups v-model="showUpdateScreen">
      <AccountTypesUpdate
        :account-type-id="accountType.id"
        class="!shadow-none"
      />
    </Popups>

    <Popups v-model="showCreateAccountInfo">
      <AccountInfosCreate
        :account-type="accountType"
        class="shadow-none"
        @created="accountType.accountInfos.push($event)"
      />
    </Popups>

    <Popups v-model="isShowCreateCreatedValidatorable">
      <AccountTypesCreateValidatorable
        class="!shadow-none"
        :type="$app.validatorable.CREATED_TYPE"
        :account-type-id="accountType.id"
      />
    </Popups>

    <Popups v-model="isShowCreateUpdatedValidatorable">
      <AccountTypesCreateValidatorable
        class="!shadow-none"
        :type="$app.validatorable.UPDATED_TYPE"
        :account-type-id="accountType.id"
      />
    </Popups>

    <Popups v-model="isShowCreateBoughtValidatorable">
      <AccountTypesCreateValidatorable
        class="!shadow-none"
        :type="$app.validatorable.BOUGHT_TYPE"
        :account-type-id="accountType.id"
      />
    </Popups>
  </div>
</template>

<script>
export default {
  layout: 'primary',
  async asyncData({ $axios, params }) {
    const { data: accountType } = await $axios.$get(
      `account-types/${params.id}`,
      {
        params: {
          _abilities: true,
          _relationships: [
            'tags',
            'users',
            'accountInfos',
            'validatorables.validator',
          ],
        },
      }
    )

    return {
      accountType,
      showUpdateScreen: false,
      showCreateAccountInfo: false,
      isShowCreateCreatedValidatorable: false,
      isShowCreateUpdatedValidatorable: false,
      isShowCreateBoughtValidatorable: false,
    }
  },
  head() {
    return {
      title: `Kiểu tài khoản #${this.accountType?.id}`,
    }
  },
  computed: {
    createdValidatorables() {
      return this.accountType.validatorables.filter(
        ({ type }) => type === this.$app.validatorable.CREATED_TYPE
      )
    },
    updatedValidatorables() {
      return this.accountType.validatorables.filter(
        ({ type }) => type === this.$app.validatorable.UPDATED_TYPE
      )
    },
    boughtValidatorables() {
      return this.accountType.validatorables.filter(
        ({ type }) => type === this.$app.validatorable.BOUGHT_TYPE
      )
    },
  },
  methods: {
    async deleteValidatorable(validatorable) {
      const { status } = await this.$axios.delete(
        `account-types/${this.accountType.id}/validatorables/${validatorable.id}`
      )

      if (status < 300) {
        this.$notification.success('Xoá thành công')
      }
    },
  },
}
</script>
