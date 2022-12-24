<template>
  <div></div>
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
      transactionPerPage: 20,
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
      return this.transactionPerPage * this.currentPage
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
          take: this.transactionPerPage,
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
