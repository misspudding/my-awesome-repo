<template>
    <el-form :model="form" label-width="120px" size="medium">
      <!-- 两列布局的行 -->
     
         <!-- 工单号 -->
         <el-form-item label="工单号：">
            <el-input v-model="form.workOrderNumber"></el-input>
          </el-form-item>
          <!-- 功能位置 -->
          <el-form-item label="功能位置：">
            <el-input v-model="form.functionalLocation"></el-input>
          </el-form-item>
          <!-- 工作内容 -->
          <el-form-item label="工作内容：">
            <el-input v-model="form.workContent"></el-input>
          </el-form-item>
          <!-- 许可证 -->
          <el-form-item label="许可证：">
            <el-input v-model="form.permit"></el-input>
          </el-form-item>
          <!-- 专业 -->
          <el-form-item label="专业：">
            <el-select v-model="form.professional">
              <el-option label="机械" value="mechanical"></el-option>
              <el-option label="电气" value="electrical"></el-option>
              <!-- 更多专业选项 -->
            </el-select>
          </el-form-item>
          <!-- 工作负责人 -->
          <el-form-item label="工作负责人：">
            <el-input v-model="form.workLeader"></el-input>
          </el-form-item>
 

          <!-- 日期范围 -->
          <el-form-item label="日期：">
            <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <!-- 工单标识 -->
      <el-form-item label="工单标识" style="width: 50%;">
        <el-checkbox-group v-model="form.workOrderTags">
          <el-checkbox label="A类"></el-checkbox>
          <el-checkbox label="B类"></el-checkbox>
          <el-checkbox label="IS1类"></el-checkbox>
          <el-checkbox label="高辐射"></el-checkbox>
          <el-checkbox label="核安全"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="待维护责任人"  style="width: 50%;">
        <el-checkbox-group v-model="form.maintenanceResponsible">
          <el-checkbox label="执行责任人"></el-checkbox>
          <el-checkbox label="管理责任人"></el-checkbox>
          <el-checkbox label="监督责任人"></el-checkbox>
          <el-checkbox label="高辐射"></el-checkbox>
          <el-checkbox label="核安全责任人"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      
         
      <!-- 表单操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          workOrderNumber: '',
          functionalLocation: '',
          workContent: '',
          permit: '',
          professional: '',
          workLeader: '',
          dateRange: [],
          supervisionResponsible: '',
          maintenanceResponsible: '',
          workOrderTags: [],
        }
      };
    },
    methods: {
      submitForm() {
        console.log('表单提交:', this.form);
        // 在这里添加提交表单的逻辑
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  /* 可以在这里添加CSS样式 */
  .row-wrapper{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .el-form-item{
        width: 25%;
    }
  }
  .el-form-item--medium .el-form-item__content{
    text-align: left;
  }
  </style>