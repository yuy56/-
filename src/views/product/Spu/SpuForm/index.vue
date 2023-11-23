<template>
    <div>
        <el-form ref="form" label-width="80px" :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <!-- 上传图片，action图片上传的地址，list-type:文件列表的类型
                on-preview：图片预览的时候会触发
                on-remove:当删除图片的时候会触发 -->
                <el-upload
                action="/dev-api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlerSuccess"
                :file-list="spuImageList"
                >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
                    <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
                <el-table style="width:100%" border :data="spu.spuSaleAttrList">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值名称列表" width="width">
                        <template slot-scope="{row}">
                            <el-tag
                            :key="tag.id"
                            v-for="(tag,index) in row.spuSaleAttrValueList"
                            closable
                            :disable-transitions="false"
                            @close="row.spuSaleAttrValueList.splice(index,1)"
                            >
                            {{tag.saleAttrValueName}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="row.inputVisible"
                            v-model="row.inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm(row)"
                            >
                            </el-input>
                            <!-- @click="showInput" -->
                            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: '',

    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            //spu属性初始化的时候是一个空的对象，在修改spu的时候，会像服务器发请求，返回spu信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新数据提交给服务器
            spu:
                {
                    "category3Id": 0,
                    "description": "",
                    "id":'',
                    "spuImageList":  [
                        // {
                        //     "id": 0,
                        //     "imgName": "string",
                        //     "imgUrl": "string",
                        //     "spuId": 0
                        // }
                    ],
                    "spuName": "",
                    "spuSaleAttrList": [
                        // {
                        //     "baseSaleattrId": 0,
                        //     "id": 0,
                        //     "saleAttrName": "string",
                        //     "spuId": 0,
                        //     "spuSaleAttrValueList": [
                        //     {
                        //         "baseSaleattrId": 0,
                        //         "id": 0,
                        //         "isChecked": "string",
                        //         "saleAttrName": "string",
                        //         "saleAttrValueName": "string",
                        //         "spuId": 0
                        //     }
                        //     ]
                        // }
                    ],
                    "tmId":''
                },
            tradeMarkList:[],//存储品牌信息
            spuImageList:[],//存储spu图片数据
            saleAttrList:[],//销售属性的数据
            attrIdAndAttrName:'',//收集未选择的属性的id
        };
    },

    mounted() {
        
    },

    methods: {
        //照片墙删除某一个图片的时候会触发
        handleRemove(file, fileList) {
        //file参数：代表的是删除的那张图片
        //fileList:照片墙删除某一张图片以后，剩余的其他的图片
        //对于已有的图片【照片墙中显示的图片：有name\url字段】
        this.spuImageList=fileList;
      },
      //照片墙图片预览的回调
      handlePictureCardPreview(file) {
        //将图片地址赋值给这个属性
        this.dialogImageUrl = file.url;
        //对话框显示
        this.dialogVisible = true;
      },
      //照片墙图片上传成功的回调
      handlerSuccess(response,file,fileList){
        //收集图片的信息
        this.spuImageList=fileList
      },
      //初始化spuform教程
       async initSpuData(spu){
        //获取SPU信息的数据
        let spuResult = await this.$API.spu.reqSpu(spu.id)
        if(spuResult.code==200){
            this.spu=spuResult.data
        }
        //获取品牌的信息
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
        if(tradeMarkResult.code==200){
            this.tradeMarkList = tradeMarkResult.data
        }
        //获取spu图片的数据
        let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
        if(spuImageResult.code==200){
            let listArr=spuImageResult.data
            listArr.forEach(item=>{
                item.name=item.imgName
                item.url=item.imgUrl
            })
            this.spuImageList = listArr
        }
        //获取平台全部的销售属性
        let saleResult = await this.$API.spu.reqBaseSaleAttrList()
        if(saleResult.code==200){
            this.saleAttrList=saleResult.data
        }
      },
      //添加新的销售属性
      addSaleAttr(){
        //已经收集需要添加的销售属性的信息
        //把收集到的销售属性数据进行分割
        const [baseSaleAttrId,saleAttrName]=this.attrIdAndAttrName.split(':')
        //向spu对象的spuSaleAttrList属性里面添加新的销售属性
        let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
        //添加新的销售属性
        this.spu.spuSaleAttrList.push(newSaleAttr)
        //清空数据
        this.attrIdAndAttrName=''
      },
      //添加按钮的回调
      addSaleAttrValue(row){
        //点击销售属性值当中添加按钮的时候，需要button变为input，通过当前销售属性的inputVisible控制
        this.$set(row,'inputVisible',true)
        //通过响应式数据inputValue字段收集新增的销售属性值
        this.$set(row,'inputValue','')
      },
      //el-input失去焦点的事件
      handleInputConfirm(row){
        const {baseSaleAttrId,inputValue}=row
        //新增属性值的名称不能为空
        if(inputValue.trim()==''){
            this.$message('属性值不能为空')
            return
        }
        //属性值不能重复
        let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
        if(!result){
            this.$message('属性值不能重复')
            return
        } 

        let newSaleAttrValue={baseSaleAttrId,saleAttrValueName:inputValue}
        row.spuSaleAttrValueList.push(newSaleAttrValue)
        row.inputVisible=false
      },
      //保存按钮的回调
      async addOrUpdateSpu(){
        //整理参数：需要整理照片墙的数据
        //携带参数：对于图片，需要携带imageName与imgeUrl字段
        this.spu.spuImageList=this.spuImageList.map(item=>{
            return {
                imageName:item.name,
                imageUrl:(item.response&&item.response.data)||item.url
            }
        })
        //发请求
        let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
        if(result.code==200){
            //提示
            this.$message({type:'success',message:'保存成功'})
            //通知父组件回到场景0
            this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
        }
        Object.assign(this._data,this.$options.data())
      },
      //点击添加spu按钮的时候，发请求的函数
      async addSpuData(category3Id){
        //添加spu的时候收集三级分类的id
        this.spu.category3Id=category3Id
        //获取品牌的信息
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
        if(tradeMarkResult.code==200){
            this.tradeMarkList = tradeMarkResult.data
        }
        //获取平台全部的销售属性
        let saleResult = await this.$API.spu.reqBaseSaleAttrList()
        if(saleResult.code==200){
            this.saleAttrList=saleResult.data
        }
      },
      //取消按钮
      cancel(){
        //取消按钮的回调，通知父亲切换场景为0
        this.$emit('changeScene',{scene:0,flag:''})
        //清理数据
        //object.assign是es6中新增的可以合并对象的方法
        //组件实例this._data可以操作data中的响应式数据
        //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
        Object.assign(this._data,this.$options.data())
      }
    },

    computed:{
        unSelectSaleAttr(){
            let result = this.saleAttrList.filter((item)=>{
                //every数组的方法，会返回一个布尔值【真、假的】
                return this.spu.spuSaleAttrList.every((item1)=>{
                    return item.name!=item1.saleAttrName
                })
            })
            return result
        }
    }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>