<template>
    <div class="container">
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
      <search-tab></search-tab>

      <div class="card-wrapper">
        <el-tabs v-model="activeTab" class="reset-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="大亚湾" name="1"> 
          <div class="tab-wrapper">
            <toggle-button @changeTab="changeTab"></toggle-button>
            <base-table
        :tableData="localTableData"
        :tableColumns="tableColumnsCopy"
        :isViewMode="isViewMode"
        :editIndex="editIndex"
        :editableRow="editableRow"
        :getStatus="getStatus"
        :getRowClass="getRowClass"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancelEdit"
      />
  
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
  
            <el-checkbox-group v-model="selectedColumnsProp">
              <div class="checkbox-td"  v-for="option in originalList" :key="option.prop">
                <el-checkbox :label="option.prop">{{option.label}}</el-checkbox>
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
  // import tableView from '@/components/tableView.vue'
  import searchTab from '@/components/searchTab.vue'
  import baseTable from '@/components/baseTable.vue'
  import toggleButton from '@/components/toggleButton.vue'
  import tableColumnsConfig from '@/components/tableColumns.js'
  import { mapState, mapActions } from 'vuex';
  export default {
    components: {
      toggleButton,
      baseTable,
      searchTab
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
        isViewMode:false,
        //初始化数据
        localTableData: [
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
        ],
        //模块的
        selectedModule: 'todayRisk', // Default module
        selectedSituation: 'situation1', // Default situation
  
        //选中的
        selectedColumnsProp:[],
        tableColumnsCopy:[],
  
        editIndex: -1,
        editableRow: {},
      }
    },
    computed: {
      ...mapState('moduleB/selectTableData', ['originalList','originalSelectedColumns']),
      
      modules() {
        return tableColumnsConfig;
      },
      
  
    },
    methods:{
      ...mapActions('moduleB/selectTableData', ['fetchList', 'setSelectedColumns']),
  
      getTableColumnsCopy() {
        const list = this.modules[this.selectedModule][this.selectedSituation]
        this.tableColumnsCopy =   this.originalSelectedColumns.map(itemB => 
        list.find(itemA => itemA.prop === itemB.prop))
        console.log('ddd',this.tableColumnsCopy)
  
      },
  getSelectedColumnsProp(){
        this.selectedColumnsProp =  this.originalSelectedColumns && this.originalSelectedColumns.length > 0?this.originalSelectedColumns.map(it=>it.prop):[]
      },
      getStatus() {
        return  this.name === '持续工作' &&
          [          '持续工作（含许可证作业的工单）',
            '持续工作（简单作业工单）',
            '已中止工作',
          ].includes(this.title);
      },
       getRowClass({ row }) {
        // 根据工期设置表格行的字体颜色
        if (row.duration < 10) {
          return 'danger-row'
        } else if (row.duration < 24) {
          return 'warning-row';
        }
        return '';
      },
      handleEdit(index, row) {
        this.editIndex = index;
        this.editableRow = { ...row };
      },
      handleSave(index, row) {
        // Save logic
        console.log('index',index)
        console.log('row',row)
        this.editIndex = -1;
      },
      handleCancelEdit() {
        this.editIndex = -1;
      },
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
        //全选，按照接口返回的顺序写的
        const list = this.modules[this.selectedModule][this.selectedSituation]
        this.tableColumnsCopy = this.selectedColumnsProp.map(itemB => 
        list.find(itemA => itemA.prop === itemB))
      },
      saveConfig() {
        const list = this.modules[this.selectedModule][this.selectedSituation]
        this.tableColumnsCopy = this.selectedColumnsProp.map(itemB => 
        list.find(itemA => itemA.prop === itemB))
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
      this.$nextTick(()=>{
        this.getSelectedColumnsProp()
      })
      this.fetchList(); // Fetch the filter options when the component is created
      this.setSelectedColumns(); // Set the selected columns
      this.getTableColumnsCopy()
  
      
      
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