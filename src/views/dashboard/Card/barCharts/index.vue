<template>
    <div class="charts" ref="charts">
        
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',

    data() {
        return {
            
        };
    },

    mounted() {
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        //配置数据
        lineCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false,
            },
            series:[
                {
                    type:'bar',
                    data:[10,7,33,12,88,9,48,55,70,16,20,38],
                }
            ],
            //布局调试
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            },
            tooltip:{}
        })
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.charts{
    width:100%;
    height:100%
}
</style>