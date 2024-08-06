<template>
  <div class="table-wrapper">
    <div class="btn-end">
      <div class="mod-title">{{ title }}</div>
      <template v-if="isViewMode">
        <el-button type="primary" @click="handleAddClick"><i class="el-icon-plus"></i>新增</el-button>
      </template>
    </div>
    <el-table :data="localTableData" style="width: 100%" border :show-overflow-tooltip="true">
      <el-table-column prop="序号" label="序号" width="50"> 
      </el-table-column>
      <!-- <el-table-column v-for="column in tableColumns" :key="column.prop" :prop="column.prop" :label="column.label"></el-table-column> -->
      

      <el-table-column label="工单号" width="150">
      <template slot-scope="scope">
        <div v-if="editIndex !== scope.$index">
          <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
            <span class="text-overflow">{{ scope.row.orderNumber }}</span>
          </el-tooltip>
        </div>
        <el-input v-else v-model="editableRow.orderNumber"></el-input>
      </template>
    </el-table-column>
      <el-table-column prop="functionalLocation" label="功能位置" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="workContent" label="工作内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="permit" label="许可证" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="specialty" label="专业" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="workLeader" label="工作负责人" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="responsiblePerson" label="责任人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="members" label="成员" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="planStart" label="计划开始" width="150" >
        <template slot-scope="scope">
          <el-date-picker
            v-if="editIndex === scope.$index"
            v-model="editableRow.planStart"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <div v-else>
            <el-tooltip class="item" effect="dark" :content="scope.row.planStart" placement="top">
              <span class="text-overflow">{{ scope.row.planStart }}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="工期 (H)" width="150">
        <template slot-scope="scope">
          <el-input v-if="editIndex === scope.$index" v-model="editableRow.duration" type="text"  @input="validateNumber($event, scope.$index)"></el-input>
          <div v-else>
            <el-tooltip class="item" effect="dark" :content="scope.row.duration" placement="top">
              <span class="text-overflow">{{ scope.row.duration }}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="riskIdentification" label="风险识别" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderIdentification" label="工单识别" width="120" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="orderStatus" label="工单状态" width="100" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="orderStatus" label="工单状态" width="120">
  <template slot-scope="scope">
    <el-select v-if="editIndex === scope.$index" v-model="editableRow.orderStatus">
      <!-- 下拉框的选项，这里需要根据实际情况填充 -->
      <el-option
        v-for="item in statusOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div v-else>
      <el-tooltip class="item" effect="dark" :content="scope.row.orderStatus" placement="top">
      <span class="text-overflow">{{ scope.row.orderStatus }}</span>
    </el-tooltip>
    </div>
    <!-- <span v-else>{{ scope.row.orderStatus }}</span> -->
  </template>
</el-table-column>
      <el-table-column prop="planReminder" label="计划执行时间" width="160" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150" fixed="right" v-if="isViewMode">
        <!-- <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template> -->

        <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" class="btn-primary-action">
          {{ editIndex === scope.$index ? '保存' : '编辑' }}
        </el-button>
        <el-button size="mini" v-if="editIndex === scope.$index" @click="handleCancelEdit" class="btn-primary-action">取消</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" class="btn-danger-action">删除</el-button>
      </template>

      </el-table-column>
    </el-table>

    <div class="pager" v-if="tableData.length > 9">
      <el-pagination
        ref="pager"
        @size-change="changeSize"
        @current-change="changeCurrentPage"
        @prev-click="changeCurrentPage"
        @next-click="changeCurrentPage"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    },
    isViewMode: {
      type: Boolean,
      default: false
    },
    title:{
      type:String,
      default:''
    },
    total:{
      type:Number,
      default:0
    },
    tableColumns:{
      type:Array,
      default:()=>[]
    }

  },

  watch: {
    tableData: {
      immediate: true,
      handler(newVal) {
        this.localTableData = [...newVal];
      }
    }
  },

  data(){
    return {
      localTableData:[],
      editIndex: -1,
      editableRow: {},
      currentPage: 1,
      pageSize: 10,
      newTaskTemplate: { orderNumber: '',
       workOrder: '', 
       functionLocation: '', 
       workContent: '', 
       permit: '', 
       specialty: '', 
       personInCharge: '',
        plannedStart: '',
         duration: ''},

         statusOptions:[{
          label:'已完成',
          value:'已完成'
         },{
          label:'未完成',
          value:'未完成'
         }]
    }
  },
  methods:{
    validateNumber(value, index) {
    // 仅保留数字字符
    const numericValue = value.replace(/[^\d]/g, '');
    console.log('index',index)
    console.log('numericValue',numericValue)
    
    // 更新 localTableData 的值
    this.$set(this.localTableData, index, { ...this.localTableData[index], duration: numericValue });
    this.$emit('update:tableData', [...this.localTableData]);
  },
    // handleEdit(index, row) {
    //   console.log('Edit:', index, row);
    // },
    handleEdit(index, row) {
      if (this.editIndex === index) {
        // Save changes
        this.$set(this.localTableData, index, { ...this.editableRow });
        this.editIndex = -1;
        this.$emit('update:tableData', [...this.localTableData]);
      } else {
        // Enter edit mode
        this.editableRow = { ...row };
        this.editIndex = index;
      }
    },
    handleCancelEdit() {
      this.editIndex = -1;
    },
    handleDelete(index, row) {
      console.log('Delete:', index, row);
      this.$confirm('确定要删除这条记录吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除操作的接口
        this.localTableData.splice(index, 1);
        this.$emit('update:tableData', [...this.localTableData]);
      }).catch(() => {
        // 用户取消了删除操作
      });
    },
    headerCellStyle() {
      return {
        backgroundColor: '#f5f7fa',
        color: '#333',
      };
    },
    rowStyle() {
      return {
          backgroundColor: '#f9f9f9',
        };
    },
    handleAddClick(){
      this.localTableData.unshift({ ...this.newTaskTemplate });
      this.editIndex = 0;
      this.editableRow = { ...this.newTaskTemplate };
      this.$emit('update:tableData', [...this.localTableData]);
    },
    handleFilterClick(){

    },
    //改变每页显示数
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.$emit('updateList',{pageSize:this.pageSize,currentPage:this.currentPage})
    },
    //翻页
    changeCurrentPage(current) {
      this.currentPage = current
      this.$emit('updateList',{pageSize:this.pageSize,currentPage:this.currentPage})
    }
  },
  mounted() {

  },
  destroyed() {

  }

};
</script>
<style scoped lang="scss">
// @import '@/element-variables.scss';
.table-wrapper{
  margin-top: 20px;
}
.table-header th{
  background-color: #f00 !important; /* 表头背景颜色 */
  color: #333; /* 表头文字颜色 */
}

.table-row {
  background-color: #b2b2df !important; /* 表格内容背景颜色 */
  color: #666; /* 表格内容文字颜色 */
}

.btn-end{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--sp6);
}


.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
}

.tooltip-container {
  display: inline-block;
  max-width: 100%;
}

.el-tooltip .el-tooltip__popper {
  white-space: nowrap;
}
</style>