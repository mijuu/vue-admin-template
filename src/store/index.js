import * as Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

const store = Vuex.createStore({
  modules: {
    app,
    settings,
    user,
  },
  getters,
})

export default store
