<template>
    <div class="v-pet-list">
        <div class="m-pet-listGuide flex">
            <!-- <img src="../../assets/img/petbg.png" class="u-bg" />
            <div class="guideTil flex">
                <img src="../../assets/img/pettitle.png" />
                <img src="../../assets/img/boxlogo.png" />
            </div> -->
            <div class="screen flex">
                <div class="select flex">
                    <el-radio-group v-model="petTypeNum" v-if="false">
                        <el-radio v-for="item in petType" :key="item.type" :label="item.type">{{ item.name }}</el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="petSourceNum" v-else>
                        <el-radio v-for="item in petSource" :key="item.source" :label="item.source">{{ item.name }}</el-radio>
                    </el-radio-group>
                </div>
                <div class="search flex">
                    <el-input placeholder="输入宠物名字搜索" v-model="keyword" clearable></el-input>
                </div>
            </div>
        </div>
        <div class="listContent flex">
            <div class="listItemA" v-for="count in 5" :key="count">
                <img src="https://icon.jx3box.com/pvx/pet/images/kp_%E5%93%92%E5%93%92%E5%93%92.png" class="petImg" />
                <span class="flex">哒哒哒</span>
            </div>
            <div class="listItemB" v-for="count in 5" :key="count">
                <img src="https://icon.jx3box.com/pvx/pet/images/kp_幽明录.png" class="petImg" />
                <img src="https://icon.jx3box.com/pvx/pet/frame/purpleborder.png" class="petFrame" />
                <div class="grayStar flex">
                    <img src="https://icon.jx3box.com/pvx/pet/misc/newpets-81.png" v-for="count in 5" :key="count" />
                </div>
                <div class="goldStar flex">
                    <img src="https://icon.jx3box.com/pvx/pet/misc/newpets-18.png" v-for="count in 4" :key="count" />
                </div>
                <div class="score flex">43</div>
                <span>幽明录</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getPosts } from "@/service/post";
import adventureClass from "../../assets/data/adventure_class.json";
import petType from "../../assets/data/pet_type.json";
import petSource from "../../assets/data/pet_source.json";
export default {
    name: "PetList",
    props: [],
    components: {},
    data: function () {
        return {
            petType,
            petSource,
            adventureClass,
            petTypeNum: 0,
            petSourceNum: 0,
            adventureClassNum: 0,
            keyword: "",
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 加载数据
        getPetList: function () {},
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.getPetList();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/list.less";
</style>
