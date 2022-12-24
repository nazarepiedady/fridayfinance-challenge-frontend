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
}
</script>
