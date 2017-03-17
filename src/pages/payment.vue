<template>
  <div class="row">
    <paymentList :transactions="simplifiedTransactions"></paymentList>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import { getTransactionsFromRide, simplifyTransations } from '../utils'
import paymentList from '../components/payment-list'

export default {
  name: 'payment',
  components: {
    paymentList
  },
  computed: {
    transactions () {
      return getTransactionsFromRide(this.rides)
    },
    simplifiedTransactions () {
      return simplifyTransations(this.transactions)
    }
  },
  firebase: {
    drivers: {
      source: firebase.dbDriversRef
    },
    rides: {
      source: firebase.dbRidesRef
    }
  }
}
</script>

<style lang="scss">


</style>
