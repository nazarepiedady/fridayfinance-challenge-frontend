<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="
              overflow-hidden
              shadow
              ring-1 ring-black ring-opacity-5
              md:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      py-3.5
                      pl-4
                      pr-3
                      text-left text-sm
                      font-semibold
                      text-gray-900
                      sm:pl-6
                    "
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-2.5
                      text-left text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-2.5
                      text-center text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    <div class="group inline-flex items-center">
                      Date
                      <span
                        class="ml-1 mt-2 cursor-pointer"
                        @click="$emit('changeOrder')"
                      >
                        <client-only>
                          <unicon
                            :name="ascedentOrder ? 'angle-up' : 'angle-down'"
                          ></unicon>
                        </client-only>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-2.5
                      text-right text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="transactions.length > 0"
                class="divide-y divide-gray-300 bg-white"
              >
                <tr
                  v-for="transaction in transactions"
                  :key="transaction.id"
                  role="button"
                  @click="routeToTransactionDetails(transaction.id)"
                >
                  <td
                    v-if="transaction.reference"
                    class="
                      whitespace-nowrap
                      py-1.5
                      pl-4
                      pr-3
                      text-sm
                      font-medium
                      text-gray-900
                      sm:pl-6
                    "
                  >
                    {{ transaction.reference }}
                  </td>

                  <td
                    v-else
                    class="
                      whitespace-nowrap
                      py-1.5
                      pl-4
                      pr-3
                      text-sm
                      font-light
                      text-gray-400
                      sm:pl-6
                    "
                  >
                    No Reference Provided
                  </td>
                  <td
                    class="
                      whitespace-nowrap
                      px-3
                      py-4
                      text-sm text-black
                      font-bold
                    "
                  >
                    <CategoryBadge
                      v-if="transaction.category"
                      :category="transaction.category"
                    />
                    <p v-else class="text-gray-300">No Category Assigned</p>
                  </td>
                  <td
                    class="
                      whitespace-nowrap
                      px-3
                      py-1.5
                      text-sm text-gray-600 text-center
                    "
                  >
                    {{ $makeDateLegible(transaction.date) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-1.5 text-sm text-right">
                    <span
                      :class="{
                        'text-red-600': isNegativeNumber(transaction.amount),
                        'text-green-600': !isNegativeNumber(transaction.amount),
                      }"
                      >{{ transaction.amount }}</span
                    >
                    <span class="text-gray-400 text-right">
                      {{ transaction.currency }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <td colspan="4">
                  <p class="text-center my-4 text-2xl text-gray-500">
                    No Transactions
                  </p>
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBadge from '@/components/CategoryBadge'

export default {
  name: 'TransactionTable',
  components: { CategoryBadge },
  props: {
    transactions: { type: Array, default: () => [] },
    ascedentOrder: Boolean,
  },
  emits: ['changeOrder'],
  methods: {
    routeToTransactionDetails(id) {
      this.$router.push(`transactions/${id}`)
    },
    isNegativeNumber(string) {
      const number = Number(string)
      return number < 0
    },
  },
}
</script>
