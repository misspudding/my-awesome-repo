<template>
  <div class="cash-flow-chart">
    <div ref="cashFlowChart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>

export default {
  props:{
    // cashFlowData:{
    //   type:Object,
    //   default(){
    //     return {}
    //   }
    // }
  },
  data() {
    return {
      cashFlowObj:null,
      currentDate: '', // 用于存储格式化的当前日期
      currentMonth:'',
      cashFlowData: [
        { name: '计划现金流', value: 0 },
        { name: '实际现金流', value: 0 }
      ]
    };
  },
  watch:{
    // obj: {
    //   handler(newValue) {
    //     if (Object.keys(newValue).length > 0) {
    //       console.log('Object is not empty');
    //     }
    //   },
    //   immediate:true,
    //   deep: true // 如果需要深度监听对象内部属性的变化
    // }
  },
  methods: {
    getCurrentDate() {
      const date = new Date(); // 获取当前日期
      const monthNames = [
        "1月", "2月", "3月", "4月", "5月", "6月",
        "7月", "8月", "9月", "10月", "11月", "12月"
      ];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];

      // 拼接月和日
      const currentDate = `${month}${day}日`;
      console.log(currentDate); // 输出格式化的日期，例如：三月 15日

      // 在 Element UI 中，您可能需要将当前日期设置到某个组件中，或者用于其他逻辑
      // 例如，设置到 data 对象中
      this.currentDate = currentDate;
      this.currentMonth = month
    },
    renderCashFlowChart() {
      const _this = this
      const chartDom = this.$refs.cashFlowChart;
      const myChart = this.$echarts.init(chartDom);
      this.cashFlowObj = myChart

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[0].color + '"></span>';
            return `${colorDot}${_this.cashFlowData[params[0].dataIndex].name}: ${params[0].value}`;
          }
        },
        title: {
          text: '截至 ' + this.currentMonth +' 公司现金流入',
          left: 'center'
        },
        legend: {
          // data: ['计划现金流', '实际现金流']
          orient: 'vertical',
          left: 'left',
          data: this.cashFlowData.map(item => item.name),
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          // data: this.cashFlowData,
          data: this.cashFlowData.map(item => item.name),
          axisTick: {
            show: false // 隐藏X轴上的刻度线
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#efefef', // 修改y轴线颜色
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            show: true,
            fontSize: 18,
            color: '#000' // 设置y轴刻度标签的字体颜色为黑色

          }

        },
        xAxis: {
          type: 'value',
          show:false
        },
        series: [
          {
            name: '现金流',
            type: 'bar',
            barWidth: '45%', // 设置柱状图的宽度
            barGap: '30%', // 设置柱子之间的间距
            barCategoryGap: '20%', // 设置不同类别之间的间距
            data: this.cashFlowData.map(item => {
              return {
                value: item.value,
                // 为每个数据点添加 label 配置
                label: {
                  normal: {
                    show: item.value !== 0, // 如果值为 0，则不显示标签
                    position: 'insideRight',
                    align: 'right',
                    verticalAlign: 'middle',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    formatter: function(params) {
                      // params.value 是标签要显示的原始数值
                      // 在数值后面添加空格来创建“padding”效果
                      // 例如，添加30个空格来模拟 padding-right: 30px;
                      return params.value + ' '.repeat(5);
                    }
                  }
                }
              };
            }),
            itemStyle: {
              color: function(params) {
                // 根据数据点的索引或其他属性动态设置颜色
                if (params.dataIndex === 0) {
                  return '#5c9ad5'; // 第一个数据点的颜色
                } else if (params.dataIndex === 1) {
                  return '#ec7e31'; // 第二个数据点的颜色
                }
                // 可以根据需要添加更多条件
              }
            },
            // label: {
            //   normal: {
            //     show: item.value !== 0,
            //     position: 'insideRight',
            //     align: 'right',
            //     verticalAlign: 'middle',
            //     fontSize: 16,
            //     fontWeight: 'bold',
            //     color: '#fff',
            //     formatter: function(params) {
            //       // params.value 是标签要显示的原始数值
            //       // 在数值后面添加空格来创建“padding”效果
            //       // 例如，添加30个空格来模拟 padding-right: 30px;
            //       return params.value + ' '.repeat(5);
            //     }
            //   }
            // }
          }

        ]
      };

      myChart.setOption(option);
    },
    resizeChart() {
      // 调用 ECharts 实例的 resize 方法来适应容器大小
      if (this.cashFlowObj) {
        this.cashFlowObj.resize();
      }
    }
  },
  mounted() {

    this.$nextTick(()=>{
      this.getCurrentDate();
      this.renderCashFlowChart();
      window.addEventListener('resize', this.resizeChart);
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart);
  }
};
</script>

<style scoped>
.cash-flow-chart {
  width: 100%;
}
</style>
