<template>
  <div class="hello">
    <h1>Inventory</h1>
    <button v-on:click="loadInventory()">reload inventory</button>
    <button v-on:click="triggerOrder()">trigger order comming in</button>
    <h2> inventory </h2>
    <div class="row">

    </div>
    <ul>
      <li v-for="i in inventory">
        {{i.name}} number on hand {{i.available_count}} number on order {{i.orderCount}}
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '../store';
  export default {
    name: 'work',
    data() {
      return {
      }
    },
    methods: {
      loadInventory() {
        store.dispatch('load', 'Items');
        store.dispatch('load', 'Orders');
      },
      triggerOrder() {
        if (!store.state.orders || !store.state.orders.length) {
          return;
        }
        store.dispatch('triggerOrder', store.state.orders[0].id);
      }
    },
    computed: {
      inventory() {
        return store.state.items.map(i => {
          i.orderCount = store.state.orders.reduce((sum, order) => order.item_type_id === i.id ? sum + 1 : sum, 0);
          return i
        });
      }
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
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
