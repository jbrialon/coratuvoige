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
          <input v-model="newRide.checkbox" type="checkbox" class="filled-in" :id="driver.name" :disabled="isDriving(driver.id)" :value="driver.id"/>
          <label :for="driver.name">{{ driver.name }}</label>
        </div>
      </div>
      <div class="row row--datepicker">
        <div class="input-field col m8 s12">
          <el-date-picker
            size="large"
            v-model="newRide.date"
            type="date"
            format="yyyy-MM-dd"
            placeholder="date"
            id="first_name">
          </el-date-picker>
        </div>
        <div class="col m4 s12">
          <a class="btn-floating btn-large waves-effect waves-light red" @click="add()" :class="{'disabled': !canSubmit}">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>
      <rideList :drivers="drivers" :rides="rides" @remove="remove"></rideList>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'

import rideList from '../components/ride-list'

export default {
  name: 'home',
  components: {
    rideList
  },
  data () {
    return {
      newRide: {
        driver: '',
        checkbox: [],
        date: new Date()
      }
    }
  },
  computed: {
    canSubmit () {
      const isDriver = this.newRide.driver !== ''
      const isCheckbox = this.newRide.checkbox.length > 0
      const isDate = this.newRide.date

      return isDriver && isCheckbox && isDate
    }
  },
  methods: {
    add () {
      let newRide = {
        'driver': this.newRide.driver,
        'passengers': this.newRide.checkbox,
        'date': this.newRide.date.toString()
      }
      if (this.canSubmit) {
        firebase.dbRidesRef.push(newRide)
      }
    },
    getDriverNamePerId (id) {
      return id !== undefined ? this.drivers[id].name : ''
    },
    remove (key) {
      this.$confirm('Fais pas le con Philippe ! t\'es sûr ?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        firebase.dbRidesRef.child(key).remove()
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    isDriving (id) {
      return this.newRide.driver !== '' && this.newRide.driver === id
    }
  },
  watch: {
    'newRide.driver': function (driverId) {
      const index = this.newRide.checkbox.indexOf(driverId)

      if (index > -1) {
        this.newRide.checkbox.splice(driverId, 1)
      }
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

<style lang="scss" scoped>

.row--datepicker {
  margin-top: 3em;
  margin-bottom: 3em;
}

.el-date-editor.el-input {
  width: 100%;
}

</style>

<style lang="scss">

.el-date-editor.el-input {
  input {
    box-sizing: border-box;
    margin-bottom: 0;
  }
}

</style>
