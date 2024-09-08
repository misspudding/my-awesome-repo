/*
 * @Author: chenxiaoqian 472979229@qq.com
 * @Date: 2024-05-31 23:12:38
 * @LastEditors: chenxiaoqian 472979229@qq.com
 * @LastEditTime: 2024-08-13 22:45:36
 * @FilePath: \my-element-ui-project\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import technicalDepartment from './technicalDepartment';
// import selectTableData from './selectTableData';

import TableModule from './tableModule';
import moduleAActions from './moduleAActions';
import moduleBActions from './moduleBActions';
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        technicalDepartment,
        // selectTableData,
        moduleA: {
            namespaced: true,
            modules: {
                selectTableData: new TableModule(moduleAActions),
            },
          },
          moduleB: {
            namespaced: true,
            modules: {
                selectTableData: new TableModule(moduleBActions),
            },
          },
    }
});

export default store;