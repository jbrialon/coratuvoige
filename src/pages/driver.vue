<template>
  <div class="row">
    {{ driverName }} {{ this.id}}

    <pre> {{ ridesAsDriver }} </pre>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'

export default {
  name: 'driver',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    driverName () {
      return this.drivers[this.id] !== undefined ? this.drivers[this.id].name : ''
    },
    ridesAsDriver () {
      return this.rides.map((ride) => {
        if (ride.driver === this.id) {
          return ride
        }
      })
    },
    ridesAsPassengers () {
      return this.rides.map((ride) => {
        if (ride.passengers.includes(this.id)) {
          return ride
        }
      })
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
