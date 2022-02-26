<template>
    <div class="m-furniture-materials" v-loading="loading">

    </div>
</template>

<script>
import {getFurnitureMaterials} from '@/service/furniture.js'
export default {
   name : 'furnitureMaterials',
   props:['id'],
   components : {},
   data : function(){
       return {
           data : ''
       }
   },
   computed:{},
   watch:{
       id : {
           immediate : true,
           handler : function (val){
               val && this.loadData()
           }
       }
   },
   methods:{
       loadData : function (){
           getFurnitureMaterials(this.id).then((res) => {
               this.data = res.data
           })
       }
   },
   created:function(){},
}
</script>

<style scoped lang="less">
    
</style>