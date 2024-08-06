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
        month: ['1月', '2月', '3月', '10月', '11月', '12月'],
        actual: [45, 25, 15, 8.16, 4.56, 2.32],
        Objective: [42.3, 35, 38.129, 15, 5, 1]
      }

    }
  },
  methods:{
    initEchartIncome() {
      const echartIncome = this.$refs.echartIncome;
      const myChart = this.$echarts.init(echartIncome);
      this.echartIncome = myChart

      const { month, actual, Objective } = this.incomeData;

      const option = {
        title: {
          text: '公司经营收入完成情况',
          left: 'center'
        },
        legend: {
          show: true,
          orient: 'horizontal', // 图例布局方式，'horizontal'为水平
          left: 'center',        // 图例位置的水平对齐方式
          top: 'bottom',         // 图例位置的垂直对齐方式
          padding: [40, 20, 0, 20],
          data: ['实现值', '目标值']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: month,
          axisTick: {
            show: false // 隐藏X轴上的刻度线
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '实现值',
            type: 'line',
            data: actual,
            itemStyle: {
              normal: {
                color: '#5c9ad5', // 线条颜色，这里设置为红色
                width: 2,          // 线条粗细
                type: 'solid'      // 线条类型，这里设置为实线
              }
            }
          },
          {
            name: '目标值',
            type: 'line',
            data: Objective,
            itemStyle: {
              normal: {
                color: '#f00', // 线条颜色，这里设置为红色
                width: 2,          // 线条粗细
                type: 'solid'      // 线条类型，这里设置为实线
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
}


</style>