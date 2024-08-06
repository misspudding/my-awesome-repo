<template>
  <div class="container">
    <el-form :inline="true" label-position="right" label-width="80px">
          <el-form-item label="工单号">
            <el-input v-model="formData.orderNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="功能位置">
            <el-input v-model="formData.functionLocation" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-select v-model="formData.profession" placeholder="请选择">
              <el-option label="专业1" value="1"></el-option>
              <el-option label="专业2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作内容">
            <el-input v-model="formData.workContent" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工作负责人">
            <el-select v-model="formData.responsiblePerson" placeholder="请选择">
              <el-option label="负责人1" value="1"></el-option>
              <el-option label="负责人2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="许可证">
            <el-input v-model="formData.permit" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工单标识">
            <el-checkbox-group v-model="formData.orderTags">
              <el-checkbox label="A类"></el-checkbox>
              <el-checkbox label="B类"></el-checkbox>
              <el-checkbox label="IS1类"></el-checkbox>
              <el-checkbox label="高温封"></el-checkbox>
              <el-checkbox label="核安全"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="责任人">
            <el-checkbox-group v-model="formData.responsibilities">
              <el-checkbox label="待维护责任人"></el-checkbox>
              <el-checkbox label="执行责任人"></el-checkbox>
              <el-checkbox label="管理责任人"></el-checkbox>
              <el-checkbox label="监督责任人"></el-checkbox>
              <el-checkbox label="核安全责任人"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div style="margin-top: 20px;">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
  </div>
</template>

<script>
export default {

  data(){
    return {
      formData: {
        orderNumber: '',
        functionLocation: '',
        profession: '',
        workContent: '',
        responsiblePerson: '',
        date: [],
        permit: '',
        orderTags: [],
        responsibilities: [],
      },
    }
  },
  methods:{
    query() {
      console.log(this.formData);
      // Add your query logic here
    },
    reset() {
      this.formData = {
        orderNumber: '',
        functionLocation: '',
        profession: '',
        workContent: '',
        responsiblePerson: '',
        date: [],
        permit: '',
        orderTags: [],
        responsibilities: [],
      };
    },


  },
  mounted() {

  },
  destroyed() {

  }

};
</script>
<style scoped lang="scss">
.chart-container {
  margin: 20px;
  height: 400px;
}


</style>