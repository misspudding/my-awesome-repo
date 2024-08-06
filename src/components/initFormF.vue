<template>
  <div>
    <div class="table" v-for="(item,index) in tabList" :key="index">
      <div class="aa">
        <!--        <div class="label">{{item.name}}</div>-->
        <el-row>
          <el-col>
            <el-input
                v-model="item.c"
                placeholder="不含税价格"
                :disabled="isFieldDisabled('username')"
            ></el-input>
          </el-col>
          <el-col>
            <el-input
                v-model="item.a"
                placeholder="税率"
                :disabled="isFieldDisabled('username')"
            ></el-input>
          </el-col>
          <el-col>
            <el-input
                v-model="item.b"
                placeholder="含税价格"
                :disabled="isFieldDisabled('username')"
            ></el-input>
          </el-col>
        </el-row>

      </div>
    </div>
    <el-row>
      <el-col>
        {{totalA}}

      </el-col>
      <el-col>

      </el-col>
      <el-col>
        {{totalB}}
      </el-col>
    </el-row>
    <el-button @click="add">保存</el-button>
    <el-button @click="submit">提交</el-button>

    <div class="table" v-if="id===2">
      <div class="label">用户名1</div>
      <div class="form-td">
        <div class="con">
          <el-input
              v-model="addForm.q"
              placeholder="请输入用户名"
              :disabled="isFieldDisabled('username')"
          ></el-input>
        </div>
      </div>
      <div class="label">密码1</div>
      <div class="form-td">
        <div class="con">
          <el-input
              v-model="addForm.w"
              type="password"
              placeholder="请输入密码"
              :disabled="isFieldDisabled('password')"
          ></el-input>
        </div>
      </div>
      <div class="label">验证码2</div>
      <div class="form-td">
        <div class="con">
          <el-input
              v-model="addForm.e"
              type="password"
              placeholder="请输入验证码"
              :disabled="isFieldDisabled('aa')"
          ></el-input>
        </div>
      </div>
      <div class="label">验证码3</div>
      <div class="form-td">
        <div class="con">
          <el-input
              v-model="addForm.r"
              type="password"
              placeholder="请输入验证码"
              :disabled="isFieldDisabled('bb')"
          ></el-input>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="4"></el-col>
    </el-row>
    <el-button :disabled="![2].includes(status)">保存</el-button>
    <el-button :disabled="![2].includes(status)">提交</el-button>
    <el-button :disabled="![0,2,3].includes(status)">暂停项目</el-button>
    <el-button :disabled="![8].includes(status)">激活项目</el-button>
    <el-button :disabled="![0,2,3,8].includes(status)">终止项目</el-button>
    <el-button :disabled="![0].includes(status)">退回</el-button>

    <!--    <el-button @click="validateForm">提交</el-button>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据对象
      status: 0,
      id: 1,
      form: {
        username: '',
        password: '',
        aa: '',
        bb: ''
      },
      formLabel: {
        username: '用户名',
        password: '密码',
        aa: '啊啊',
        bb: '宝宝'
      },
      // 验证结果对象
      validationErrors: {},
      //不是必填的字段
      optionalFields: ['bb'],
      // 控制提示框显示的标志
      isMessageShowing: false,

      addForm: {
        q: '',
        w: '',
        e: '',
        r: ''
      },

      tabList: [{
        c: '',
        a: '',
        b: ''
      }],
      // totalA:0,
      totalB:0

    };
  },
  watch: {
    'tabList': {
      deep: true,
      handler(newVal) {
        newVal.forEach(item => {
          if(item.a && item.c){
            // 计算含税价格（b）
            item.b = this.calculateInclusivePrice(item.c, item.a);
            // item.b = (item.c * (1 + item.a)).toFixed(2);
          }

        });
      }
    }
  },
  computed:{
    totalA() {
      return this.tabList.reduce((total, item) => {
        if (item.c !== '') {
          return total + parseFloat(item.c);
        } else {
          return total;
        }
      }, 0);
    }
  },
  methods: {
    add() {
      this.tabList.push({
        username: '',
        a: '',
        b: '',
      })
    },

    calculateInclusivePrice(exclusivePrice, taxRate) {
      // 计算含税价格的方法
      return exclusivePrice * (1 + taxRate / 100);
    },
    updateInclusivePrice(item) {
      console.log('aaa')
      // 更新含税价格的方法
      if (item.c && item.a) {
        item.b = this.calculateInclusivePrice(item.c, item.a);
      }
    },
    submit() {
      const nonEmptyItems = this.tabList.filter(item => {
        return Object.values(item).some(value => value);
      });
      console.log('www', nonEmptyItems)

      // 遍历筛选后的对象列表
      for (let i = 0; i < nonEmptyItems.length; i++) {
        const item = nonEmptyItems[i];

        // 检查非空对象中的用户名、字段a和字段b是否为空
        if (!item.username) {
          this.$message.error(`第 ${i + 1} 项的用户名不能为空`);
          return;
        }
        if (!item.a) {
          this.$message.error(`第 ${i + 1} 项的字段a不能为空`);
          return;
        }
        if (!item.b) {
          this.$message.error(`第 ${i + 1} 项的字段b不能为空`);
          return;
        }
      }

      console.log('222', nonEmptyItems)

      // 如果所有非空对象的字段都填写，可以进行后续操作
      this.sendDataToBackend(nonEmptyItems);

      // for (let i = 0; i < this.tabList.length; i++) {
      //   const item = this.tabList[i];
      //   // 检查用户名、字段a和字段b是否为空
      //   if (!item.username) {
      //     this.$message.error(`第 ${i + 1} 项的用户名不能为空`);
      //     return;
      //   }
      //   if (!item.a) {
      //     this.$message.error(`第 ${i + 1} 项的字段a不能为空`);
      //     return;
      //   }
      //   if (!item.b) {
      //     this.$message.error(`第 ${i + 1} 项的字段b不能为空`);
      //     return;
      //   }
      //   // 如果所有检查都通过，可以进行后续操作
      //   // 这里可以选择继续循环检查下一项，或者直接发送数据到后端
      // }
      // 如果没有返回（即没有发现空字段），则发送数据到后端
      // this.sendDataToBackend();

      // const hasEmptyField = this.tabList.some(item => {
      //   // 检查用户名、字段a和字段b是否为空
      //   return !item.username || !item.a || !item.b;
      // });
      //
      // if (hasEmptyField) {
      //   // 如果有为空的字段，给出提示
      //   this.$message.error('请填写所有必填项');
      // } else {
      //   // 如果所有字段都已填写，可以进行后续操作，如发送数据到后端
      //   // this.sendDataToBackend();
      // }

    },

    sendDataToBackend() {

    },
    // validateField(field) {
    //   if (!this.form[field]) {
    //     this.validationErrors[field] = `${field} 不能为空`;
    //     const firstKey = Object.keys(this.validationErrors)[0];
    //     this.$message.error(firstKey);
    //   } else {
    //     delete this.validationErrors[field];
    //   }
    // },
    // validateForm() {
    //
    //   for (const field of Object.keys(this.form)) {
    //    this.validateField(field);
    //   }
    //
    //   if (Object.keys(this.validationErrors).length === 0) {
    //     alert('表单验证成功');
    //   }
    // }


    // validateField(field) {
    //   if (!this.form[field]) {
    //     this.validationErrors[field] = `${field} 不能为空`;
    //     // 一旦设置验证错误，就不需要继续执行了
    //     return false; // 表示该字段验证失败
    //   } else {
    //     delete this.validationErrors[field];
    //   }
    // },
    // validateForm() {
    //   let isFirstError = true; // 标记是否已经弹出第一个错误
    //   for (const field of Object.keys(this.form)) {
    //     // 如果已经弹出第一个错误，则不需要继续验证
    //     if (!isFirstError) {
    //       break;
    //     }
    //     this.validateField(field);
    //     if (this.validationErrors[field]) {
    //       isFirstError = false; // 标记已经找到第一个错误
    //       this.$message.error(this.validationErrors[field]); // 弹出错误信息
    //     }
    //   }
    //
    //   if (Object.keys(this.validationErrors).length === 0) {
    //     alert('表单验证成功');
    //   }
    // }


    // 检查字段是否被禁用
    isFieldDisabled(field) {
      return field === 'bb';
    },

    // 验证单个字段的值
    validateField(form, field) {
      const isDisabled = this.isFieldDisabled(field); // 检查字段是否被禁用
      const isRequired = !this.optionalFields.includes(field); // 检查字段是否为必填字段
      //不是被禁用，是必填的并且也不是空，弹提示框
      if (!isDisabled && isRequired && !form[field]) {
        this.validationErrors[field] = `${this.formLabel[field]}不能为空`;
        return false; // 表示该字段验证失败
      } else {
        delete this.validationErrors[field];
      }
      return true; // 表示验证通过
    },


    validateForm() {
      let isFirstError = true; // 标记是否已经弹出第一个错误
      let hasError = false; // 标记是否有错误
      let form = {}
      if (this.id === 1) {
        form = this.form
      } else {
        form = this.addForm
      }
      for (const field of Object.keys(form)) {
        if (isFirstError && !this.validateField(form, field)) {
          isFirstError = false; // 标记已经找到第一个错误
          hasError = true; // 标记存在错误
          // this.$message.error(this.validationErrors[field]); // 弹出错误信息
          if (!this.isMessageShowing) {
            this.showErrorMessage(field);
          }
        }
      }

      if (!hasError) {
        this.$message.success('表单验证成功');
        // 这里可以添加表单提交逻辑
      }
    },

    showErrorMessage(field) {
      // 设置消息显示标志
      this.isMessageShowing = true;
      this.$message.error(this.validationErrors[field]);
      // 使用 setTimeout 来延迟关闭提示框
      setTimeout(() => {
        this.isMessageShowing = false;
        // 这里可以继续执行其他逻辑
      }, 3000); // 3秒后关闭提示框
    },
  },
  mounted() {
    const tabList = [
      { a: 1, b: 0 },
      { a: null, b: '22' },
      { a: false, b: 'text' }
    ]
    let aa = tabList.filter(item => {
      console.log('qqq222',Object.values(item).every(value => value))
      return Object.values(item).some(value => value);
    });
    console.log('aa',aa)
  }
};
</script>
<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 60px;
  flex-wrap: wrap;

  .label {
    width: 20%;
    background: #eaeaea;
    //height: 60px;
  }

  .form-td {
    width: 30%;
    padding: 0.5px;
    box-sizing: border-box;
    background: #eaeaea;

    .con {
      background: #fff;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
}

</style>