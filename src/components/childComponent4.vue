<template>

  <div>
    <div class="chart-container">
      <div ref="echartIncome" style="width: 100%; height: 400px;"></div>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="center" label="业务中心">
          <template slot-scope="{ row }">
            <div class="cell-content">
              <div v-if="row.type === 'blue'" class="color-block"></div>
              <div v-if="row.type === 'orange'" class="color-block orange"></div>
              {{ row.center }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备件" align="center">
          <template slot-scope="{ row }">{{ row.revenue1 }}</template>
        </el-table-column>
        <el-table-column label="备件" align="center">
          <template slot-scope="{ row }">{{ row.revenue2 }}</template>
        </el-table-column>
        <el-table-column label="重大办" align="center">
          <template slot-scope="{ row }">{{ row.revenue3 }}</template>
        </el-table-column>
        <el-table-column label="培训" align="center">
          <template slot-scope="{ row }">{{ row.revenue4 }}</template>
        </el-table-column>
        <el-table-column label="招管" align="center">
          <template slot-scope="{ row }">{{ row.revenue5 }}</template>
        </el-table-column>
        <el-table-column label="核安监" align="center">
          <template slot-scope="{ row }">{{ row.revenue6 }}</template>
        </el-table-column>
        <el-table-column label="核应急" align="center">
          <template slot-scope="{ row }">{{ row.revenue7 }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    incomeData:{
      type:Object,
      default: () => ({
        category:[],
        allYear:[],
        income:[]
      }),
    }
  },
  data(){
    return {
      echartIncome:null,
      // incomeData: {
      //   category: ['大修', '备件', '重大办', '培训', '招管', '核安监', '核应急'],
      //   allYear: [95000.56, 58000.30, 78000.26, 35000.55, 32000.36, 25000.45, 15000.98],
      //   income: [28000.32, 18000.23, 24000.69, 15000.65, 12000.88, 5800.24, 6500.33]
      // },
      tableData: [
        { type: 'blue',center: '计划收入（含税）', revenue1: '1000', revenue2: '1500', revenue3: '2000' ,revenue4: '2000' ,revenue5: '2000' ,revenue6: '2000' ,revenue7: '2000' },
        { type: 'orange',center: '已确认收入（含税）', revenue1: '800', revenue2: '1200', revenue3: '1800' ,revenue4: '2000' ,revenue5: '2000' ,revenue6: '2000' ,revenue7: '2000' },
        { center: '百分比', revenue1: '80%', revenue2: '80%', revenue3: '90%' ,revenue4: '90%',revenue5: '90%',revenue6: '90%',revenue7: '90%'}
      ]

    }
  },
  methods:{
    initData(){
      //把数组改成我们想要的对象数据
      const array = [100, 200, 300, 100, 300, 500, 100];
      const keyPrefix = 'val';
      const result = {};

      array.forEach((val, index) => {
        result[keyPrefix + (index + 1)] = val;
      });

      console.log({type:'blue',center:'计划收入（含税）',...result});

    },
    initEchartIncome() {
      const echartIncome = this.$refs.echartIncome;
      const myChart = this.$echarts.init(echartIncome);
      this.echartIncome = myChart

      const { category, allYear, income } = this.incomeData;

      const option = {
        title: {
          text: '业务中心收入对比',
          left: 'center'
        },
        legend: {
          show: true,
          orient: 'horizontal', // 图例布局方式，'horizontal'为水平
          icon: 'square',
          left: 'center',        // 图例位置的水平对齐方式
          top: 'bottom',         // 图例位置的垂直对齐方式
          padding: [40, 20, 0, 20],
          data: ['计划收入 (含税)', '已确认收入（含税）']
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
        series: [
          {
            name: '计划收入 (含税)',
            type: 'bar',
            data: allYear,
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#5c9ad5' // 系列颜色
              }
            }
          },
          {
            name: '已确认收入（含税）',
            type: 'bar',
            data: income,
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


    disposeEchart() {
      // 销毁 EChart 实例
      if (this.echartIncome) {
        this.echartIncome.dispose();
        this.echartIncome = null;
      }
    },

    resizeChart() {

      // console.log('12121')
      // console.log('1212121212',this.echartIncome.resize())
      // 调用 ECharts 实例的 resize 方法来适应容器大小
      if (this.echartIncome) {
        this.echartIncome.resize();
      }
    }

  },
  mounted() {
    this.initData()
    this.$nextTick(()=>{
      this.initEchartIncome()
      window.addEventListener('resize', this.resizeChart);
    })
  },
  beforeDestroy() {
    this.disposeEchart();
    window.removeEventListener('resize', this.resizeChart);
  },
  activated() { // 当标签页变为可见时触发
    this.resizeChart();
  },
  deactivated() { // 当标签页变为不可见时触发

    this.disposeEchart();
  },

};
</script>
<style scoped lang="scss">
.chart-container {
  margin: 20px;
  height: 400px;
  color: rgb(92,154,213);
}
.table-container {
  width: 100%;
  max-width: 100%;
}
.cell-content {
  display: flex;
  align-items: center;
}

.color-block {
  width: 10px;
  height: 10px;
  background-color: #5c9ad5;
  margin-right: 5px;
  &.orange{
    background-color: #ec7e31;
  }
}
</style>