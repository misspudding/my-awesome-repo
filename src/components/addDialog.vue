<template>
    <div>
      <!-- Existing content -->
  
      <!-- Button to trigger dialog -->
      <el-button type="primary" @click="openDialog">新增</el-button>
  
      <!-- Dialog for adding new item -->
      <el-dialog title="新增工作" :visible.sync="dialogVisible" width="600px" @close="resetForm">
        <el-form :model="formData" :rules="rules" ref="form">
          <el-form-item label="编号" prop="code">
            <el-input v-model="formData.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作描述" prop="description">
            <el-input v-model="formData.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="area">
            <el-select v-model="formData.area" placeholder="请选择区域">
              <el-option label="生活区" value="生活区"></el-option>
              <el-option label="工业区" value="工业区"></el-option>
              <el-option label="办公区" value="办公区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="formData.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="科室" prop="section">
            <el-input v-model="formData.section" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责单位" prop="responsibleUnit">
            <el-input v-model="formData.responsibleUnit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作负责人" prop="responsiblePerson">
            <el-input v-model="formData.responsiblePerson" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间" prop="plannedStartTime">
            <el-date-picker
              v-model="formData.plannedStartTime"
              type="datetime"
              placeholder="选择日期和时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="onStartTimeChange"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间" prop="plannedEndTime">
            <el-date-picker
              v-model="formData.plannedEndTime"
              type="datetime"
              placeholder="选择日期和时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="onEndTimeChange"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="工期(H)" prop="duration">
            <el-input v-model="formData.duration" type="number" readonly></el-input>
          </el-form-item>
        </el-form>
  
        <!-- Dialog footer with action buttons -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false,
        formData: {
          code: '',
          description: '',
          area: '',
          department: '',
          section: '',
          responsibleUnit: '',
          responsiblePerson: '',
          plannedStartTime: '',
          plannedEndTime: '',
          duration: '',
        },
        rules: {
          code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
          description: [{ required: true, message: '请输入工作描述', trigger: 'blur' }],
          area: [{ required: true, message: '请选择区域', trigger: 'change' }],
          department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
          section: [{ required: true, message: '请输入科室', trigger: 'blur' }],
          responsibleUnit: [{ required: true, message: '请输入负责单位', trigger: 'blur' }],
          responsiblePerson: [{ required: true, message: '请输入工作负责人', trigger: 'blur' }],
          plannedStartTime: [{ required: true, message: '请选择计划开始时间', trigger: 'change' }],
          plannedEndTime: [{ required: true, message: '请选择计划结束时间', trigger: 'change' }],
          duration: [{ required: true, message: '请输入工期', trigger: 'blur' }],
        },
      };
    },
    methods: {
      openDialog() {
        this.dialogVisible = true;
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 在这里处理新增的逻辑，比如调用API或者直接将数据添加到表格数据中
            this.tableData.push({ ...this.formData });
            this.dialogVisible = false;
            this.resetForm();
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
  
      // 开始时间改变时处理
      onStartTimeChange() {
        const now = new Date();
        const selectedStartTime = new Date(this.formData.plannedStartTime);
        const selectedEndTime = new Date(this.formData.plannedEndTime);
  
        if (selectedStartTime < now) {
          this.$message({
            message: '只能选择当前时间之后的时间',
            type: 'error',
          });
          this.formData.plannedStartTime = ''; // 清空无效的时间
        }
  
        if (selectedEndTime && selectedStartTime > selectedEndTime) {
          this.$message({
            message: '开始时间必须小于结束时间',
            type: 'error',
          });
          this.formData.plannedStartTime = ''; // 清空无效的开始时间
        }
        this.calculateDuration();
      },
  
      // 结束时间改变时处理
      onEndTimeChange() {
        const now = new Date();
      const selectedEndTime = new Date(this.formData.plannedEndTime);
      const startTime = new Date(this.formData.plannedStartTime).getTime();
      const endTime = selectedEndTime.getTime();

      if (selectedEndTime < now) {
        this.$message({
          message: '只能选择当前时间之后的时间',
          type: 'error',
        });
        this.formData.plannedEndTime = ''; // 清空无效的结束时间
      } else if (endTime < startTime) {
        this.$message({
          message: '结束时间必须晚于开始时间',
          type: 'error',
        });
        this.formData.plannedEndTime = ''; // 清空无效的结束时间
      }

      this.calculateDuration();
      },
  
  
      // 计算工期
      calculateDuration() {
        if (this.formData.plannedStartTime && this.formData.plannedEndTime) {
          const start = new Date(this.formData.plannedStartTime).getTime();
          const end = new Date(this.formData.plannedEndTime).getTime();
          this.formData.duration = (end - start) / (1000 * 60 * 60); // 转换为小时
        } else {
          this.formData.duration = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  </style>
  