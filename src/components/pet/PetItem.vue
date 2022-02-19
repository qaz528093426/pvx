<template>
    <router-link class="m-pet-item" :to="'/' + petObject.Index">
        <!--  @click="getLink(petObject.Index)" -->
        <!--宠物卡片图-->
        <img :src="getImgSrc(petObject.BgPath)" class="u-image" />
        <!--宠物边框图-->
        <img :src="getFrameSrc(petObject.Quality)" class="u-frame" />
        <!-- 宠物星级 -->
        <div class="u-stars">
            <i class="u-star" :class="'u-star-' + petObject.Star"></i>
        </div>
        <!--福缘-->
        <i class="u-lucky" v-if="getLucky(petObject.Index)"></i>
        <!--分数-->
        <div class="u-score flex">
            {{ petObject.Score || "？" }}
        </div>
        <span class="u-name">{{ petObject.Name }}</span>
    </router-link>
</template>

<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
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
        getImgSrc: function (path) {
            let img_name = path.match(/.*[\/,\\](.*?).tga/);
            return __iconPath + "pvx/pet/images/" + img_name[1] + ".png";
        },
        // 获取宠物边框图片路径
        getFrameSrc: function (quality) {
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
                return __iconPath + "pvx/pet/frame" + frameName;
            }
        },
        // 判断福缘
        getLucky: function (index) {
            return this.lucky.indexOf(index.toString()) != -1;
        },
        // 宠物链接
        getLink(pet_id) {
            // return `/pet/${pet_id}`
            this.$router.push({ name: "single", params: { id: pet_id } });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/item.less";
</style>
