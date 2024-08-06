<template>
  <div>
    <div ref="chartContainer" class="chart-container">
      <div ref="echartIncome" class="echart"></div>
    </div>

    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in filteredOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>

</template>

<script>
import decimal from 'decimal.js';
import DepartmentOptionsMixin from '@/constants/DepartmentOptionsMixin.js'
export default {
  mixins: [DepartmentOptionsMixin],
  data() {
    return {




      echartIncome: null,
      num:new decimal(0.51235),
      num2:new decimal(0.127),
      incomeData: {
        category: ['运维长协', '专项合同', '运维长协', '专项合同', '运维长协', '专项合同', '运维长协', '专项合同', '运维长协', '专项合同', '运维长协', '专项合同', '运维长协', '专项合同', '总计'],
        allYear: [300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 600258],
        income: [338129, 947, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 339076]
      }
    };
  },
  methods: {
    initEchartIncome() {
      const echartIncome = this.$refs.echartIncome;
      const myChart = this.$echarts.init(echartIncome);
      this.echartIncome = myChart;

      const { category, allYear, income } = this.incomeData;

      const option = {
        title: {
          text: '公司经营收入完成情况',
          left: 'center'
        },
        legend: {
          show: true,
          orient: 'horizontal',
          icon: 'square',
          left: 'center',
          top: 'bottom',
          padding: [40, 20, 0, 20],
          data: ['全年收入计划', '累计确认收入']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: category,
          axisTick: {
            show: false
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '全年收入计划',
            type: 'bar',
            data: allYear,
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#5c9ad5'
              }
            }
          },
          {
            name: '累计确认收入',
            type: 'bar',
            data: income,
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#ec7e31'
              }
            }
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true,
        }
      };

      myChart.setOption(option);

      // 动态调整图表宽度
      this.adjustChartWidth();
    },

    adjustChartWidth() {
      const echartIncome = this.$refs.echartIncome;
      const baseWidth = 80; // 每个条形的基础宽度，可以根据需要调整
      const minChartWidth = this.incomeData.category.length * baseWidth;

      echartIncome.style.minWidth = `${minChartWidth}px`;
      this.resizeChart();
    },

    resizeChart() {
      if (this.echartIncome) {
        const container = this.$refs.chartContainer;
        const containerWidth = container.clientWidth;
        const baseWidth = 80; // 每个条形的基础宽度，可以根据需要调整
        const minChartWidth = this.incomeData.category.length * baseWidth;

        if (containerWidth > minChartWidth) {
          this.$refs.echartIncome.style.width = '100%';
          container.style.overflow = 'hidden';
        } else {
          this.$refs.echartIncome.style.width = `${minChartWidth}px`;
          container.style.overflowX = 'auto';
          container.style.overflowY = 'hidden';
        }
        this.echartIncome.resize();
      }
    },

    getTotal(){
      return  this.num.plus(this.num2).toFixed(2);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchartIncome();
      window.addEventListener('resize', this.resizeChart);
    });
    this.getTotal()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
  }
};
</script>

<style scoped lang="scss">
.chart-container {
  margin: 20px;
  height: 400px;
  overflow: hidden; /* 初始状态为隐藏滚动条 */
}

.echart {
  height: 100%; /* 确保图表高度为容器高度 */
}
</style>
