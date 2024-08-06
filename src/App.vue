<template>
  <div id="app">
    <div>
      <router-link to="/firstTable">firstTable</router-link>
      <router-link to="/firstTableView">firstTableView</router-link>
      <router-view></router-view>
      <!-- <first-table></first-table> -->
    </div>
  </div>
</template>

<script>
// import FirstTable from './components/firstTable.vue'


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
