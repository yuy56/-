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
                min:0,
                max:100
            },
            yAxis:{
                show:false,
                type:'category'
            },
            series:[
                {
                    type:'bar',
                    data:[78],
                    barWidth:10,
                    color:'yellowgreen',
                    //背景颜色设置
                    showBackground:true,
                    backgroundStyle:{
                        color:"#eee"
                    },
                    //文本标签位置调试
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right'
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