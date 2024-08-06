<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in technicalDepartmentList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="testValue" placeholder="请选择">
      <el-option
          v-for="item in testList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '', // 选中值
      testValue: '', // testList选中值
      initTechnicalDepartmentList: [
        { value: '大修业务', label: '大修业务', code: '大修业务' },
        { value: '监理中心', label: '监理中心', code: '监理中心' },
        { value: '其他', label: '其他', code: '其他' },
        { value: '培训中心', label: '培训中心', code: '培训中心' }
      ],
      technicalDepartmentList: [], // 下拉数组
      disable: true, // 是否可选

      requiredRoles: ['10000', '2006', '2007'], // 限定的角色 技术部门领导2006
      roles: '', // 当前角色
      dept: '', // 当前部门
      center: '', // 当前业务中心
      associationList: [] ,// 部门与角色的对应关系

      //維修相關部門
      testList:[{value:'科技信息文档部',label:'科技信息文档部'},
        {value:'监理公司',label:'监理公司'},
        {value:'阳江项目部',label:'阳江项目部'}]
    };
  },
  methods: {
    // 获取角色与部门
    getUserInfo() {
      return new Promise((resolve) => {
        // 模拟 API 请求
        setTimeout(() => {
          this.roles = ['10000222'];
          this.dept = '阳江项目部222';
          resolve({ code: 0 });
        }, 1000);
      });
    },

    // 获取业务中心
    getCenterInfo() {
      return new Promise((resolve) => {
        // 模拟 API 请求
        setTimeout(() => {
          resolve({ code: 0, data: { technicalDepartmentList: this.initTechnicalDepartmentList } });
        }, 1000);
      });
    },

    // 获取部门与业务中心的关系
    getDeptInfo() {
      return new Promise((resolve) => {
        // 模拟 API 请求
        setTimeout(() => {
          this.associationList = [
            { name: '科技信息文档部', code: '其他' },
            { name: '监理公司', code: '监理中心' },
            { name: '阳江项目部', code: '大修业务' }
          ];
          resolve({ code: 0 });
        }, 1000);
      });
    },

    async selectTechnicalDepartmentList() {
      try {
        // 并行请求三个接口
        const [userResponse, centerInfo, deptResponse] = await Promise.all([
          this.getUserInfo(),
          this.getCenterInfo(), // 假设这是另一个获取部门的接口
          this.getDeptInfo()
        ]);

        if (deptResponse.code === 0 && userResponse.code === 0 && centerInfo.code === 0) {
          // 限定角色判断
          const hasRequiredRole = this.requiredRoles.some(role => this.roles.includes(role)); // 是否含有限定的角色
          if (hasRequiredRole) {
            const result = this.associationList.filter(item => item.name === this.dept);
            if (result.length > 0) {
              // 当前部门对应的业务中心code
              const code = result[0].code;
              // 当前业务中心的列表
              this.technicalDepartmentList = this.initTechnicalDepartmentList.filter(item => item.value === code);
              if (this.technicalDepartmentList.length === 1) {
                this.value = this.technicalDepartmentList[0].value;
                this.disable = false;
              } else {
                this.disable = true;
              }

              const hasRepairBusiness = this.technicalDepartmentList.some(item => item.value === '大修业务');
              if (hasRepairBusiness) {
                this.testList = this.testList.filter(item => item.value === this.dept);
                this.testValue = this.dept;
              } else {
                this.testValue = '';
                this.testList = [];
              }
            } else {
              console.log('未找到当前部门对应的业务中心');
            }
          } else {
            this.disable = true;
            // 否则等于接口返回
            this.technicalDepartmentList = this.initTechnicalDepartmentList;
            const hasRepairBusiness = this.technicalDepartmentList.some(item => item.value === '大修业务');
            if (hasRepairBusiness) {
              console.log('aaa')
              // this.testList = this.testList.filter(item => item.value === this.dept);
              // this.testValue = this.dept;
            } else {
              this.testValue = '';
              this.testList = [];
            }
            //接口返回的技術部門
            // this.testList = this.testList;
          }
          this.$emit('technicalDepartmentObj',{technicalDepartmentList:this.technicalDepartmentList,dept:this.dept})
        } else {
          throw new Error('Failed to fetch technical department list');
        }
      } catch (error) {
        console.error('Error fetching technical department list:', error);
      }
    }
  },
  mounted() {
    this.selectTechnicalDepartmentList();
  }
};
</script>

<style scoped lang="scss">
</style>
