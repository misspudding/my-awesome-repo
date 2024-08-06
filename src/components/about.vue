<template>
<!--  <div class="hello">-->
<!--   about-->
<!--  </div>-->
  <div class="approval-process">
    <h2>审批流程</h2>
    <!-- 根据当前环节显示不同的表单和按钮 -->
    <div v-for="(step, index) in steps" :key="index" >
      <div v-if="currentStep === index">
        <el-form :model="stepFormData[index]" label-width="120px">
          <!-- 显示当前环节的审批表单信息 -->
          <el-form-item label="审批意见">
            <el-input v-model="stepFormData[index].opinion" type="textarea" placeholder="请输入审批意见"></el-input>
          </el-form-item>
          <!-- 显示前一个环节的审批结果 -->
          <div v-if="index > 0">
            <el-tag v-for="(approver, subIndex) in steps[index - 1].approvers" :key="subIndex">
              {{ approver.name }}: {{ approver.decision === 'approve' ? '批准' : '拒绝' }}
            </el-tag>
          </div>
        </el-form>

        <div v-if="canApprove(index)">
          <!-- 只有当前审批人可以进行审批操作 -->
          <el-button type="primary" @click="approve(index)">批准</el-button>
          <el-button type="danger" @click="reject(index)">拒绝</el-button>
        </div>
      </div>

    </div>

    <div v-if="currentStep >= steps.length">
      <!-- 审批流程结束 -->
      <h3>审批流程已完成</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {

  },
  data(){
    return {
      currentStep: 2, // 当前审批环节索引
      steps: [
        // 环节1
        {
          approvers: [
            { name: '审批人A1', decision: null },
            { name: '审批人A2', decision: null },
            { name: '审批人A3', decision: null }
          ]
        },
        // 环节2
        {
          approvers: [
            { name: '审批人B1', decision: null },
            { name: '审批人B2', decision: null },
            { name: '审批人B3', decision: null }
          ]
        },
        // 环节3
        {
          approvers: [
            { name: '审批人C1', decision: null },
            { name: '审批人C2', decision: null },
            { name: '审批人C3', decision: null }
          ]
        }
      ],
      stepFormData: [
        // 每个环节的审批意见表单数据
        { opinion: '' },
        { opinion: '' },
        { opinion: '' }
      ]
    }
  },
  methods:{
    canApprove(stepIndex) {
      // 检查是否轮到该审批人审批
      const currentApprovers = this.steps[stepIndex].approvers;
      return currentApprovers[currentApprovers.length - 1].decision === null;
    },
    approve(stepIndex) {
      // 批准当前环节
      const currentApprovers = this.steps[stepIndex].approvers;
      const currentApprover = currentApprovers[currentApprovers.length - 1];
      currentApprover.decision = 'approve';
      this.recordOpinion(stepIndex);
    },
    reject(stepIndex) {
      // 拒绝当前环节
      const currentApprovers = this.steps[stepIndex].approvers;
      const currentApprover = currentApprovers[currentApprovers.length - 1];
      currentApprover.decision = 'reject';
      this.recordOpinion(stepIndex);
    },
    recordOpinion() {
      // 记录审批意见
      // 假设有一个函数来保存审批意见到数据库
      // saveOpinion(this.stepFormData[stepIndex].opinion, this.currentStep);
      // 检查是否所有审批人已审批，并进入下一个环节
      this.checkNextStep();
    },
    checkNextStep() {
      // 检查是否所有审批人已审批，并进入下一个环节
      const allApproved = this.steps.every(step => {
        return step.approvers.every(approver => approver.decision !== null);
      });
      if (allApproved) {
        this.currentStep++;
      }
    }
  }
}

</script>

<style scoped>

</style>
