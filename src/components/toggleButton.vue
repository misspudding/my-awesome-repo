<template>
  <div class="tabs">
    <div v-for="(item, index) in tabs" :key="index">
            <el-button class="btn btn-mini" :key="index" @click="switchTab(item.name)" :type="currentTab === item.name ? 'primary' : 'default'">
              {{ item.label }}
            </el-button>
          </div>
  </div>
    
  </template>
  
  <script>
  export default {
  
    data(){
      return {
        currentTab:'下一工作日计划工作',
        tabs: [
        { label: '下一工作日计划工作', name: '下一工作日计划工作' },
        { label: '今日工作', name: '今日工作' },
        { label: '持续工作', name: '持续工作' }
      ]
      }
    },
    methods:{
      switchTab(name) {
        this.currentTab = name
        this.$emit('changeTab',{name})   
    }
  
  
    },
    mounted() {
  
    },
    destroyed() {
  
    }
  
  };
  </script>
  <style scoped lang="scss">
  .tabs{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: -8px;
    .btn{
      margin-right: var(--sp20);
    }
  }
  
  </style>