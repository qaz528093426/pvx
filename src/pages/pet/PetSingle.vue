<template>
    <div class="v-pet-single">
        <div class="v-pet-panel flex">
            <petCard :petObject="pet"></petCard>
            <div class="v-pet-info flex">
                <div class="v-pet-skill flex">
                    <img src="" >
                </div>
                <div class="v-pet-orange">{{getPetType(pet.Class)}} · {{getPetSource(pet.Source)}}</div>
                <div><i class="el-icon-star-off" v-for="count in pet.Star" :key="count"></i></div>
                <div>宠物积分：{{pet.Score}}</div>
                <div>宠物说明：{{getPetDesc(pet.Desc)}}</div>
                <div class="v-pet-orange">{{getPetDesc(pet.OutputDes)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPet } from "@/service/pet";
import { getPetSkill } from "@/service/pet";
import petCard from "@/components/pet/PetCard.vue";
import petType from "@/assets/data/pet_type.json";
import petSource from "@/assets/data/pet_source.json";
export default {
    name: "PetSingle",
    props: [],
    components: {
        petCard,
    },
    data: function () {
        return {
            petType,
            petSource,
            pet: {},
            skill:null,
        };
    },
    computed: {
        id : function (){
            return this.$route.params.id
        }
    },
    watch: {},
    methods: {
        // 获取宠物详情
        getPetInfo: function () {
            getPet(this.id).then((res) => {
                this.pet = res.data;
            });
        },
        // 获取宠物技能信息
        getSkillInfo: function () {
            getPetSkill(this.id).then((res) => {
            });         
        },
        // 获取宠物种类
        getPetType: function (typeId) {
            for(let i=0;i<this.petType.length;i++){
                if(typeId == this.petType[i].class){
                    return this.petType[i].name
                }
            }
        },
        // 获取宠物途径
        getPetSource: function (sourceId) {
            for(let i=0;i<this.petSource.length;i++){
                if(sourceId == this.petSource[i].source){
                    return this.petSource[i].name
                }
            }
        },
        // 获取宠物描述
        getPetDesc: function (desc) {
            return desc.split('"')[1]
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.getPetInfo();
        this.getSkillInfo();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/single.less";
</style>