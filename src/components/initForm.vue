<template>
  <div>
    <el-form :model="formModel" ref="formRef" label-width="120px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formModel.name"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model.number="formModel.amount"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="cc">
        <el-input v-model.number="formModel.cc"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="dd">
        <el-input v-model.number="formModel.dd"></el-input>
      </el-form-item>
      <!-- 其他表单项... -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default {
  props: {
    initialValues:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      formModel: {
        dd:'',
        cc:''
      }
    };
  },
  watch: {
    initialValues: {
      immediate: true,
      deep: true,
      handler(value) {
        this.formModel = { ...value,...this.formModel};
      }
    }
  },
  created() {
    console.log('aaa')
    // 使用父组件传递的初始值
    this.form = { ...this.initialValues };
  },
  methods:{
    submitForm(){

    }
  }
}

</script>



<style scoped>

</style>