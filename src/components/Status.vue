<template>
  <div class="hello">
    <h1>Status</h1>
    <div style="display:inline-flex">
      <bar-chart v-if="haveItems" v-bind:chartData="data" v-bind:options="options" v-bind:height="400" v-bind:width="800"></bar-chart>
    </div>
    <div class="row title-bar">
      <h2 class="col-5">item</h2>
      <h2 class="col-5">number of days between service (historical)</h2>
    </div>
    <ul>
      <li v-for="i in serviceLives" class="row">
        <div class="col-5">{{i[0]}}</div>
        <div class="col-5">{{i[1]}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import BarChart from './bar-chart'
  import store from '../store'
  import R from 'ramda';
  export default {
    components: { BarChart },

    name: 'work',
    data() {
      return {
        message: '',
        serviceLives: [
          ["SS", 22],
          ["BED", 16],
          ["WHL", 60],
          ["STR", 43],
          ["BP", 61],
          ["BRK", 19],
          ["DIF", 20],
          ["FD", 17],
          ["STE", 1],
          ["PPF", 24],
          ["TRA", 22],
          ["CHOIST", 56],
          ["CAB", 21],
          ["INJ", 89],
          ["CSTEER", 40],
          ["SSPN", 475],
          ["COOL", 51],
          ["RAD", 115],
          ["ALT", 42],
          ["TC", 50],
          ["PPH", 3],
        ]
      }
    },
    mounted() {
      store.dispatch('load', 'Items')
      store.dispatch('load', 'Orders')
    },
    computed: {
      haveItems() {
        return store.state.items.length > 0
      },
      data() {
        console.log('data', store.state.items.map(i => i.available_count))
        return {
          datasets: [
            {
              label: 'In Stock',
              backgroundColor: '#5e9cd3',
              data: store.state.items.map(i => i.available_count) || []
            },
            {
              label: 'In Stock + Ordered',
              backgroundColor: '#28744a',
              data: store.state.items.map(i =>
                i.available_count + R.sum(store.state.orders.filter(o => o.item_type_id === i.id).map(o => o.item_count))
              ) || []
            },
            {
              label: 'Expected Stock',
              backgroundColor: '#c35a20',
              data: [10, 3, 2, 21, 15, 7]
            }],
          chartData: [

          ],
          labels: store.state.items.map(i => i.name),
          height: 400
        }
      },
      options() {
        return { responsive: false, maintainAspectRatio: false }

      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-5 {
    width: 50%
  }
</style>
