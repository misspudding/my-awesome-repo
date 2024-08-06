<template>
  <div>
    <h1 class="page-title">经营合同分布</h1>
    <div class="table-wrapper">
      <div class="column">
        <div class="td"></div>
        <div class="td">专项合同</div>
        <div class="td">长协</div>
      </div>
      <div class="column">
        <div class="td title">执行中合同</div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="column">
        <div class="td title">执行中合同</div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="column">
        <div class="td title">执行中合同</div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="column">
        <div class="td title">执行中合同</div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="chart-item">
        <ring-chart-component title="执行中合同分布" :ringChartData="ringChartData"></ring-chart-component>
      </div>
      <div class="chart-item">
        <ring-chart-component title="签署中合同分布" :ringChartData="ringChartData"></ring-chart-component>
      </div>
      <div class="chart-item">
        <ring-chart-component title="里程碑数量分布" :ringChartData="ringChartData"></ring-chart-component>
      </div>
    </div>
  </div>
</template>

<script>
import ringChartComponent from './ringChartComponent.vue'

export default {
  components: {
    ringChartComponent
  },
  data() {
    return {
      ringChartData: [
        {value: 1, name: '第一条'},
        {value: 1, name: '第二条'},
        {value: 1, name: '第三条'},
        {value: 0, name: '第四条'},
        {value: 1, name: '第五条'},
        {value: 1, name: '第一条'},
        {value: 1, name: '第二条'},
        {value: 1, name: '第三条'},
        {value: 0, name: '第四条'},
        {value: 1, name: '第五条'},
        {value: 1, name: '第一条'},
        {value: 1, name: '第二条'},
        {value: 1, name: '第三条'},
        {value: 0, name: '第四条'},
        {value: 1, name: '第五条'},
        {value: 1, name: '第一条'},
        {value: 1, name: '第二条'},
        {value: 1, name: '第三条'},
        {value: 0, name: '第四条'},
        {value: 1, name: '第五条'},
        {value: 1048, name: 'Search Engine'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'},
        {value: 484, name: 'Union Ads'},
        {value: 300, name: 'Video Ads'}
      ]

    };
  }
};
</script>
<style scoped lang="scss">
.page-title {
  font-weight: 700;
  font-size: 20px;

}

.table-wrapper {
  border: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .column {
    flex: 1;

    .td {
      border-bottom: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      line-height: 40px;
      height: 40px;

      &:last-child {
        border-bottom: none;
      }

      &.title {
        background: rgb(242, 242, 242);
      }
    }

    &:last-child {
      .td {
        border-right: none;
      }

    }

  }
}

.chart-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;

  .chart-item {
    flex: 1;
  }
}

</style>