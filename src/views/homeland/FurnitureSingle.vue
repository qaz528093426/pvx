<template>
    <div class="v-homeland-furniture">
        <div class="u-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="u-links">
                <a class="u-link u-item" :href="getLink('item', item_id)" target="_blank"><i class="el-icon-collection-tag"></i>物品信息</a>
            </div>
        </div>

        <div class="m-infoBox flex">
            <div class="u-infoImg">
                <img :src="formatImg(item.Path)" alt="" />
                <div class="u-price"><i></i>15000</div>
            </div>

            <div class="u-info-card">
                <div class="u-title">
                    {{ item.szName }}
                    <span class="mr20"><span class="u-label">可交互：</span><i :class="item.bInteract ? 'el-icon-check' : 'el-icon-close'"></i></span>
                </div>
                <div class="u-info" v-html="description_filter(item.szTip)"></div>
                <div class="u-nature">
                    <span class="mr20"><span class="u-label u-blue">观赏</span>{{ item.Attribute1 }}</span>
                    <span class="mr20"><span class="u-label u-pink">实用</span>{{ item.Attribute2 }}</span>
                    <span class="mr20"><span class="u-label u-yellow">坚固</span>{{ item.Attribute3 }}</span>
                    <span class="mr20"><span class="u-label u-green">风水</span>{{ item.Attribute4 }}</span>
                    <span class="mr20"><span class="u-label u-purple">趣味</span>{{ item.Attribute5 }}</span>
                </div>
                <div class="u-other">
					<div class="u-meta"><span class="u-meta-label">物品来源</span><span class="u-meta-value"></span></div>
					<div class="u-meta"><span class="u-meta-label">要求等级</span><span class="u-meta-value"></span></div>
					<div class="u-meta"><span class="u-meta-label">可染色</span><span class="u-meta-value"></span></div>
                </div>

                <div class="m-buttons">
                    <!-- 加入清单 -->
                    <el-popover class="u-plansBox" placement="bottom" width="160" v-model="addPlans" trigger="manual">
                        <!-- <div class="u-myPlans" v-for="(item, index) in myPlansList" :key="index" @click="addMyPlans(item)">
							<i class="el-icon-caret-right"></i>
							<span>{{ item.title }}</span>
						</div> -->
                        <el-button type="success" size="mini" plain class="u-add-to-item-list" slot="reference" disabled>
                            <i class="u-el-icon el-icon-shopping-cart-full"></i>
                            <span class="u-text">加入清单</span>
                        </el-button>
                    </el-popover>
                    <!-- 收藏按钮 -->
                    <!-- <Fav class="u-collect" post-type="furniture" :post-id="id" /> -->
                </div>
            </div>
        </div>

        <div class="m-luYuan">
            <div class="u-title"><span class="u-name">庐远广记</span><span class="u-label">回廊九曲·江南</span></div>
            <div class="u-box">
                <div class="u-score"><span>评分：</span> <el-rate class="u-star" v-model="star" disabled></el-rate></div>
                <div class="m-fetters-list"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLink, iconLink } from "@jx3box/jx3box-common/js/utils";
import { getFurnitureDetail } from "@/service/furniture.js";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "FurnitureSingle",
    props: [],
    components: {},
    data: function () {
        return {
            addPlans: false,
            star: 1,
            item: [],
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        item_id: function () {
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
        formatImg(link) {
            if (!link) return;
            let img = link.match(/.*[\/,\\](.*?).tga/);
            link = link.replace(/\\/g, "/").split(img[1]);
            let nLink = link[0].split("Homeland");

            if (img[1] == "default") return __iconPath + "pvx/furniture/default/default.png";
            return __iconPath + "pvx/furniture" + nLink[1] + img[1] + ".png";
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        getData() {
            getFurnitureDetail(this.id).then((res) => {
                this.item = res.data;
                console.log(this.item);
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
