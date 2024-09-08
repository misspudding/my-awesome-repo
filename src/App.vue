<!--
 * @Author: chenxiaoqian 472979229@qq.com
 * @Date: 2024-04-16 23:04:59
 * @LastEditors: chenxiaoqian 472979229@qq.com
 * @LastEditTime: 2024-08-14 00:32:26
 * @FilePath: \my-element-ui-project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <div>
      <router-link to="/firstTable">firstTable</router-link>
      <router-link to="/secondTable">secondTable</router-link>
      <router-link to="/firstTableView">firstTableView</router-link>
      <router-view></router-view>
      <!-- <first-table></first-table> -->
    </div>
  </div>
</template>

<script>
// import FirstTable from './components/firstTable.vue'
import { mapActions } from 'vuex';



export default {
  name: 'App',
  components: {
    // FirstTable

  },
  data() {
    return {

    }

  },
  methods: {
    // ...mapActions('moduleA/selectTableData', ['fetchList','setSelectedColumns']),
    ...mapActions({
      fetchListA: 'moduleA/selectTableData/fetchList',
      setSelectedColumnsA: 'moduleA/selectTableData/setSelectedColumns'
    }),
    ...mapActions({
      fetchListB: 'moduleB/selectTableData/fetchList',
      setSelectedColumnsB: 'moduleB/selectTableData/setSelectedColumns'
    }),
  },
  created() {
    // Dispatch actions to fetch data
    // this.$store.dispatch('selectTableData/fetchFilterOptions');
    // this.$store.dispatch('selectTableData/setSelectedColumns');
    this.fetchListA(); // Fetches data for moduleA
    this.fetchListB(); // Fetches data for moduleB
    this.setSelectedColumnsA(); // Updates selected columns for moduleA
      this.setSelectedColumnsB(); // Updates selected columns for moduleB
  }
}
</script>

<style scoped lang="scss">
@import '@/reset.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
