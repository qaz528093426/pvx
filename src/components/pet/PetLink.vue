<template>
    <div class="v-pet-listItemB" @click="goSingle">
        <!--宠物卡片图-->
        <img :src="getBgPath(petObject.BgPath)" class="v-pet-petImg" />
        <!--宠物边框图-->
        <img :src="getFrame(petObject.Quality)" class="v-pet-petFrame" />
        <!--固定灰色星星贴图-->
        <div class="v-pet-grayStar flex">
            <i class="v-pet-grayStarImg" v-for="count in 5" :key="count"></i>
        </div>
        <!--福源-->
        <i class="v-pet-lucky" v-if="getLucky(petObject.Index)"></i>
        <!--宠物星级-->
        <div class="v-pet-goldStar flex">
            <i
                class="v-pet-goldStarImg"
                v-for="count in petObject.Star"
                :key="count"
            ></i>
        </div>
        <div class="v-pet-score flex">
            {{ petObject.Score ? petObject.Score : "？" }}
        </div>
        <span>{{ petObject.Name }}</span>
    </div>
</template>

<script>
import Lucky from "@/assets/data/pet_lucky.json";
export default {
    props: {
        petObject: {},
        lucky: {},
    },
    data: function () {
        return {};
    },
    methods: {
        // 获取宠物图片路径
        getBgPath: function (path) {
            if (path.indexOf("\\") != -1) {
                const imgName = path.match(/.*\\(.*?).tga/);
                if (imgName[1] == "kp_WJ_运输机甲001") {
                    //bugfix:该宠物接口中的图片名和仓库中不符合 临时做替换
                    imgName[1] = "kp_wj_运输机甲001";
                }
                return (
                    "https://icon.jx3box.com/pvx/pet/images/" +
                    imgName[1] +
                    ".png"
                );
            } else if (path.indexOf("/") != -1) {
                //bugfix:有些宠物接口的图片路径格式为正斜杠 重新写一组正则
                const imgName = path.match(/.*\/(.*?).tga/);
                return (
                    "https://icon.jx3box.com/pvx/pet/images/" +
                    imgName[1] +
                    ".png"
                );
            }
        },
        // 获取宠物边框图片路径
        getFrame: function (quality) {
            let frameName = "";
            if (quality) {
                switch (quality) {
                    case 2:
                        frameName = "/greenborder.png";
                        break;
                    case 3:
                        frameName = "/blueborder.png";
                        break;
                    case 4:
                        frameName = "/purpleborder.png";
                        break;
                    case 5:
                        frameName = "/purpleborder.png";
                        break;
                }
                return "https://icon.jx3box.com/pvx/pet/frame" + frameName;
            }
        },
        // 判断福缘
        getLucky: function (index) {
            if(this.lucky.indexOf(index.toString()) != -1){
                return true
            }else{
                return false
            }
        },
        goSingle() {
            this.$router.push({ name: 'single', params: { id: this.petObject.Index } })
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/item.less";
</style>
