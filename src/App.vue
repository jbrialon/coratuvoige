<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col.m6.offset-m3.s12">
        <div class="row">
          <div class="col s12 align-center center-align">
            <h2>
              <router-link :to="{ name: 'Home'}">{{ config.name }} 🚗💨</router-link>
            </h2>
          </div>
        </div>
      </div>
      <transition name="page" mode="out-in" @before-enter="beforeEnter">
        <router-view></router-view>
      </transition>
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
  },
  methods: {
    beforeEnter () {
      window.scrollTo(0, 0)
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

  h2 a {
    color:black;
  }

  select {
    display: block;
  }

  .page-enter-active, .page-leave-active {
    transition: transform 750ms ease, opacity 750ms ease;
  }
  .page-enter, .page-leave-to {
    opacity:0;
    transform:translateY(-25px);
  }
}

</style>
