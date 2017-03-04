<template>
  <div class="hello">
    <h1>Issues</h1>
    <button v-on:click="loadIssues()">reload issues</button>
    <button v-on:click="doWork()">DO WORK</button>
    <h2> priority 1</h2>
    <ul>
      <li v-for="issue in priorityOne">{{issue}}</li>
    </ul>
    <h2> priority 2</h2>
    <ul>
      <li v-for="issue in priorityTwo">{{issue}}</li>
    </ul>
    <h2> priority 3</h2>
    <ul>
      <li v-for="issue in priorityThree">{{issue}}</li>
    </ul>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    name: 'work',
    data() {
      return {
      }
    },
    methods: {
      doWork() {
        const jobId = 1; // TODO calc this value
        store.dispatch('doWork', jobId)
      },
      loadIssues() {
        store.dispatch('load', 'Issues')
      }
    },
    computed: {
      priorityOne() {
        return store.state.issues.filter(i => i.priority === 1);
      },
      priorityTwo() {
        return store.state.issues.filter(i => i.priority === 2);
      },
      priorityThree() {
        return store.state.issues.filter(i => i.priority === 3);
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
