<template>
  <div class="chart-container">
    <div ref="ringChart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    ringChartData:{
      type:Array,
      default(){
        return []
      }
    }
  },

  data(){
    return {
      ringChart:null,
    }
  },
  methods:{
    initEchart() {
      const echartObj = this.$refs.ringChart;
      this.ringChart = this.$echarts.init(echartObj);

      const option = {
        title: {
          text: this.title,
          left: 'center',
          top:'5%'
        },
        legend: {
          show: true,
          orient: 'horizontal', // 图例布局方式，'horizontal'为水平
          left: 'center',        // 图例位置的水平对齐方式
          top: 'bottom',         // 图例位置的垂直对齐方式
          padding: [40, 20, 0, 20],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.ringChartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        grid: {
          top:'0%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true,
        }
      };

      this.ringChart.setOption(option);
    },

    resizeChart() {
      // 调用 ECharts 实例的 resize 方法来适应容器大小
      if (this.ringChart) {
        this.ringChart.resize();
      }
    }

  },
  mounted() {
    this.$nextTick(()=>{
      this.initEchart()
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