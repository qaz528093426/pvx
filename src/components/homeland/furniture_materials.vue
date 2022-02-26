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
           data : '',
           loading : false,
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
           this.loading = true
           getFurnitureMaterials(this.id).then((res) => {
               this.data = res.data
           }).finally(() => {
               this.loading = false
           })
       }
   },
   created:function(){},
}
</script>

<style scoped lang="less">
    
</style>