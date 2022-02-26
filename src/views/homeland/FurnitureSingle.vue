<template>
    <div class="v-homeland-furniture">
        <div class="m-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="u-links">
                <a class="u-link u-item" :href="getLink('item', item_id)" target="_blank"><i class="el-icon-collection-tag"></i>物品信息</a>
            </div>
        </div>

        <div class="m-info-box">
            <div class="u-img">
                <img :src="formatImg(item.Path)" :alt="item.szName" />
            </div>

            <div class="u-info">
                <div class="u-info-title">{{ item.szName }}</div>
                <div class="u-nature">
                    <span class="mr20" v-if="item.Attribute1"><span class="u-label u-blue">观赏</span>{{ item.Attribute1 }}</span>
                    <span class="mr20" v-if="item.Attribute2"><span class="u-label u-pink">实用</span>{{ item.Attribute2 }}</span>
                    <span class="mr20" v-if="item.Attribute3"><span class="u-label u-yellow">坚固</span>{{ item.Attribute3 }}</span>
                    <span class="mr20" v-if="item.Attribute4"><span class="u-label u-green">风水</span>{{ item.Attribute4 }}</span>
                    <span class="mr20" v-if="item.Attribute5"><span class="u-label u-purple">趣味</span>{{ item.Attribute5 }}</span>
                </div>
                <div class="u-other">
                    <span class="mr20"><span class="u-label">来源：</span>{{ item.szSource }}</span>
                    <span class="mr20"><span class="u-label">园宅等级：</span>{{ LevelLimit(item.LevelLimit) }}</span>
                    <span class="mr20" v-if="setData"><span class="u-label">套装：</span>{{ setData.szName }}</span>
                    <span class="mr20"><span class="u-label">可交互：</span><i :class="item.bInteract ? 'el-icon-check' : 'el-icon-close'"></i></span>
                    <!-- MaxAmountPerLand -->
                    <!-- szScaleRange -->
                    <span class="mr20"><span class="u-label">可染色：</span><i :class="item.Architecture ? 'el-icon-check' : 'el-icon-close'"></i></span>
                </div>

                <div class="m-buttons">
                    <!-- 收藏按钮 -->
                    <Fav class="u-collect" post-type="furniture" :post-id="id" />
                </div>
            </div>
        </div>
        <div class="u-info-text" v-if="item.szTip">
            <div class="u-title"><span class="u-name">家具介绍</span></div>
            <div class="u-txt" v-html="description_filter(item.szTip)"></div>
        </div>

        <div class="m-luYuan" v-if="setData">
            <div class="u-title">
                <span class="u-name">{{ setData.szName }}</span>
            </div>
            <div class="u-box">
                <div class="u-score"><el-rate class="u-star" v-model="setData.nStars" disabled></el-rate></div>
                <div class="m-fetters-list">
                    <el-popover class="m-popover" v-for="(item, i) in setData.furnitures" :key="i" placement="top-start" width="200" trigger="hover">
                        <div class="u-info">
                            <span class="u-name">{{ item.szName }}</span>
                            <span v-if="item.Attribute1"><span class="u-label u-blue">观赏</span>{{ item.Attribute1 }}</span>
                            <span v-if="item.Attribute2"><span class="u-label u-pink">实用</span>{{ item.Attribute2 }}</span>
                            <span v-if="item.Attribute3"><span class="u-label u-yellow">坚固</span>{{ item.Attribute3 }}</span>
                            <span v-if="item.Attribute4"><span class="u-label u-green">风水</span>{{ item.Attribute4 }}</span>
                            <span v-if="item.Attribute5"><span class="u-label u-purple">趣味</span>{{ item.Attribute5 }}</span>
                            <span><span class="u-label">园宅等级：</span>{{ LevelLimit(item.LevelLimit) }}</span>
                        </div>
                        <router-link class="u-img" :class="quality(item.Quality)" slot="reference" :to="`/${item.dwID}`">
                            <img :src="formatImg(item.Path)" />
                        </router-link>
                    </el-popover>
                </div>
            </div>
        </div>

		<!-- 攻略 -->
        <div class="m-furniture-wiki">
            <Wiki source_type="item" :source_id="item_id" :type="type" :id="id" title="家具攻略"></Wiki>
        </div>

		<!-- 评论 -->
        <div class="m-furniture-comment">
            <Comment :id="id" :category="type" order="desc" />
        </div>
    </div>
</template>

<script>
import { getLink, iconLink } from "@jx3box/jx3box-common/js/utils";
import { getFurnitureDetail, getSetList } from "@/service/furniture.js";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { levelList } from "@/assets/data/furniture.json";

import Wiki from "@/components/wiki/Wiki.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

import { postStat } from "@jx3box/jx3box-common/js/stat.js";

export default {
    name: "FurnitureSingle",
    props: [],
    components: {
		Wiki,
        Comment,
	},
    data: function () {
        return {
			type : 'furniture',
            addPlans: false,
            star: 1,
            item: [],
            setData: "",
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        item_id: function () {
            // TODO: 修改物品ID
            return this.pet?.ItemTabType + "_" + this.pet?.ItemTabIndex;
        },
        achievement_id: function () {
            return this.petWiki?.achievement_id;
        },
    },
    watch: {},
    methods: {
        getLink,
        iconLink,
        // 描述过滤
        description_filter(value) {
            let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
            if (matchs && matchs.length > 1) value = matchs[1].trim();
            if (value) value = value.replace(/\\n/g, "<br>");
            return value;
        },
        // 图片链接转换
        formatImg(link) {
            if (!link) return;
            let img = link.match(/.*[\/,\\](.*?).tga/);
            link = link.replace(/\\/g, "/").split(img[1]);
            let nLink = link[0].split("Homeland");

            if (img[1] == "default") return __iconPath + "pvx/furniture/default/default.png";
            return __iconPath + "pvx/furniture" + nLink[1] + img[1] + ".png";
        },
        // 园宅等级
        LevelLimit: function (id) {
            for (const key in levelList) {
                if (key == id) {
                    return levelList[key].name;
                }
            }
            return "";
        },
        quality: function (id) {
            return id ? "quality_" + id : "";
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        getData() {
            getFurnitureDetail(this.id).then((res) => {
                this.item = res.data;
                if (res.data.SetID)
                    getSetList(res.data.SetID).then((res) => {
                        this.setData = res.data;
                        console.log(this.item, this.setData);
                    });

				// 发送统计
                postStat(this.type, this.id);
            });
        },
    },
    created: function () {
        this.getData();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/single.less";
</style>
