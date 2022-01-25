<template>
    <div class="v-pet-single">
        <div class="m-toolbar">
            <el-button size="medium" icon="el-icon-arrow-left" @click="goBack"
                >返回列表</el-button
            >
            <el-button size="medium" type="primary" icon="el-icon-s-promotion" @click="goItem">查看物品</el-button>
        </div>
        <div class="m-pet-panel flex">
            <petCard :petObject="pet" :lucky="luckyList"></petCard>
            <div class="m-pet-info flex">
                <div class="u-pet-name">{{ pet.Name }}</div>
                <div class="">
                    <template v-for="(skill, index) in petWiki.skills">
                        <el-popover
                            :key="index"
                            trigger="click"
                            popper-class="u-pet-skill-pop"
                            :visible-arrow="false"
                            placement="top"
                        >
                            <div class="u-desc">
                                <div>{{ skill.Name }}</div>
                                <div>{{ skill.Desc }}</div>
                            </div>
                            <img
                                slot="reference"
                                class="u-icon"
                                :src="skill.IconID | iconLink"
                                alt=""
                            />
                        </el-popover>
                    </template>
                </div>
                <div class="v-pet-orange">
                    {{ getPetType(pet.Class) }} · {{ getPetSource(pet.Source) }}
                </div>
                <div>
                    <i
                        class="el-icon-star-on"
                        v-for="count in pet.Star"
                        :key="count"
                    ></i>
                </div>
                <div>宠物分数：{{ pet.Score }}</div>
                <div class="u-pet-desc">宠物说明：
                    <template v-for="item in getPetDesc(pet.Desc)">
                        <span :key="item.text">{{ item.text }}</span>
                    </template></div>
                <div class="u-source-text">
                    <template v-for="item in getPetDesc(pet.OutputDes)">
                        <span :key="item.text">{{ item.text }}</span>
                    </template>
                </div>
                <div class="u-shop-text" v-if="shopInfo.RewardsPrice || shopInfo.CoinPrice">
                    商城价格：
                    <el-tag type="warning" class="u-credit">积分：{{  shopInfo.RewardsPrice }}</el-tag>
                    <el-tag type="danger">通宝：{{  shopInfo.CoinPrice }}</el-tag>
                </div>
            </div>
            <div class="m-pet-wiki">
                <detail :id="petWiki.achievement_id" title="宠物攻略"></detail>
            </div>
        </div>
    </div>
</template>

<script>
import { getPet, getShopInfo } from "@/service/pet";
import { getWiki } from "@/service/wiki";
import { getPetLucky } from "@/service/pet";
import petCard from "@/components/pet/PetCard.vue";
import Detail from '@/components/wiki/Detail.vue';
import petType from "@/assets/data/pet_type.json";
import petSource from "@/assets/data/pet_source.json";
import { iconLink, getLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "PetSingle",
    props: [],
    components: {
        petCard,
        Detail
    },
    data: function () {
        return {
            pet: {},
            petWiki: {},
            shopInfo: "",
            postPet: '',
            luckyList: [],
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        source_id: function ({ pet }) {
            return pet?.ItemTabType + "_" + pet?.ItemTabIndex;
        },
        client: function () {
            return this.$store.state.client;
        },
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
            getWiki("item", this.source_id).then((res) => {
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
            const _petSource = petSource.find(
                (item) => ~~sourceId === ~~item.source
            );
            return _petSource?.name || ''
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
            const { ItemTabType, ItemTabIndex } = this.pet
            const link = getLink('item', `${ItemTabType}_${ItemTabIndex}`)

            window.open(link, '_blank')
        },
        // 获取福缘宠物id
        getPetLucky: function () {
            getPetLucky().then((res) => {
                let data = res.data.std 
                let rawDate = new Date();
                let dateIndex = rawDate.getMonth() + 1 + "" + rawDate.getDate();
                this.luckyList = data[dateIndex];
            })
        },
    },
    filters: {
        iconLink,
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