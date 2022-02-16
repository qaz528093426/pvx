<template>
    <div class="m-fetters">
        <!-- 羁绊信息 -->
        <div class="m-fetters-title">
            <div class="u-title"><i class="el-icon-star-on"></i>{{ info.Name }}</div>
            <div class="u-desc">{{ showPetterDesc(info.Des) }}</div>
        </div>

        <div class="m-fetters-list">
            <router-link class="u-fetter" v-for="pet in info.petList" :key="pet.Index" :to="'/pet/' + pet.Index">
                <i class="u-fetter-icon" :class="['u-quality-' + pet.Quality, { isActive: pet.Index == id }]"><img :src="iconLink(pet.IconID)" /></i>
                <!-- <jx3-item-simple class="u-pet-icon" :item="pet.item" only-icon="true" icon-size="48px" /> -->
                <span class="u-fetter-name">{{ pet.Name }}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { iconLink, extractTextContent } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Fetters",
    props: ["info"],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
    },
    methods: {
        // 获取宠物图片路径
        getImgSrc: function (path) {
            if (path) {
                let img_name = path.match(/.*[\/,\\](.*?).tga/);
                return __iconPath + "pvx/pet/images/" + img_name[1] + ".png";
            }
        },
        // 宠物链接跳转
        getLink(pet_id) {
            if (pet_id == this.$route.params.id) return;
            this.$router.push({ name: "single", params: { id: pet_id } });
        },
        iconLink,
        // 显示羁绊介绍
        showPetterDesc: function (str) {
            let result = extractTextContent(str);
            return result[0]["text"];
        },
        // TODO:增加羁绊宠物浮层
        // ItemTabIndex : 22538
        // ItemTabType: 8
    },
};
</script>
<style lang="less">
@import "~@/assets/css/pet/fetter.less";
</style>
