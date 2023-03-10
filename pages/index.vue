<template>
  <div>
    <!-- Heading -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl text-center font-semibold text-gray-900">
          Transactions
        </h1>
      </div>
    </div>
    <!-- Filters -->
    <div class="px-4 sm:px-6 lg:px-8 flex justify-end gap-2">
      <!-- Bank Filter -->
      <div class="flex flex-col">
        <label class="block text-sm font-medium text-gray-700">Banks</label>
        <select
          v-model="selectedBank"
          name="bank"
          class="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            py-2
            pl-3
            pr-10
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500
            sm:text-sm
            text-xs
            md:text-base
          "
          @change="currentPage = 0"
        >
          <option :value="undefined">No Filter</option>
          <option v-for="bank in banks" :key="bank.bank" :value="bank.bank">
            {{ bank.bank }}
          </option>
        </select>
      </div>
      <!-- Account Filter -->
      <div class="flex flex-col">
        <label class="block text-sm font-medium text-gray-700">Accounts</label>
        <select
          v-model="selectedAccount"
          name="account"
          class="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            py-2
            pl-3
            pr-10
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500
            sm:text-sm
            text-xs
            md:text-base
          "
          @change="currentPage = 0"
        >
          <option :value="undefined">No Filter</option>
          <option
            v-for="account in accounts"
            :key="account.name"
            :value="account.name"
          >
            {{ account.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- Transaction Table -->
    <TransactionTable
      class="mt-2"
      :transactions="transactions"
      :ascendent-order="Boolean(ascendentOrder)"
      @changeOrder="changeOrder"
    />
    <!-- Pagination Buttons -->
    <nav class="flex items-center justify-between bg-white py-3 px-6 lg:px-8">
      <div class="flex flex-1 justify-between items-center sm:justify-end">
        <button
          class="
            relative
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          :disabled="currentPage == 0"
          @click="toPreviousPage"
        >
          Previous
        </button>
        <p class="font-medium mx-auto">{{ currentPage }}</p>
        <button
          class="
            relative
            ml-3
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          :disabled="transactions && transactions.length < transactionsPerPage"
          @click="toNextPage"
        >
          Next
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import getBanks from '@/apollo/queries/getBanks'
import getAccounts from '@/apollo/queries/getAccounts'
import getTransactions from '@/apollo/queries/getTransactions'
import TransactionTable from '@/components/TransactionTable.vue'

export default {
  name: 'IndexPage',
  components: { TransactionTable },
  data() {
    return {
      currentPage: 0,
      transactionsPerPage: 15,
      ascendentOrder: undefined,
      selectedBank: undefined,
      selectedAccount: undefined,
    }
  },
  head() {
    return { title: 'Transactions' }
  },
  computed: {
    skipCount() {
      return this.transactionsPerPage * this.currentPage
    },
  },
  methods: {
    changeOrder() {
      this.ascendentOrder = !this.ascendentOrder
      this.currentPage = 0
    },
    toNextPage() {
      this.currentPage++
    },
    toPreviousPage() {
      if (this.currentPage > 0) this.currentPage++
    },
  },
  apollo: {
    transactions: {
      query: getTransactions,
      variables() {
        return {
          skip: this.skipCount,
          take: this.transactionsPerPage,
          ascOrder: this.ascendentOrder,
          selectedBank: this.selectedBank,
          selectedAccount: this.selectedAccount,
        }
      },
      prefetch: true,
    },
    banks: {
      query: getBanks,
      prefetch: true,
    },
    accounts: {
      query: getAccounts,
      prefetch: true,
    },
  },
}
</script>
