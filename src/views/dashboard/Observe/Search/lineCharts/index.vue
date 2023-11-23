<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <svg t="1687552581436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" width="26" height="26"><path d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z" fill="#707070" p-id="2390"></path></svg>
        </div>
        <div class="main">
            <span class="main-title">12321</span>
            <span class="main-content">17.1</span>
            <svg t="1687557627769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3481" width="16" height="16"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="3482"></path></svg>
            <svg t="1687557685156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4672" width="16" height="16"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#1afa29" p-id="4673"></path></svg>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
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
                        color:"blue"
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
                                    color:'blue'
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
.header{
    display:flex;
    align-items:center;
}
.search-header{
    margin-right:10px
}
.main{
    margin:10px 0px
}
.main-title{
    margin-right:30px
}
.main-content{
    margin-right:10px
}
.charts{
    width:100%;
    height:50px
}
</style>