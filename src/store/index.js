// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import technicalDepartment from './technicalDepartment';
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        technicalDepartment
    }
});

export default store;