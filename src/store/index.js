import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import member from './modules/member'
import shop from './modules/shop'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV == 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
      member,
      shop
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
