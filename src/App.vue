<template>
  <div id="app">
    <div>
      <img src="./assets/logoSnapFix.io.png">
    </div>
    <div>
      <router-link to="/create_issue">Create Issue</router-link> |
      <router-link to="/work">Issues</router-link> |
      <router-link to="/inventory">Inventory</router-link> |
      <router-link to="/status">Status</router-link>
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
  
  h1,
  h2 {
    font-weight: normal;
    text-transform: capitalize;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  .row {
    display: flex;
    margin-bottom: 1em;
  }
  
  .title-bar {
    border-bottom-color: lightgrey;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
  
  .col {
    width: 33%
  }
  
  a {
    color: #42b983;
  }
  /*button {
    border: 3px solid #fff;
    color: #fff;
  }
  */
  
  button {
    padding: 5px 30px;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  .b-border {
    padding-bottom: 1em;
    border-bottom-color: lightgrey;
    border-bottom-style: solid;
    border-bottom-width: thin;
  }
</style>
