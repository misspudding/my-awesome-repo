<template>
  <div class="table-container">
    <el-row :gutter="0">
      <!-- 遍历行 -->
      <el-col :span="24">
        <el-row :gutter="0" class="table-row">
          <!-- 第一列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第二列 -->
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>
          <!-- 第三列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第四列 -->
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>
          <!-- 第五列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>

          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第二列 -->
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>
          <!-- 第三列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第四列 -->
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>
          <!-- 第五列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <el-col :span="4" class="table-cell">
            {{ getHeader}}
          </el-col>

          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第二列 -->
          <el-col :span="8" class="table-cell">
            {{ getHeader}}
          </el-col>
          <!-- 第三列 -->
          <el-col :span="4" class="table-cell table-header">
            {{ getHeader }}
          </el-col>
          <!-- 第四列 -->
          <el-col :span="8" class="table-cell">
            {{ getHeader}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      getHeader:'1111'
    }
  },
  methods: {
    // getHeader(rowIndex) {
    //   // 根据行索引返回标题内容
    //   return `标题 ${rowIndex + 1}`;
    // },
    // getContent(rowIndex) {
    //   // 根据行索引返回内容
    //   return `内容 ${rowIndex + 1}`;
    // }
  }
};
</script>

<style scoped lang="scss">
.table-container {
  border: 1px solid #f00; /* 外边框 */
}
.table-row {
  border-bottom: 1px solid #f00; /* 行分隔线 */
}
.el-col:last-child .table-row{
  border:none;
}
.table-cell {
  border-right: 1px solid #f00; /* 单元格右边框 */
  padding: 10px;
  text-align: center;
}
.table-cell:last-child{
  border-right: none;
}
.table-header {
  background-color: #f5f7fa; /* 标题背景色 */
  font-weight: bold;
}
</style>