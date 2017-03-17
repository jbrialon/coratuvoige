<template>
  <div class="ride-list">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      >
      <el-table-column
        prop="debtor"
        label="Debtor"
        >
      </el-table-column>
      <el-table-column
        prop="creditor"
        label="Creditor"
        >
      </el-table-column>
      <el-table-column
        prop="debt"
        label="Debt"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as firebase from '../../db/firebase'
import { getDriverNamePerId } from '../../utils'
export default {
  name: 'rideList',
  props: {
    transactions: {
      type: Array
    }
  },
  computed: {
    tableData () {
      return this.transactions.map((transaction) => {
        return {
          debtor: getDriverNamePerId(this.drivers, transaction[0]),
          creditor: getDriverNamePerId(this.drivers, transaction[1]),
          debt: transaction[2].toFixed(2)
        }
      })
    }
  },
  firebase: {
    drivers: {
      source: firebase.dbDriversRef
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
