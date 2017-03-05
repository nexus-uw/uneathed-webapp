<template>
  <div class="hello">
    <h1>Inventory</h1>
    <button v-on:click="triggerOrder()" v-bind:disabled="!anyOrders">TRIGGER ORDER COMING IN</button>
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
    mounted() {
      store.dispatch('load', 'Items');
      store.dispatch('load', 'Orders');
    },
    methods: {
      triggerOrder() {
        if (!store.state.orders || !store.state.orders.length || !store.state.orders[0].id) {
          return;
        }
        store.dispatch('triggerOrder', store.state.orders[0].id);
      }
    },
    computed: {
      anyOrders() {
        return store.state.orders.length > 0;
      },
      inventory() {
        return store.state.items.map(i => {
          i.orderCount = store.state.orders.reduce((sum, order) => order.item_type_id === i.id ? sum + order.item_count : sum, 0);
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
