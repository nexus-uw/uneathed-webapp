<template>
  <div class="hello">
    <h1>Issue</h1>
    <div>
      <div class="form-row">
        <label>Detect Issue</label>
        <input type="file" @change="uploadIssueImage">
        <div>{{image_recognition_message}}</div>
      </div>
      <div class="form-row">
        <label>Equipment</label>
        <select v-model="issue.equipment">
          <option v-for="equipmentPiece in equipment" v-bind:value="equipmentPiece">{{equipmentPiece.name}}</option>
        </select>
      </div>
      <div class="form-row">
        <label>Component</label>
        <select v-model="issue.component" v-bind:disabled="!issue.equipment">
          <option v-for="component in components" v-bind:value="component">{{component.name}}</option>
        </select>
      </div>
      <div class="form-row">
        <label>Issue Type</label>
        <select v-model="issue.issue_type_id" v-bind:disabled="!issue.component">
          <option v-for="issue_type in issue_types" v-bind:value="issue_type.id">{{issue_type.name}}</option>
        </select>
      </div>
      <div class="form-row">
        <label>Priority</label>
        <select v-model="issue.priority">
          <option v-bind:value="1">1</option>
          <option v-bind:value="2">2</option>
          <option v-bind:value="3">3</option>
        </select>
      </div>
      <div class="form-row">
        <label>Comment</label>
        <textarea v-model="issue.comment" type="text"></textarea>
      </div>
      <button v-on:click="submitIssue()">Submit</button>
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
  import store from '../store';
  import {SERVER} from '../store';
  export default {
    name: 'create_issue',
    data() {
      return {
        message: null,
        image_recognition_message: null,
        issue: {
          issue_type_id: null,
          component: null,
          equipment: null,
          priority: null,
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
        this.message = null;
        if (this.issue.issue_type_id != null && this.issue.component != null) {
          this.issue.component_id = this.issue.component.id;
          store.dispatch('submitIssue', this.issue);
          this.message = 'issue summited'
          this.issue = {};
        } else {
          this.message = 'Please Fill In Missing Fields';
        }
      },
      uploadIssueImage(e){
        this.image_recognition_message = null;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        var imageData = new FormData();
        var self = this;
        imageData.append('image', files[0]);
        fetch(`${SERVER}/images/detect_component_type.json`, {
          method: 'POST',
          body: imageData
        }).then(function (res) {
          if(res.status == 200) {
            res.json().then(function (components) {
              if (components.length > 0) {
                var component = components[0];

                self.issue.equipment = component.equipment;
                self.issue.component = component;
              }
              else{
                self.image_recognition_message = "Could not match image to component.";
                self.issue.equipment = null;
                self.issue.component = null;
              }
            });
          }
          else{
            self.image_recognition_message = "Could not match image to component.";
            self.issue.equipment = null;
            self.issue.component = null;
          }
        });
      }
    },
    computed: {
      issue_types() {
        if (this.issue.component == null) {
          return [];
        }
        var validIssueTypesForComponentType = [];

        for (var issueTypeIndex = 0; issueTypeIndex < store.state.issue_types.length; issueTypeIndex++) {
          var issueType = store.state.issue_types[issueTypeIndex];

          if (issueType.component_type_id == this.issue.component.component_type_id) {
            validIssueTypesForComponentType.push(issueType);
          }
        }
        this.issue.issue_type_id = validIssueTypesForComponentType[0].id;
        return validIssueTypesForComponentType;
      },
      equipment() {
        if (store.state.components.length > 0) {
          return [store.state.components[0].equipment];
        }
        else {
          return [];
        }
      },
      components() {
        if (this.issue.equipment == null) {
          return [];
        }
        var validComponentsForEquipment = [];

        for (var equipmentIndex = 0; equipmentIndex < store.state.components.length; equipmentIndex++) {
          var component = store.state.components[equipmentIndex];

          if (component.equipment.id == this.issue.equipment.id) {
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
  .form-row {
    margin-bottom: 1rem;
  }
</style>
