<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col.m6.offset-m3.s12">
        <div class="row">
          <div class="col s12 align-center center-align">
            <h2>
              {{ config.name }} 🚗💨
            </h2>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as firebase from './db/firebase'

export default {
  name: 'app',
  firebase: {
    config: {
      source: firebase.dbConfigRef,
      asObject: true
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  select {
    display: block;
  }
}

</style>
