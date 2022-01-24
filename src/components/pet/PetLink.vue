<template>
    <a class="v-pet-listItemB" target="_self" :href="'/pet/' + petObject.Index">
        <!--宠物卡片图-->
        <img :src="getBgPath(petObject.BgPath)" class="v-pet-petImg" />
        <!--宠物边框图-->
        <img :src="getFrame(petObject.Quality)" class="v-pet-petFrame" />
        <!--固定灰色星星贴图-->
        <div class="v-pet-grayStar flex">
            <img src="https://icon.jx3box.com/pvx/pet/misc/newpets-81.png" v-for="count in 5" :key="count" />
        </div>
        <!--宠物星级-->
        <div class="v-pet-goldStar flex">
            <img src="https://icon.jx3box.com/pvx/pet/misc/newpets-18.png" v-for="count in petObject.Star" :key="count" />
        </div>
        <div class="v-pet-score flex">
            {{ petObject.Score ? petObject.Score : "？" }}
        </div>
        <span>{{ petObject.Name }}</span>
    </a>
</template>

<script>
export default {
    props: {
        petObject: {},
    },
    data: function () {
        return {};
    },
    methods: {
        // 获取宠物图片路径
        getBgPath: function (path) {
            if (path) {
                const imgName = path.match(/.*\\(.*?).tga/);
                if (imgName[1] == "kp_WJ_运输机甲001") {
                    imgName[1] = "kp_wj_运输机甲001";
                }
                return "https://icon.jx3box.com/pvx/pet/images/" + imgName[1] + ".png";
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
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/item.less";
</style>
