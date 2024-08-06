<template>
  <div class="table-box">
    <el-row class="mt-20">
      <div class="dp-f top-action-wrapper" style="margin-bottom: 10px">
        <el-button class="btn-default" @click="addRow" size="small">新增</el-button>
      </div>
    </el-row>
    <el-table
        :data="tableData"
        border
        ref="winTable"
        header-row-class-name="header-row"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"
          width="40"
          align="center"
      ></el-table-column>
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="productName"
          label="部门名称"
          min-width="200"
          align="center"
      >
        <template slot-scope="scope">
          <div v-if="isEditing(scope.$index)">
            <el-select v-model="scope.row.productName" placeholder="请选择部门">
              <el-option v-for="option in departmentOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
          </div>
          <div v-else>
            {{ scope.row.productName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="productCode"
          label="业务中心"
          min-width="200"
          align="center"
      >
        <template slot-scope="scope">
          <div v-if="isEditing(scope.$index)">
            <el-select v-model="scope.row.productCode" placeholder="请选择业务中心">
              <el-option v-for="option in centerOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
          </div>
          <div v-else>
            {{ scope.row.productCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <div v-if="isEditing(scope.$index)">
            <el-button @click="saveRow(scope.$index)" type="text" size="small">保存</el-button>
            <el-button @click="cancelEdit" type="text" size="small">取消</el-button>
          </div>
          <div v-else>
            <el-button @click="editRow(scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
          ref="pager"
          @size-change="changeSize"
          @current-change="changeCurrentPage"
          @prev-click="changeCurrentPage"
          @next-click="changeCurrentPage"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域二'
      },{
        productName: '技术一',
        productCode: '区域一'
      },{
        productName: '技术一',
        productCode: '区域一'
      },{
        productName: '技术二',
        productCode: '区域一'
      },{
        productName: '技术二',
        productCode: '区域一'
      },{
        productName: '技术二',
        productCode: '区域一'
      }],
      total: 10,
      currentPage: 1,
      pageSize: 10,
      searchParams: {},
      multipleSelection: [], // 选中的表格数据
      ids: '', // 选中表格的ids
      editingIndex: null, // 正在编辑的行索引
      isAdding: false,// 标记是否在新增
      isEdit: false,//标记是否在编辑
      departmentOptions: [ // 下拉框选项
        { value: '区域一', label: '区域一' },
        { value: '区域二', label: '区域二' }
      ],
      centerOptions: [ // 下拉框选项
        { value: '技术一', label: '技术一' },
        { value: '技术二', label: '技术二' }
      ],
      divisible:false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.ids = this.multipleSelection.map(it => it.id)
    },
    async  addRow() {
      if (this.isAdding) {
        this.$message.error('请先保存当前新增的数据')
        return
      }
      // this.editingIndex = this.tableData.length
      // this.isAdding = true
      // this.isEdit = false
      // let rowsOnCurrentPage = this.tableData.length;
      // if (rowsOnCurrentPage >= this.pageSize) {
      //   this.divisible = true
      //   this.currentPage += 1;
      //   await this.getList();
      // }else{
      //   this.divisible = false
      //   this.tableData.push({ productName:'',productCode: '' })
      // }
      let rowsOnCurrentPage = this.tableData.length;
      if (rowsOnCurrentPage >= this.pageSize) {
        this.divisible = true
        this.currentPage += 1;
        await this.getList();
      } else {
        this.editingIndex = this.tableData.length;
        this.divisible = false
        this.tableData.push({ productName: '', productCode: '' });
      }

      // Set editing flags

      this.isAdding = true;
      this.isEdit = false;
    },
    isEditing(index) {
      return index === this.editingIndex
    },
    saveRow(index) {
      console.log('index',index)
      // 保存逻辑处理
      this.isAdding = false
      this.isEdit = false
      this.editingIndex = null
      this.$message.success('保存成功')
      this.getList()
    },
    cancelEdit() {
      if (!this.isEdit) {
        this.tableData.pop();
      } else {
        this.editingIndex = null;
      }
      this.isAdding = false;
      this.isEdit = false
      this.getList();
    },
    editRow(index) {
      if (this.isAdding) {
        this.$message.error('请先保存当前新增的数据')
        return
      }
      this.editingIndex = index
      this.isAdding = true
      this.isEdit = true
      this.getList();
    },
    deleteRow(index) {
      if (this.isAdding) {
        this.$message.error('请先保存当前新增的数据')
        return
      }
      this.tableData.splice(index, 1)
      this.getList()
    },
    getList(
        params = { currentPage: this.currentPage, pageSize: this.pageSize }
    ) {
      const mockData = [
        { id: 1, productName: '技术一', productCode: '区域二'},
        { id: 2, productName: '技术一', productCode: '区域二' },
        { id: 3, productName: '技术一', productCode: '区域二' },
        { id: 4, productName: '技术一', productCode: '区域二' },
        { id: 5, productName: '技术一', productCode: '区域二' },
        { id: 6, productName: '技术一', productCode: '区域二' },
        { id: 7, productName: '技术一', productCode: '区域二' },
        { id: 8, productName: '技术一', productCode: '区域二' },
        { id: 9, productName: '技术一', productCode: '区域二' },
        { id: 10, productName: '技术一', productCode: '区域二' },
      ];


      const startIndex = (params.currentPage - 1) * params.pageSize;
      const endIndex = params.currentPage * params.pageSize;


      this.tableData = mockData.slice(startIndex, endIndex);


      this.total = mockData.length;

      if (this.divisible) {
        this.total += 1; // Increase total count
        this.editingIndex = this.tableData.length;
        this.tableData.push({ productName:'',productCode: '' })
      }
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.getList()
    },
    changeCurrentPage(current) {
      this.currentPage = current
      this.getList()
    }
  }
}
</script>

<style scoped>
.top-action-wrapper .btn-default + .btn-default {
  margin-left: 10px;
}
</style>
