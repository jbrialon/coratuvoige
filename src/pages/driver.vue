<template>
  <div class="row">
    {{ getDriverNamePerId(id) }}
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
  methods: {
    getDriverNamePerId (id) {
      return this.drivers[id] !== undefined ? this.drivers[id].name : ''
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
