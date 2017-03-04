<template>
  <div id="app">
    <div>
      <img src="./assets/logoSnapFix.io.png">
    </div>
    <div>
      <router-link to="/work">Issues</router-link>
      <router-link to="/inventory">Inventory</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
