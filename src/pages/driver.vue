<template>
  <div class="driver row">
    <p><router-link :to="{ path: '/' }">Back to home</router-link></p>

    <h2>{{ driverName }}</h2>

    <div class="driver__rides" v-for="ridesInMonth in ridesByMonths">
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
      let data = []
      let index = 0
      let previousDate = null

      for (let ride of this.rides) {
        const date = moment(ride.date)

        // Search if the we entered in a new month
        if (previousDate !== null && date.format('M') !== previousDate.format('M')) {
          index++
        }

        // If it's a new month or the first iteration, insert the template into
        // the array
        if (data.length <= index) {
          data.push({
            'date': capitalize(date.format('MMMM YYYY')),
            'driver': [],
            'passenger': []
          })
        }

        if (ride.driver === this.id) {
          data[index]['driver'].unshift(ride)
        } else if (ride.passengers.includes(String(this.id))) {
          data[index]['passenger'].unshift(ride)
        }

        // Assign the current date as the previous date for the comparison
        // in the next iteration
        previousDate = date
      }

      // Reverse the array to order it by newest dates and return only months
      // where the user has been driver or passenger at least once
      return data.reverse().filter((ridesByMonth) => {
        return ridesByMonth.driver.length > 0 || ridesByMonth.passenger.length > 0
      })
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
.driver {
  &__rides {
    margin-bottom: 30px;
  }
}
</style>
