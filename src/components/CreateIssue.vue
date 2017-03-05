<template>
  <div class="hello">
    <h1>Issue</h1>
    <div>
      <input v-model="issue.comment" type="text">
      <select v-model="issue.equipment">
        <option v-for="equipmentPiece in equipment" v-bind:value="equipmentPiece">{{equipmentPiece.name}}</option>
      </select>
      <select v-model="issue.component" v-if="issue.equipment != null">
        <option v-for="component in components" v-bind:value="component">{{component.name}}</option>
      </select>
      <select v-model="issue.issue_type_id" v-if="issue.component != null">
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
      <div v-if="issueHasError">
        Please Fill In Missing Fields
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store';
  export default {
    name: 'create_issue',
    data() {
      return {
        issueHasError: false,
        issue: {
          issue_type_id: null,
          component: null,
          equipment: null,
          priority: 3,
          comment: ""
        }
      }
    },
    mounted() {
      store.dispatch('load', 'Components');
      store.dispatch('load', 'IssueTypes');
    },
    methods: {
      submitIssue() {
        if(this.issue.issue_type_id != null && this.issue.component != null){
          this.issue.component_id = this.issue.component.id;
          store.dispatch('submitIssue', this.issue);
        }
        else{
          this.issueHasError = true;
        }
      }
    },
    computed: {
      issue_types() {
        if(this.issue.component == null){
            return [];
        }
        var validIssueTypesForComponentType = [];

        for(var issueTypeIndex = 0; issueTypeIndex < store.state.issue_types.length; issueTypeIndex++){
          var issueType = store.state.issue_types[issueTypeIndex];

          if(issueType.component_type_id == this.issue.component.component_type_id){
            validIssueTypesForComponentType.push(issueType);
          }
        }
        this.issue.issue_type_id = validIssueTypesForComponentType[0].id;
        return validIssueTypesForComponentType;
      },
      equipment() {
          if(store.state.components.length > 0){
            return [store.state.components[0].equipment];
          }
          else{
            return [];
          }
      },
      components() {
        if(this.issue.equipment == null){
          return [];
        }
        var validComponentsForEquipment = [];

        for(var equipmentIndex = 0; equipmentIndex < store.state.components.length; equipmentIndex++){
          var component = store.state.components[equipmentIndex];

          if(component.equipment.id == this.issue.equipment.id){
            validComponentsForEquipment.push(component);
          }
        }
        return validComponentsForEquipment;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ul {}
</style>
