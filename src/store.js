import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/config.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      user: '',
      logged: false,
      imgUrl: '',
      keys: {
        owner: null,
        active: null,
        posting: null,
        memo: null
      }
    },
    chain: {
      feed_price: null,
      steem_per_mvests: null,
      reward_balance: null,
      recent_claims: null,
      sbd_per_rshare: null,
      steem_per_rshare: null,
      operation_flat_fee:null,
      bandwidth_kbytes_fee:null,
    },
    rpc_node: Config.RPC_NODES[0],
    max_fails: 1,
    max_fail_rounds: 1000000
  },
  mutations: {
   setNode(state,newVal){
     state.node=newVal
   }
  },
  actions: {

  },
  plugins: [
    createPersistedState()
  ]
})
