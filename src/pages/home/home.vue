<template>
  <div id="main">

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// 引入echarts
import Echarts from "echarts"
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      catelist:"cate/catelist"
    }),
  },
  methods: {
    ...mapActions({
      reqCateListActions:"cate/reqCateListActions"
    }),
  },
  watch:{
    catelist:{
      handler(){
        var myChart = Echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
        var option = {
            title: {
                text: '数据汇总'
            },
            tooltip: {},
            legend: {
                data:['数量']
            },
            xAxis: {
              // map会返回一个新的数组
                data: this.catelist.map(ele=>ele.catename)
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'line',
                // map会返回一个新的数组
                data: this.catelist.map(ele=>ele.children.length)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep:true
    }
  },
  mounted() {
    this.reqCateListActions()
    console.log(this.catelist);
    
  },
};
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
}
</style>