<template>
    <div class="v-pet-single">
        <div class="m-pet-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="m-pet-links">
                <a class="u-link u-item" :href="getLink('item', item_id)"><i class="el-icon-collection-tag"></i>物品信息</a>
                <template v-if="achievement_id">
                    <em> | </em>
                    <a class="u-link u-achievement" :href="getLink('cj', achievement_id)"><i class="el-icon-trophy"></i>成就信息</a>
                </template>
            </div>
        </div>
        <div class="m-pet-content flex">
            <petCard :petObject="pet" :lucky="luckyList"></petCard>
            <div class="m-pet-info">
                <h1 class="u-title">
                    <span class="u-name">{{ pet.Name }}</span>
                    <span class="u-type">{{ getPetType(pet.Class) }} · {{ getPetSource(pet.Source) }}</span>
                    <i class="u-stars">
                        <i class="el-icon-star-on" v-for="count in pet.Star" :key="count"></i>
                    </i>
                </h1>

                <!-- 宠物技能 -->
                <div class="m-pet-skills">
                    <div class="u-skill" v-for="(skill, index) in petWiki.skills" :key="index">
                        <el-popover :key="index" trigger="hover" popper-class="m-pet-skill" :visible-arrow="false" placement="top">
                            <div class="u-skill-pop">
                                <div class="u-skill-name">{{ skill.Name }}</div>
                                <div class="u-skill-desc">{{ skill.Desc }}</div>
                            </div>
                            <img slot="reference" class="u-skill-icon" :src="skill.IconID | iconLink" :alt="skill.Name" />
                        </el-popover>
                    </div>
                </div>

                <div class="u-metas">
                    <div class="u-meta u-score"><span class="u-meta-label">宠物分数：</span>{{ pet.Score }}</div>
                    <div class="u-meta u-desc">
                        <span class="u-meta-label">宠物说明：</span>
                        <template v-for="item in getPetDesc(pet.Desc)">
                            <div :key="item.text" v-html="item.text"></div>
                        </template>
                    </div>
                    <div class="u-meta u-source">
                        <span class="u-meta-label">获取线索：</span>
                        <template v-for="item in getPetDesc(pet.OutputDes)">
                            <span :key="item.text">{{ item.text | cleanResourceText }}</span>
                        </template>
                    </div>
                    <div class="u-meta u-shop" v-if="shopInfo.RewardsPrice || shopInfo.CoinPrice">
                        <span class="u-meta-label">商城价格：</span>
                        <span class="u-price">
                            <el-tag class="u-price-item u-rewards"
                                >积分<b>{{ shopInfo.RewardsPrice }}</b
                                ><i class="u-icon-rewards"></i
                            ></el-tag>
                            <el-tag class="u-price-item u-coin"
                                >通宝<b>{{ shopInfo.CoinPrice }}</b
                                ><i class="u-icon-coin"></i
                            ></el-tag>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-pet-wiki" v-if="petWiki">
            <detail :achievement_id="petWiki.achievement_id" :item_id="item_id" title="宠物攻略"></detail>
        </div>
        <div class="m-pet-serendipity">
            <Serendipity :title="title"/>
        </div>
    </div>
</template>

<script>
import { getPet, getShopInfo } from "@/service/pet";
import { getWiki } from "@/service/wiki";
import { getPetLucky } from "@/service/pet";
import petCard from "@/components/pet/PetCard.vue";
import Detail from "@/components/wiki/Detail.vue";
import petType from "@/assets/data/pet_type.json";
import petSource from "@/assets/data/pet_source.json";
import { iconLink, getLink } from "@jx3box/jx3box-common/js/utils";
import Serendipity from "@/components/common/serendipity.vue";
export default {
    name: "PetSingle",
    props: [],
    components: {
        petCard,
        Detail,
        Serendipity,
    },
    data: function () {
        return {
            pet: {},
            petWiki: '',
            shopInfo: "",
            luckyList: [],
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
            return this.petWiki.achievement_id;
        },
        client: function () {
            return this.$store.state.client;
        },
        title : function (){
            return this.pet.Name
        }
    },
    watch: {},
    methods: {
        // 获取宠物详情
        getPetInfo: function () {
            getPet(this.id).then((res) => {
                this.pet = res.data;
                this.getPetWiki();
                this.getShopInfo();
            });
        },
        // 获取宠物技能信息
        getPetWiki: function () {
            this.item_id && getWiki("item", this.item_id).then((res) => {
                this.petWiki = res?.data?.data?.source?.pet;
            });
        },
        // 获取宠物商城价格
        getShopInfo() {
            const params = {
                item_type: this.pet.ItemTabType,
                item_id: this.pet.ItemTabIndex,
            };
            getShopInfo(params).then((res) => {
                this.shopInfo = res?.data || "";
            });
        },
        // 获取宠物种类
        getPetType: function (typeId) {
            const _petType = petType.find((item) => item.class === typeId);
            return _petType?.name || "";
        },
        // 获取宠物途径
        getPetSource: function (sourceId) {
            const _petSource = petSource.find((item) => ~~sourceId === ~~item.source);
            return _petSource?.name || "";
        },
        // 获取宠物描述
        getPetDesc: function (str) {
            const regex = /<text>text=(.*?)font=(\d+).*?<\/text>/gimsy;
            let matches = [];
            let match;
            while ((match = regex.exec(str))) {
                matches.push(match);
            }

            // 格式化分段
            let result = [];
            for (let group of matches) {
                result.push({
                    font: ~~group[2],
                    text: group[1].slice(1, -2).replace(/[\\n]/g, ""),
                });
            }
            return result;
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        goItem() {
            const { ItemTabType, ItemTabIndex } = this.pet;
            const link = getLink("item", `${ItemTabType}_${ItemTabIndex}`);

            window.open(link, "_blank");
        },
        // 获取福缘宠物id
        getPetLucky: function () {
            getPetLucky().then((res) => {
                let data = res.data.std;
                let rawDate = new Date();
                let dateIndex = rawDate.getMonth() + 1 + "" + rawDate.getDate();
                this.luckyList = data[dateIndex];
            });
        },
        getLink,
    },
    filters: {
        iconLink,
        cleanResourceText: function (str) {
            return str && str.startsWith("获取线索：") ? str.replace("获取线索：", "") : str;
        },
    },
    created: function () {
        this.getPetLucky();
    },
    mounted: function () {
        this.getPetInfo();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/single.less";
</style>
