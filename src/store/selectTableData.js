// store/modules/selectTableData.js
// import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allList: [],
    selectedColumns: [],
  },
  mutations: {
    SET_FILTER_OPTIONS(state, options) {
      state.allList = options;
    },
    SET_SELECTED_COLUMNS(state, columns) {
      state.selectedColumns = columns;
    },
  },
  actions: {
    fetchFilterOptions({ commit }) {
      commit('SET_FILTER_OPTIONS', [{
        label: '工单号',
        prop: 'orderNumber',
        type: 'text',
        minWidth: 120
      },
      {
        label: '功能位置',
        prop: 'functionalLocation',
        type: 'text',
        minWidth: 120
      },
      {
        label: '工作内容',
        prop: 'workContent',
        type: 'text',
        minWidth: 200
      },
      {
        label: '许可证',
        prop: 'permit',
        type: 'text',
        minWidth: 120
      },
      {
        label: '专业',
        prop: 'specialty',
        type: 'text',
        minWidth: 120
      },
      {
        label: '工作负责人',
        prop: 'workLeader',
        type: 'text',
        edit:true,
        minWidth: 120
      },
      {
        label: '责任人',
        prop: 'responsiblePerson',
        type: 'text',
        edit:true,
        minWidth:120
      },
      {
        label: '成员',
        prop: 'members',
        type: 'text',
        edit:true
      },
      {
        label: '计划开始',
        prop: 'planStart',
        type: 'time',
      },
      {
        label: '工期 (H)',
        prop: 'duration',
        type: 'text',
      },
      {
        label: '风险识别',
        prop: 'riskIdentification',
        type: 'text',
      },
      {
        label: '工单识别',
        prop: 'orderIdentification',
        type: 'text',
      },
      {
        label: '工单状态',
        prop: 'orderStatus',
        type: 'select',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'closed', label: 'Closed' },
        ],
      },
      {
        label: '计划提醒',
        prop: 'planReminder',
        type: 'text',
      },
      {
        label: '执行情况',
        prop: 'executionStatus',
        type: 'text',
      }]);
      // Api.getTableData()
      //   .then(response => response.json())
      //   .then(data => {
      //     commit('SET_FILTER_OPTIONS', data);
      //   });
    },
    setSelectedColumns({ commit }) {
      commit('SET_SELECTED_COLUMNS', [{
        label: '工作负责人',
        prop: 'workLeader',
      },{
        label: '工单号',
        prop: 'orderNumber',
      },
      {
        label: '工作负责人',
        prop: 'workLeader',
      },
      {
        label: '责任人',
        prop: 'responsiblePerson',
      },
      {
        label: '成员',
        prop: 'members',
      },
      {
        label: '计划开始',
        prop: 'planStart',
      },
      {
        label: '风险识别',
        prop: 'riskIdentification',
      },
      {
        label: '工单识别',
        prop: 'orderIdentification',
      }]);
      // Api.getTableData()
      //   .then(response => response.json())
      //   .then(data => {
      //    commit('SET_SELECTED_COLUMNS', data);;
      //   });
    },
  },
  getters: {
    allList: state => state.allList,
    selectedColumns: state => state.selectedColumns,
  },
};