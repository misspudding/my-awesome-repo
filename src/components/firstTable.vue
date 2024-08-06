<template>
  <div class="container">
    <search-params></search-params>
    <div class="top-wrapper flex-row">
      <div class="title-wrapper flex-column">
        <div class="title">机械部-调速通风科（2024-07-16）</div>
        <div class="des">遵守程序推广 (23)：及时汇报不处罚，隐瞒不报损安全。</div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="handleFilterClick" class="btn-white"><i class="el-icon-plus"></i>筛选</el-button>
        <el-button type="primary" @click="handleExport" class="btn-white-show">数据导出</el-button>
        <el-button type="primary" @click="goPage" class="btn-white-show">下一工作日汇总</el-button>
      </div>
    </div>
    <div class="card-wrapper">
      <el-tabs v-model="activeTab" class="reset-tabs" @tab-click="handleTabClick">
      <el-tab-pane label="大亚湾" name="1"> 
        <div class="tab-wrapper">
          <toggle-button @changeTab="changeTab"></toggle-button>
        <!-- <task-table :tableData="tableData" :tableColumns="tableColumns" :total="total" isViewMode @handleDelete="handleDelete" title="新增的重要工作" @click="updateList"></task-table>
        <task-table :tableData="tableData" :tableColumns="tableColumns" :total="total" :isViewMode="false" title="下一个工作日计划执行的工作" @click="updateList"></task-table> -->
        isViewMode{{isViewMode}}
        <table-view 
        ref="childComp"
        :tableData="tableData" 
        :tableColumns="tableColumns" 
        :total="total" 
        :isViewMode="false" 
        title="下一个工作日计划执行的工作222" 
        @add-item="addItem"
        @delete-item="deleteItem"
         @update:tableData="updateTableData"
        >
      </table-view>
        </div>
      </el-tab-pane>
      <el-tab-pane label="岭澳一期" name="2">
        <div class="tab-wrapper">
          <toggle-button @changeTab="changeTab"></toggle-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="岭澳二期" name="3">
        <div class="tab-wrapper">
          <toggle-button @changeTab="changeTab"></toggle-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三电站" name="4">
        <div class="tab-wrapper">
          <toggle-button @changeTab="changeTab"></toggle-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
    <el-dialog title="列表配置" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <div class="checkbox-table">
          <el-checkbox-group v-model="selectedColumns">
            <div class="checkbox-td">
              <el-checkbox label="工单号">工单号</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="功能位置">功能位置</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="工作内容">工作内容</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="许可证">许可证</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="专业">专业</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="工作负责人">工作负责人</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="责任人">责任人</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="成员">成员</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="计划开始">计划开始</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="工期（H）">工期（H）</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="风险识别">风险识别</el-checkbox>
            </div>
            
            <div class="checkbox-td">
              <el-checkbox label="工单标识">工单标识</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="工单状态">工单状态</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="计划提醒">计划提醒</el-checkbox>
            </div>
            <div class="checkbox-td">
              <el-checkbox label="执行情况">执行情况</el-checkbox>
            </div>
        </el-checkbox-group>
        </div>
        <el-button @click="selectAll">全选</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveConfig">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchParams from './searchParams.vue';
// import taskTable from './taskTable.vue'
import tableView from './tableView.vue'
import toggleButton from './toggleButton.vue'
export default {
  components: {
    // taskTable,
    toggleButton,
    SearchParams,
    tableView
  },

  data(){
    return {
      activeTab: '1',//接口参数
      name:'',//接口参数
        tasks1: [
          { 序号: 1, 工单号: '80000514219344444444444444444444444444444444444444444', 功能位置: 'DY-O-17-TER-005DI', 工作内容: '检查设备内表面是否存在', 许可证: 'PW', 专业: 'MSC_ES', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 09:00', 工期: 56 },
          { 序号: 2, 工单号: '800005847298', 功能位置: 'DY-O-92-SHY-104SN', 工作内容: 'AMC:配合-机电仪:请机', 许可证: 'PW', 专业: 'MSC_DB', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 09:00', 工期: 72 },
          { 序号: 3, 工单号: '800005358222', 功能位置: 'DY-2-26-GSE', 工作内容: 'PTO2GSE001 GSE系统', 许可证: 'PI', 专业: 'OP', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 08:00', 工期: 8 }
        ],
        tasks2: [
          { 序号: 1, 工单号: '800005142193', 功能位置: 'DY-O-17-TER-005DI', 工作内容: '检查设备内表面是否存在', 许可证: 'PW', 专业: 'MSC_ES', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 09:00', 工期: 56 },
          { 序号: 2, 工单号: '800005847298', 功能位置: 'DY-O-92-SHY-104SN', 工作内容: 'AMC:配合-机电仪:请机', 许可证: 'PW', 专业: 'MSC_DB', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 09:00', 工期: 72 },
          { 序号: 3, 工单号: '800005358222', 功能位置: 'DY-2-26-GSE', 工作内容: 'PTO2GSE001 GSE系统', 许可证: 'PI', 专业: 'OP', 工作负责人: '', 责任人: '', 成员: '', 计划开始: '2024-03-12 08:00', 工期: 8 }
        ],
        total: 10,
        currentPage: 1,
        pageSize: 10,

        dialogVisible:false,
        selectedColumns: [],
        allColumns: [
        { label: '工单号', prop: 'orderNumber' },
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
        { label: '执行情况', prop: 'executionStatus' }
      ],
      //初始化数据
      tableData: [
        // 数据示例
        {
          orderNumber: '00144444444444444444444444444444444444444444444444',
          functionalLocation: '位置A',
          workContent: '内容A',
          permit: '许可A',
          specialty: '专业A',
          workLeader: '负责人A',
          responsiblePerson: '责任人A',
          members: '成员A',
          planStart: '2024-07-31',
          duration: '8',
          riskIdentification: '低',
          orderIdentification: '标识A',
          orderStatus: '已完成',
          planReminder: '无',
          executionStatus: '正常'
        },
        {
          orderNumber: '00144444444444444444444444444444444444444444444444',
          functionalLocation: '位置A',
          workContent: '内容A',
          permit: '许可A',
          specialty: '专业A',
          workLeader: '负责人A',
          responsiblePerson: '责任人A',
          members: '成员A',
          planStart: '2024-07-31',
          duration: '8',
          riskIdentification: '低',
          orderIdentification: '标识A',
          orderStatus: '已完成',
          planReminder: '无',
          executionStatus: '正常'
        },
        {
          orderNumber: '00144444444444444444444444444444444444444444444444',
          functionalLocation: '位置A',
          workContent: '内容A',
          permit: '许可A',
          specialty: '专业A',
          workLeader: '负责人A',
          responsiblePerson: '责任人A',
          members: '成员A',
          planStart: '2024-07-31',
          duration: '8',
          riskIdentification: '低',
          orderIdentification: '标识A',
          orderStatus: '已完成',
          planReminder: '无',
          executionStatus: '正常'
        }
      ]
    }
  },
  created() {
    this.tableColumns = this.allColumns.map(it=>it.prop); // 初始值为 allColumns
  },
  // computed: {
  //   tableColumns() {
  //     return this.selectedColumns.length === 0 ? this.allColumns : this.allColumns.filter(column => this.selectedColumns.includes(column.label));
  //   }
  // },
  methods:{
    handleTabClick(tab){
      this.activeTab = tab.name
      this.getList()
    },
    changeTab(e){
      this.name = e.name
      console.log('name',this.name)
      this.getList()
    },
    handleDelete({index,row}){
      console.log('index',index)
      console.log('row',row)
      //调用删除的接口

    },
    handleFilterClick(){
      this.dialogVisible = true

    },
    selectAll() {
      this.selectedColumns = this.allColumns.map(column => column.label);
    },
    saveConfig() {
      this.tableColumns = this.allColumns.filter(column => this.selectedColumns.includes(column.label));
      this.dialogVisible = false;
    },
    handleExport(){

    },
    goPage(){

    },
    //2====新增数据
    addItem(){
      //调用接口
      // const response = await axios.post('/api/addItem', item);
      //   this.getList();
      // 取消编辑状态
        this.$refs.childComp.handleCancelEdit(); 
    },
    //3====删除数据
    deleteItem(index, item){
      console.log('item',item)
      //删除接口
        // axios.delete(`/api/deleteItem/${item.id}`);
        //   this.getList();

    },
   //4更新表格数据
    updateTableData(newData) {
      this.tableData = newData;
    },

     //1=====获取数据
     getList(
      // params = {
      //activeTab:this.activeTab,
      //name:this.name,
      //   currentPage: this.currentPage,
      //   pageSize: this.pageSize,
      // }
    ) {
      console.log('test')
      // let obj = {}
      // if (this.hasRequiredRole) {
      //   obj.technicalDepartmentList =  this.technicalDepartmentList.map((it) => it.lable)
      //   obj.maintenanceDepartment = this.maintenanceDepartmentList.map((it) => it.lable)
      // } 
      // const Loading = this.$loading({ text: '获取中' })
      // // params['condition'] = Object.assign({},obj,this.searchParams)
      // params['condition'] = Object.assign({},this.searchParams)
      // productApi
      //   .getPage(params)
      //   .then((res) => {
      //     Loading.close()
      //     if (res.code * 1 === 0) {
      //       this.tableData = res.data.records.slice()
      //       this.total = res.data.total
      //     } else {
      //       const msg = res.msg ? res.msg : '获取列表失败'
      //       this.$message.error(msg)
      //     }
      //   })
      //   .catch((err) => {
      //     Loading.close()
      //     this.$message.error(err)
      //   })
      // .finally(() => {
      //   Loading.close()
      // })
    },

    updateList(e){
      //大于10条才显示
      this.pageSize = e.pageSize || 10
      this.currentPage = e.currentPage || 1
      this.getList()
    }


  },
  mounted() {
    this.getList()
    
  },
  destroyed() {

  }

};
</script>
<style scoped lang="scss">

.top-wrapper {
      color: #2c3e50;
      height: 65px;
      background: var(--cr-primary);
      border-radius: var(--radius8);
      margin-bottom: var(--sp20);
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 0 200px;
      .title-wrapper{
        color: #fff;
        justify-content: flex-start;
        align-items: flex-start;
        .title{
          font-size: var(--fs-extra-large);
        }
        .des{
          font-size: var(--fs16);
        }
      }
    }
    .tab-wrapper{
      padding: var(--sp20);
    }
    


    .checkbox-table .el-checkbox-group{
      border: 1px solid var(--cr-primary);
      display:flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .checkbox-td{
        height: 40px;
        line-height: 40px;
        // border-bottom: 1px solid var(--cr-primary);
        padding:0 var(--sp20);
        width: calc(50% - 40px);
        text-align: left;
        position: relative;
        &::after{
          position: absolute;
            content:'';
            right:0;
            left:0;
            bottom:0;
            height: 1px;
            background: var(--cr-primary);
        }
        &:nth-child(2n-1){
          position: relative;
          &::before{
            position: absolute;
            content:'';
            right:0;
            top:0;
            bottom:0;
            width: 1px;
            background: var(--cr-primary);
          }
        }
        &:nth-last-child(1){
          border-bottom:none;
        }
      }
    }


    .el-checkbox__label{
      position:relative;
      &::before{
        position: absolute;
        content:'';
        top: 0;
        bottom:0;
        left:0;
        width: 1px;
        background: var(--cr-primary);
      }
    }
    
   

</style>