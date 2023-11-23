import request from '@/utils/request'

//获取spu列表数据的接口
export const reqSpuList = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu信息
export const reqSpu = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取品牌的信息
export const reqTradeMarkList = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

//获取spu图标的接口
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取平台全部销售属性---整个平台销售属性一共三个
export const reqBaseSaleAttrList = ()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})

//修改spu/添加spu：对于修改或者添加，携带给服务器的参数大致一样，唯一的区别就是携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo)=>{
    //携带的参数带有id---修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        //携带的参数不带id---添加spu
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}

//删除spu
export const reqDeleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

//添加sku
export const reqAddSku = (skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})

//获取sku列表数据的接口
export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})