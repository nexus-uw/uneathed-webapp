import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)


const _getIssues = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve(Array(5)
    .fill('_'
    ).map((v, i) =>
      ({
        date: new Date(),
        id: i + 1,
        type: 'Mock type',
        priority: (i % 3) + 1
      })
    ))
}, 1000))

const SERVER = 'http://10.0.2.89:3000'

async function load(type) {
  let response = await fetch(`${SERVER}/${type.toLowerCase()}.json`);
  return await response.json();
}

async function triggerOrder(id) {
  return await fetch(`${SERVER}/trigger-order/${id}`, {
    method: 'POST'
  }).json();
}

async function doWork(issueId) {
  return await fetch(`${SERVER}/do-work/${issueId}`, {
    method: 'POST'
  }).json();
}

export default new Vuex.Store({
  state: {
    issues: [],
    orders: [],
    items: []
  },
  mutations: {
    loadIssues(state, data) {
      state.issues = [].concat(data);
    },
    loadOrders(state, data) {
      state.orders = [].concat(data);
    },
    loadItems(state, data) {
      state.items = [].concat(data);
    }
  },
  actions: {
    async load({ commit }, type) {
      commit('load' + type, await load(type))
    },
    async triggerOrder({ commit }, orderId) {
      await triggerOrder(orderId);
      ['Orders', 'Items'].forEach(type => commit('load' + type, load(type)))
    },
    async triggerWork({ commit }, jobId) {
      await triggerOrder(jobId);
      ['Orders', 'Items', 'Issues'].forEach(type => commit('load' + type, load(type)))
    }
  }
});
