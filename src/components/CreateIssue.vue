<template>
  <div class="hello">
    <h1>Issue</h1>
    <div>
      <input v-model="issue.comment" type="text">
      <select v-model="issue.component_id">
        <option v-for="component_type in component_types" v-bind:value="component_type.id">{{component_type.name}}</option>
      </select>
      <select v-model="issue.id">
        <option v-for="issue_type in issue_types" v-bind:value="issue_type.id">{{issue_type.name}}</option>
      </select>
      <select v-model="issue.priority">
        <option v-bind:value="0">0</option>
        <option v-bind:value="1">1</option>
        <option v-bind:value="2">2</option>
        <option v-bind:value="3">3</option>
        <option v-bind:value="4">4</option>
        <option v-bind:value="5">5</option>
      </select>
      <button v-on:click="submitIssue()">Submit</button>
    </div>
  </div>
</template>

<script>
  import store from '../store';
  export default {
    name: 'create_issue',
    data() {
      return {
          issue: {
            id: 0,
            component_id: 0,
            comment: ""
          }
      }
    },
    mounted() {
      store.dispatch('load', 'ComponentTypes');
      store.dispatch('load', 'IssueTypes');
    },
    methods: {
      submitIssue() {
        store.dispatch('submitIssue', this.issue);
      }
    },
    computed: {
      issue_types() {
        return store.state.issue_types;
      },
      component_types() {
        return store.state.component_types;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ul {}
</style>
