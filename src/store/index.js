import Vue from 'vue'
import Vuex from 'vuex'
import state from './modules/state'
import getters from './modules/getters'
import mutations from './modules/mutations'
import actions from './modules/actions'
import modules from './modules/modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
