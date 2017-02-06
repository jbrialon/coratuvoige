<template>
  <div class="row">
    <div class="col m8 offset-m2 s12">

      <!-- form -->
      <div class="row">
        <div class="input-field col m6 s12">
          <label for="first_name">Driver: </label>
        </div>
        <div class="input-field col m6 s12">
          <select v-model="newRide.driver">
            <option v-for="driver in drivers" :value="driver.id" :disabled="driver.candrive === 0">{{ driver.name }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m2" v-for="driver in drivers">
          <input v-model="newRide.checkbox[driver.id]" type="checkbox" class="filled-in" :id="driver.name" :disabled="isDriving(driver.id)"/>
          <label :for="driver.name">{{ driver.name }}</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m6 s12">
          <input v-model="newRide.date" placeholder="date" id="first_name" type="date">
        </div>
        <div class="col m6 s12">
          <a class="btn-floating btn-large waves-effect waves-light red" @click="add()" :class="{'disabled': !canSubmit}">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>

      <!-- list -->
      <table class="striped responsive-table">
        <thead>
          <tr>
            <th data-field="driver">
              Driver
            </th>
            <th data-field="passengers">
              Passengers
            </th>
            <th data-field="date">
              Date
            </th>
            <th data-field="action">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ride in ridesOrdered" v-if="ride !== 'rides'">
            <td>
              {{ getDriverNamePerId(ride.driver) }}
            </td>
            <td>
              <router-link :to="{ name: 'driver', params: { id: passenger }}" v-for="passenger in ride.passengers"> {{ getDriverNamePerId(passenger) }} </router-link>
            </td>
            <td>
              {{ ride.date }}
            </td>
            <td>
              <a class="btn-floating"><i class="material-icons" @click="remove(ride['.key'])">remove</i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'home',
  data () {
    return {
      newRide: {
        driver: '',
        checkbox: {},
        date: ''
      }
    }
  },
  computed: {
    ridesOrdered () {
      return this.rides.sort((a, b) => b.date > a.date)
    },
    canSubmit () {
      return this.newRide.driver !== '' && !isEmpty(this.newRide.checkbox) && this.newRide.date !== ''
    }
  },
  methods: {
    add () {
      let newRide = {
        'driver': this.newRide.driver,
        'passengers': keys(this.newRide.checkbox),
        'date': this.newRide.date
      }
      if (this.canSubmit) {
        firebase.dbRidesRef.push(newRide)
      }
    },
    getDriverNamePerId (id) {
      return id !== undefined ? this.drivers[id].name : ''
    },
    remove (key) {
      let confirmation = window.confirm('Fais pas le con Philippe ! t\'es sûr ?')
      if (confirmation) {
        firebase.dbRidesRef.child(key).remove()
      }
    },
    isDriving (id) {
      return this.newRide.driver !== '' && this.newRide.driver === id
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
