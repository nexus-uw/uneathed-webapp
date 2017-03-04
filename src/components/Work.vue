<template>
  <div class="hello">
    <h1>Issues</h1>
    <button v-on:click="loadIssues()">reload issues</button>
    <button v-on:click="doWork()">DO WORK</button>
    <div>{{message}}</div>
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
  import R from 'ramda';
  export default {
    name: 'work',
    data() {
      return {
        message: ''
      }
    },
    methods: {
      doWork() {
        this.message = null;
        const issueIdToDo = getIssueToDo(store.state.issues);
        if (issueIdToDo === 0 || issueIdToDo) {
          store.dispatch('doWork', issueIdToDo);
        } else {
          this.message = 'Not able to do any work. still waiting on parts';
        }
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

  function getIssueToDo(issues) {
    const jobsGroupedByPriority = R.groupBy(j => j.priority, issues);
    for (let p = 1; p <= 3; p++) {
      const priorityIndex = '' + p;
      if (!jobsGroupedByPriority[priorityIndex]) {
        continue;
      }
      const queue = R.sort((item) => (new Date(item.created_at) * -1), jobsGroupedByPriority[priorityIndex]);
      for (let i = 0; i < queue.length; i++) {
        const issue = queue[i];
        console.log('issue', issue.priority, issue.created_at)
        if (canPreformIssue(issue)) {
          return issue.id;
        }
      }
    }
  }

  function canPreformIssue(issue) {
    return issue.required_items.every(reqItem => reqItem.count === reqItem.item.available_count)
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
