<template>
  <div class="hello">
    <h1>Issues</h1>
    <button v-on:click="doWork()" v-bind:disabled="!anyWork">DO WORK</button>
    <div style="color:red">{{message}}</div>
    <div class="row ">
      <div class="col">
        <h2 class="title-bar"> priority 1</h2>
        <div v-for="issue in priorityOne">

        </div>
      </div>
      <div class="col">
        <h2 class="title-bar"> priority 2</h2>
        <div v-for="issue in priorityTwo">
          {{issue.issue_type.name}}
        </div>
      </div>
      <div class="col">
        <h2 class="title-bar"> priority 3</h2>
        <div v-for="issue in priorityThree">
          {{issue.issue_type.name}}
        </div>
      </div>
    </div>
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
    mounted() {
      store.dispatch('load', 'Issues')
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
      anyWork() {
        return store.state.issues.length > 0;
      }
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
        if (canPreformIssue(issue)) {
          return issue.id;
        }
      }
    }
  }

  function canPreformIssue(issue) {
    return issue.required_items.every(reqItem => reqItem.count <= reqItem.item.available_count)
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    display: flex;
  }
  
  .col {
    width: 33%
  }
</style>
