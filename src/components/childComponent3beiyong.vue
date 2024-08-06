<template>
  <div class="chart-container">
    <div ref="echartIncome" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {

  data(){
    return {
      echartIncome:null,
      incomeData: {
        category: ['运维长协', '专项合同', '运维长协', '专项合同','运维长协', '专项合同','运维长协', '专项合同','运维长协', '专项合同','运维长协', '专项合同','运维长协', '专项合同','总计'],
        allYear: [300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 600258],
        income: [338129, 947, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 300129, 339076]
      }

    }
  },
  methods:{
    initEchartIncome() {
      const echartIncome = this.$refs.echartIncome;
      const myChart = this.$echarts.init(echartIncome);
      this.echartIncome = myChart

      const { category, allYear, income } = this.incomeData;

      const option = {
        title: {
          text: '公司经营收入完成情况',
          left: 'center'
        },
        legend: {
          show: true,
          orient: 'horizontal', // 图例布局方式，'horizontal'为水平
          icon: 'square',
          left: 'center',        // 图例位置的水平对齐方式
          top: 'bottom',         // 图例位置的垂直对齐方式
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
            show: false // 隐藏X轴上的刻度线
          },
        },
        yAxis: {
          type: 'value',
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            handleSize: '100%'
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: '全年收入计划',
            type: 'bar',
            data: allYear,
            barWidth: '40%',
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#5c9ad5' // 系列颜色
              }
            }
          },
          {
            name: '累计确认收入',
            type: 'bar',
            data: income,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#ec7e31' // 系列颜色
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
    },

    resizeChart() {
      // 调用 ECharts 实例的 resize 方法来适应容器大小
      if (this.echartIncome) {
        this.echartIncome.resize();
      }
    }

  },
  mounted() {
    this.$nextTick(()=>{
      this.initEchartIncome()
      window.addEventListener('resize', this.resizeChart);
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart);
  }

};
</script>
<style scoped lang="scss">
.chart-container {
  margin: 20px;
  height: 400px;
  color: rgb(92,154,213);
}


</style>