<template>
  <div class="table-wrapper">
    <div class="btn-end">
      <div class="mod-title">
        {{ title }}
      </div>
      <div
        v-if="getStatus"
        class="tips-color flex-row"
      >
        <div class="flex-row working">
          <div class="circle warning">
            <i class="el-icon-bell"></i>
          </div>
          <div> 剩余工期24H </div>
        </div>
        <div class="flex-row working">
          <div class="circle danger">
            <i class="el-icon-bell"></i>
          </div>
          <div>剩余工期0</div>
        </div>
      </div>
      <template v-if="!isViewMode">
        <el-button type="primary" class="mod-btn" @click="handleAddClick">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </template>
    </div>
    <el-table
      :data="localTableData"
      style="width: 100%"
      border
      :show-overflow-tooltip="true"
      :row-class-name="getStatus?getRowClass:''"
    >
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('orderNumber')"
        label="工单号"
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.orderNumber }}
          </div>
          <el-input
            v-else
            v-model="editableRow.orderNumber"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('functionalLocation')"
        prop="functionalLocation"
        label="功能位置"
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.functionalLocation }}
            <el-tooltip
              class="item" effect="dark"
              :content="scope.row.functionalLocation"
              placement="top"
            >
              <span class="text-hide">{{ scope.row.functionalLocation }}</span>
            </el-tooltip>
          </div>
          <el-input
            v-else
            v-model="editableRow.functionalLocation"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('workContent')"
        label="工作内容"
        min-width="200"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.workContent }}
          </div>
          <el-input
            v-else
            v-model="editableRow.workContent"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('permit')"
        label="许可证"
        min-width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.permit }}
          </div>
          <el-input
            v-else
            v-model="editableRow.permit"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

<el-table-column
        v-if="tableColumns.includes('specialty')"
        label="专业"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.specialty }}
          </div>
          <el-input
            v-else
            v-model="editableRow.specialty"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('workLeader')"
        label="工作负责人"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.workLeader }}
          </div>
          <el-input
            v-else
            v-model="editableRow.workLeader"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('responsiblePerson')"
        label="责任人"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            v-if="editIndex !== scope.$index" class="text-hide"
            @click="showStaffDialog(scope.row)"
          >
            {{ scope.row.responsiblePerson }}
          </div>
          <el-input
            v-else
            v-model="editableRow.responsiblePerson"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('members')"
        label="成员"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.members }}
          </div>
          <el-input
            v-else
            v-model="editableRow.members"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('planStart')"
        label="计划开始"
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.planStart }}
          </div>
          <el-input
            v-else
            v-model="editableRow.planStart"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('duration')"
        label="工期 (H)"
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.duration }}
          </div>
          <el-input
            v-else
            v-model="editableRow.duration"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

<el-table-column
        v-if="tableColumns.includes('riskIdentification')"
        label="风险识别"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.riskIdentification }}
          </div>
          <el-input
            v-else
            v-model="editableRow.riskIdentification"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('orderIdentification')"
        label="工单识别"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.orderIdentification }}
          </div>
          <el-input
            v-else
            v-model="editableRow.orderIdentification"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('orderStatus')"
        label="工单状态"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.orderStatus }}
          </div>
          <el-input
            v-else
            v-model="editableRow.orderStatus"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableColumns.includes('planReminder')"
        label="计划提醒"
        min-width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.planReminder }}
          </div>
          <el-input
            v-else
            v-model="editableRow.planReminder"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="name === '今日工作' && tableColumns.includes('executionStatus')"
        label="执行情况"
        min-width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index">
            {{ scope.row.executionStatus }}
          </div>
          <el-input
            v-else
            v-model="editableRow.executionStatus"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column v-if="!isViewMode" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="editIndex === scope.$index"
            size="mini"
            class="btn-primary-action"
            @click="handleSave(scope.$index, scope.row)"
          >
            保存
          </el-button>
          <el-button
            v-else
            size="mini"
            class="btn-primary-action"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="editIndex === scope.$index"
            size="mini"
            class="btn-primary-action btn-info"
            @click="handleCancelEdit"
          >
            取消
          </el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            class="btn-danger-action"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>

export default {
  props: {
    tableData: {
      // 表格数据
      type: Array,
      default: () => [],
    },
    tableColumns: {
      // 筛选表格的数据
      type: Array,
      default: () => [        { label: '工单号', prop: 'orderNumber' },
        { label: '功能位置', prop: 'functionalLocation' },
        { label: '工作内容', prop: 'workContent' },
        { label: '许可证', prop: 'permit' },
        { label: '专业', prop: 'specialty' },
        { label: '工作负责人', prop: 'workLeader' },
        { label: '责任人', prop: 'responsiblePerson' },
        { label: '成员', prop: 'members' },
        { label: '计划开始', prop: 'planStart' },
        { label: '工期（H）', prop: 'duration' },
        { label: '风险识别', prop: 'riskIdentification' },
        { label: '工单标识', prop: 'orderIdentification' },
        { label: '工单状态', prop: 'orderStatus' },
        { label: '计划提醒', prop: 'planReminder' },
        { label: '执行情况', prop: 'executionStatus' },
      ].map(it => it.prop),
    },
    isViewMode: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      localTableData: [],
      editIndex: -1,
      editableRow: {},
      // 新增相关
      newTaskTemplate: {
        orderNumber: '',
        functionLocation: '',
        workContent: '',
        permit: '',
        specialty: '',
        workLeader: '',
        responsiblePerson: '',
        members: '',
        planStart: '',
        duration: '',
        riskIdentification: '',
        orderIdentification: '',
        orderStatus: '',
        planReminder: '',
        executionStatus: '',
        isNew: true,
      },
      isAdding: false,
    };
  },


computed: {
    getStatus() {
      return  this.name === '持续工作' &&
        [          '持续工作（含许可证作业的工单）',
          '持续工作（简单作业工单）',
          '已中止工作',
        ].includes(this.title);
    },
  },
  watch: {
    tableData: {
      immediate: true,
      handler(newVal) {
        this.localTableData = [...newVal];
      },
    },
  },

  methods: {
    getRowClass({ row }) {
      // 根据工期设置表格行的字体颜色
      if (row.duration < 10) {
        return 'danger-row';
      } else if (row.duration < 24) {
        return 'warning-row';
      }
      return '';
    },
    handleEdit(index, row) {
        console.log('aaa')
      // 编辑
      if (this.editIndex === index) {
        this.$set(this.localTableData, index, { ...this.editableRow });
        this.editIndex = -1;
        this.isAdding = false;
        this.$emit('update:tableData', [...this.localTableData]);
      } else {
        
        if (this.isAdding ||  this.editIndex > -1) {
          this.$confirm('请先保存数据。', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
            .then(() => {
              // 确定操作
            })
            .catch(() => {
              // 取消操作
            });
        } else {
          // this.isAdding = true;
          this.editableRow = { ...row };
          this.editIndex = index;
        }
      }
    },


handleCancelEdit() {
      // 取消编辑
      if (this.isAdding && this.editIndex === 0) {
        this.localTableData.shift();
        this.isAdding = false;
        this.$emit('update:tableData', [...this.localTableData]);
      }
      this.editIndex = -1;
    },

    handleDelete(index, row) {
      // 删除表格行
      this.$confirm('确定要删除这条记录吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
            this.$emit('delete-item', index, row);
        //   this.localTableData.splice(index, 1);
        //   this.$emit('update:tableData', [...this.localTableData]);
        })
        .catch(() => {
          // 用户取消了删除操作
        });
    },

    handleAddClick() {
      // 新增表格行
      if (this.isAdding || this.editIndex > -1) {
        this.$confirm('请先保存数据。', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        })
          .then(() => {
            // 确定操作
          })
          .catch(() => {
            // 取消操作
          });
      } else {
        this.localTableData.unshift({ ...this.newTaskTemplate });
        this.editIndex = 0;
        this.editableRow = { ...this.newTaskTemplate };
        this.isAdding = true;
        this.$emit('update:tableData', [...this.localTableData]);
      }
    },


    //保存表格
    handleSave(index, row) {
      this.$emit('add-item', row);
    },

    showStaffDialog(row) {
      this.$emit('show-staff-dialog', row);
    },
  },
};
</script>

<style scoped lang="scss">
// .table-wrapper {
//   margin-top: 20px;
// }
// .table-header th {
//   background-color: #f00 !important; /* 表头背景颜色 */
//   color: #333; /* 表头文字颜色 */
// }

// .table-row {
//   background-color: #b2b2df !important; /* 表格内容背景颜色 */
//   color: #666; /* 表格内容文字颜色 */
// }
// /deep/ .el-table .danger-row {
//   td .cell {
//     color: var(--cr-danger) !important;
//   }
// }
// /deep/ .el-table .warning-row {
//   background: #f00;
//   td .cell {
//     color: var(--cr-warning);
//   }
// }
// .btn-info{
//   color: var(--cr-danger) !important;
// }
// .btn-end {
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin-bottom: var(--sp6);
// }
// .tips-color {
//   justify-content: flex-start;
//   align-items: center;
//   margin-left: auto;
//   // margin-left: var(--sp20);
// }
// .working {
//   justify-content: flex-start;
//   align-items: center;
//   margin-right: var(--sp20);
//   .circle {
//     width: 18px;
//     height: 18px;
//     line-height: 18px;
//     text-align: center;
//     color: var(--cr-white);
//     font-size: var(--fs-small);
//     border-radius: var(--radius50);
//     margin-right: var(--sp6);

//     &.danger {
//       background: var(--cr-danger);
//     }
//     &.warning {
//       background: var(--cr-warning);
//     }
//   }
// }
// .mod-btn {
//   margin-left: auto;
// }
// .text-hide{
//   width: 100%;
//   height: 23px;
//   &:hover{
//     color: var(--cr-primary);
//     cursor: pointer;
//   }
// }

</style>

