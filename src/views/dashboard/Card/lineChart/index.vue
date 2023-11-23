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
                    type:'line',
                    data:[10,7,33,12,88,9,48,55,70,16,20],
                    //拐点样式设置
                    itemStyle:{
                        opacity:0
                    },
                    //线条的样式
                    lineStyle:{
                        color:"purple"
                    },
                    //填充颜色设置
                    areaStyle:{
                        color:{
                            type:'linear',
                            x:0,
                            y:0,
                            x2:0,
                            y2:1,
                            colorStops:[
                                {
                                    offset:0,
                                    color:'purple'
                                },
                                {
                                    offset:1,
                                    color:'#fff'
                                }
                            ],
                            global:false
                        }
                    }
                }
            ],
            //布局调试
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            }
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