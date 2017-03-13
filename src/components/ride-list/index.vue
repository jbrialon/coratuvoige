<template>
  <div class="ride-list">
    <el-table
      :data="tableData"
      stripe
      :default-sort = "{ prop: 'date', order: 'descending' }"
      style="width: 100%"
      >
      <el-table-column
        prop="date"
        label="Date"
        width="150"
        sortable
        :filters="filterDates"
        :filter-method="filterDate"
        :filter-multiple="false"
        >
      </el-table-column>
      <el-table-column
        prop="driver"
        label="Driver"
        :filters="filterDrivers"
        :filter-method="filterDriver"
        :filter-multiple="false"
        >
        <template scope="scope">
          {{ scope.row.driver.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="passengers"
        label="Passengers">
        <template scope="scope">
          <router-link :to="{ name: 'driver', params: { id: passenger.id }}" v-for="passenger in scope.row.passengers">{{ passenger.name }}&nbsp;</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Action"
        width="100">
        <template scope="scope">
          <button class="btn btn-floating"><i class="el-icon-delete" @click="remove(scope.row.key)"></i></button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import getMonth from 'date-fns/get_month'

export default {
  name: 'rideList',
  props: {
    drivers: {
      type: Array
    },
    rides: {
      type: Array
    }
  },
  computed: {
    tableData () {
      return this.rides.map((ride) => {
        const passengers = ride.passengers.map(passenger => {
          return {
            id: passenger,
            name: this.getDriverNamePerId(passenger)
          }
        })
        const driver = {
          id: ride.driver,
          name: this.getDriverNamePerId(ride.driver),
          candrive: ride.driver.candrive
        }
        return {
          key: ride['.key'],
          date: format(ride.date, 'YYYY-MM-DD'),
          passengers: passengers,
          driver: driver
        }
      })
    },
    /**
     * Creates a new filter array that contains months of the current year
     * TODO year should be dynamic
     */
    filterDates () {
      const months = [...Array(12).keys()]
      return months.map((i) => {
        const date = new Date(2017, i, 1)
        return {
          text: format(date, 'MMMM YYYY'),
          value: date
        }
      })
    },
    /**
     * Creates a new filter array that contains drivers
     * TODO year should be dynamic
     */
    filterDrivers () {
      return this.drivers
      .filter((driver) => driver.candrive)
      .map((driver) => {
        return {
          text: driver.name,
          value: driver.id
        }
      })
    }
  },
  methods: {
    filterDate (value, row) {
      return getMonth(parse(row.date)) === getMonth(parse(value))
    },
    filterDriver (value, row) {
      return value === row.driver.id
    },
    getDriverNamePerId (id) {
      return id !== undefined ? this.drivers[id].name : ''
    },
    remove (key) {
      this.$emit('remove', key)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
