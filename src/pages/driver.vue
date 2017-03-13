<template>
  <div class="row">
    <p><router-link :to="{ path: '/' }">Back to home</router-link></p>

    <h2>{{ driverName }}</h2>

    <div v-for="ridesInMonth in ridesByMonths">
      <h5>{{ ridesInMonth.date }}</h5>

      <div v-if="ridesInMonth.driver.length">
        <p><strong>As Driver</strong></p>
        <p v-for="ride in ridesInMonth.driver">
          <strong>{{ ride.date }}</strong> with
          <router-link :to="{ name: 'driver', params: { id: passenger }}" v-for="passenger in ride.passengers"> {{ getDriverNamePerId(passenger) }} </router-link>
        </p>
      </div>

      <div v-if="ridesInMonth.passenger.length">
        <p><strong>As Passenger</strong></p>
        <p v-for="ride in ridesInMonth.passenger">
          <strong>{{ ride.date }}</strong> with
          <router-link :to="{ name: 'driver', params: { id: passenger }}" v-for="passenger in ride.passengers"> {{ getDriverNamePerId(passenger) }} </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import moment from 'moment'
import capitalize from 'lodash/capitalize'

export default {
  name: 'driver',
  data () {
    return {
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    driverName () {
      return this.getDriverNamePerId(this.id)
    },
    ridesByMonths () {
      let data = {}

      for (let ride of this.rides) {
        const date = moment(ride.date)
        const dateKey = date.format('YYYY-MM')

        if (data[dateKey] === undefined) {
          data[dateKey] = {
            'date': capitalize(date.format('MMMM YYYY')),
            'driver': [],
            'passenger': []
          }
        }

        if (ride.driver === this.id) {
          data[dateKey]['driver'].unshift(ride)
        } else if (ride.passengers.includes(String(this.id))) {
          data[dateKey]['passenger'].unshift(ride)
        }
      }

      return data
    }
  },
  methods: {
    getDriverNamePerId (driverId) {
      return this.drivers[driverId] !== undefined ? this.drivers[driverId].name : ''
    }
  },
  watch: {
    '$route': function (route) {
      this.id = parseInt(route.params.id)
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
