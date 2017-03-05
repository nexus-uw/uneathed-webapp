<template>
  <div class="hello">
    <h1>Inventory VS Expected Demand</h1>
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
        const expectedDemand = [10, 3, 2, 21, 200, 7];
        return {
          datasets: [
            {
              label: 'In Stock (%)',
              backgroundColor: '#5e9cd3',
              data: store.state.items.map((i, index) => Math.round(i.available_count / expectedDemand[index] * 100)) || []
            },
            {
              label: 'In Stock + Ordered (%)',
              backgroundColor: '#28744a',
              data: store.state.items.map((i, index) =>
                Math.round((i.available_count + R.sum(store.state.orders.filter(o => o.item_type_id === i.id).map(o => o.item_count))) / expectedDemand[index] * 100)
              ) || []
            }],
          chartData: [

          ],
          labels: store.state.items.map(i => i.name),
          height: 400,


        };
      },
      options() {
        return {
          responsive: false, maintainAspectRatio: false,
          annotation: {
            annotations: [{
              id: 'a-line-1', // optional
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 100,
              borderColor: '#ed7728',
              borderWidth: 1.5,
            }],
          }
        };

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
