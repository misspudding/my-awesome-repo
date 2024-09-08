/*
 * @Author: chenxiaoqian 472979229@qq.com
 * @Date: 2024-08-13 22:33:07
 * @LastEditors: chenxiaoqian 472979229@qq.com
 * @LastEditTime: 2024-08-14 00:34:41
 * @FilePath: \my-element-ui-project\src\store\tableModule.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/store/modules/tableModule.js
class TableModule {
    constructor(actions) {
      this.namespaced = true;
  
      this.state = {
        // 全部
        originalList: [],
        // 过滤后的
        originalSelectedColumns: [],
        // 表格是否正在编辑
        isEditing: false,
      };
  
      this.mutations = {
        SET_LIST(state, options) {
          state.originalList = options;
        },
        SET_SELECTED_COLUMNS(state, columns) {
          state.originalSelectedColumns = columns;
        },
        SET_STARTEDIT(state) {
          state.isEditing = true;
        },
        SET_STOPEDIT(state) {
          state.isEditing = false;
        },
      };
  
      this.actions = actions;
  
      this.getters = {
        originalList: (state) => state.originalList,
        originalSelectedColumns: (state) => state.originalSelectedColumns,
        isEditing: (state) => state.isEditing,
      };
    }
  }
  
  export default TableModule;
  