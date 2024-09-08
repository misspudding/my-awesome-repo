/*
 * @Author: chenxiaoqian 472979229@qq.com
 * @Date: 2024-08-13 22:34:06
 * @LastEditors: chenxiaoqian 472979229@qq.com
 * @LastEditTime: 2024-08-13 23:56:48
 * @FilePath: \my-element-ui-project\src\store\moduleBActions.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/store/modules/moduleBActions.js
const moduleBActions = {
    fetchList({ commit }) {
      // Custom API call for moduleB
      commit('SET_LIST', [
        {
            label: '工单号2222',
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
            label: '工作负责人2222',
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
          }
      ]);
    },
    setSelectedColumns({ commit }) {
      // Custom logic for moduleB
      commit('SET_SELECTED_COLUMNS', [
        {
            label: '工作负责人2222',
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
          }
      ]);
    },
  };
  
  export default moduleBActions;
  