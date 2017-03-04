<template>
  <div class="hello">
    <h1>Inventory</h1>
    <button v-on:click="loadInventory()">reload inventory</button>
    <button v-on:click="triggerOrder()">trigger order comming in</button>
    <div class="row title-bar">
      <h2 class="col">item</h2>
      <h2 class="col">available</h2>
      <h2 class="col">on order</h2>
    </div>
    <ul>
      <li v-for="i in inventory" class="row">
        <div class="col">{{i.name}}</div>
        <div class="col">{{i.available_count}}</div>
        <div class="col">{{i.orderCount}}</div>
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
  .ul {}
</style>
