<template>
	<div class="v-homeland-furniture">
		<div class="u-navigation">
			<el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
			<div class="u-links">
				<a class="u-link u-item" :href="getLink('item', item_id)" target="_blank"><i class="el-icon-collection-tag"></i>物品信息</a>
				<template v-if="achievement_id">
					<em> | </em>
					<a class="u-link u-achievement" :href="getLink('cj', achievement_id)" target="_blank"><i class="el-icon-trophy"></i>成就信息</a>
				</template>
			</div>
		</div>

		<div class="m-infoBox flex">
			<div class="u-infoImg">
				<img src="https://console.cnyixun.com/upload/post/2021/12/14/111291_7570835.jpg" alt="" />
				<div class="u-price"><i></i>15000</div>
			</div>

			<div class="u-info-card">
				<div class="u-title">浮金沐盆</div>
				<div class="u-info"><i class="el-icon-star-on"></i>清风舟在鉴，日落水浮金</div>
				<div class="u-nature">
					<span class="mr20"><span class="u-label u-blue">观赏</span>1200</span>
					<span class="mr20"><span class="u-label u-pink">实用</span>1200</span>
					<span class="mr20"><span class="u-label u-yellow">坚固</span>1200</span>
					<span class="mr20"><span class="u-label u-green">风水</span>1200</span>
					<span class="mr20"><span class="u-label u-purple">趣味</span>2700</span>
				</div>
				<div class="u-other">
					<span class="mr20"><span class="u-label">物品来源：</span>园宅会赛</span>
					<span class="mr20"><span class="u-label">要求等级：</span>1级</span>
					<span class="mr20"><span class="u-label">套装：</span>浮生昭世</span>
					<span class="mr20"><span class="u-label">可交互：</span><i class="el-icon-check"></i></span>
					<span class="mr20"><span class="u-label">可染色：</span><i class="el-icon-close"></i></span>
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
					<Fav class="u-collect" post-type="item" :post-id="id" />
				</div>
			</div>
		</div>

		<div class="m-luYuan">
			<div class="u-title"><span class="u-name">庐远广记</span><span class="u-label">回廊九曲·江南</span></div>
			<div class="u-box">
				<div class="u-score"><span>评分：</span> <el-rate class="u-star" v-model="star" disabled></el-rate></div>
				<div class="m-fetters-list">
					<el-popover placement="top" popper-class="m-pet-pop" width="auto" :visible-arrow="false" trigger="hover" transition="none" :close-delay="0" v-for="pet in petList" :key="pet.Index">
						<router-link slot="reference" class="u-fetter" :to="'/pet/' + pet.Index">
							<i class="u-fetter-icon" :class="['u-quality-' + pet.Quality]">
								<img :src="iconLink(pet.IconID)" />
							</i>
							<span class="u-fetter-name">{{ pet.Name }}</span>
							<i class="u-mark" v-if="pet.Index == id">当前</i>
						</router-link>

						<jx3-item :item_id="`${pet.ItemTabType}_${pet.ItemTabIndex}`"></jx3-item>
					</el-popover>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getLink, iconLink } from "@jx3box/jx3box-common/js/utils";
import Item from "@jx3box/jx3box-editor/src/Item";
export default {
	name: "FurnitureSingle",
	props: [],
	components: {
		"jx3-item": Item,
	},
	data: function () {
		return {
			addPlans: false,
			star: 1,
			petList: [
				{
					Index: 248,
					Name: "鸿鸿",
					NamePath: null,
					NameFrame: 243,
					Level: 5,
					Quality: 3,
					Class: 3,
					Star: 3,
					Type: "2",
					Source: "5",
					BgPath: "ui\\Image\\Pets\\kp_鸿鸿.tga",
					OutputDes: '<text>text="获取线索：饮露峡上，天罗沐月。" font=168</text>',
					Desc: '<text>text="一只厉害的小狗。\\\\\\n并不是因为戴了霸气的眼罩才厉害，而是因为它本来就超超超超厉害。\\\\\\n“犬守太平年，鸿运伴随来。”" font=65</text>',
					Show: 1,
					OnlyHaveShow: 0,
					LimitTime: 0,
					ModelID: 61694,
					ColorChannelTable: 0,
					ColorChannel: 0,
					ModelScale: "1",
					IconID: 10049,
					X: 0,
					Y: 80,
					Z: -300,
					LookAtX: 0,
					LookAtY: 100,
					LookAtZ: 150,
					CoinShopScale: "1",
					CoinShopPosY: "-1",
					IdentityYS: "0",
					YSDes: null,
					nMapID: "122",
					nMapX: "18692",
					nMapY: "64229",
					szTip: "唐御御",
					NpcTemplateID: 59366,
					ItemTabType: 8,
					ItemTabIndex: 21065,
					_Type: 3,
					Score: 35,
				},
				{
					Index: 249,
					Name: "运运",
					NamePath: null,
					NameFrame: 247,
					Level: 6,
					Quality: 4,
					Class: 3,
					Star: 4,
					Type: "2",
					Source: "5",
					BgPath: "ui\\Image\\Pets\\kp_运运.tga",
					OutputDes: '<text>text="获取线索：曲亭山下，孤女锻剑。" font=168</text>',
					Desc: '<text>text="一只霸气的小狗。\\\\\\n这身装扮，不是为了提升它的霸气，而是为了约束！避免它的霸气太过强大而外露。\\\\\\n“犬守太平年，鸿运天天来。”" font=65</text>',
					Show: 1,
					OnlyHaveShow: 0,
					LimitTime: 0,
					ModelID: 61695,
					ColorChannelTable: 0,
					ColorChannel: 0,
					ModelScale: "1",
					IconID: 10050,
					X: 0,
					Y: 80,
					Z: -300,
					LookAtX: 0,
					LookAtY: 100,
					LookAtZ: 150,
					CoinShopScale: "1",
					CoinShopPosY: "-1",
					IdentityYS: "0",
					YSDes: null,
					nMapID: "13",
					nMapX: "7705",
					nMapY: "23424",
					szTip: "阮染",
					NpcTemplateID: 59367,
					ItemTabType: 8,
					ItemTabIndex: 21066,
					_Type: 3,
					Score: 43,
				},
				{
					Index: 245,
					Name: "财财",
					NamePath: null,
					NameFrame: 239,
					Level: 6,
					Quality: 4,
					Class: 3,
					Star: 4,
					Type: "2",
					Source: "5",
					BgPath: "ui\\Image\\Pets\\kp_财财.tga",
					OutputDes: '<text>text="获取线索：皇都绕水，医者仁心。" font=168</text>',
					Desc: '<text>text="一只活泼的小狗。\\\\\\n圆圆的眼神，滴溜溜一转就能想到些有趣的鬼主意来。\\\\\\n“犬守太平年，恭喜发大财。”" font=65</text>',
					Show: 1,
					OnlyHaveShow: 0,
					LimitTime: 0,
					ModelID: 61691,
					ColorChannelTable: 0,
					ColorChannel: 0,
					ModelScale: "1",
					IconID: 10046,
					X: 0,
					Y: 80,
					Z: -300,
					LookAtX: 0,
					LookAtY: 100,
					LookAtZ: 150,
					CoinShopScale: "1",
					CoinShopPosY: "-1",
					IdentityYS: "0",
					YSDes: null,
					nMapID: "15",
					nMapX: "56630",
					nMapY: "83912",
					szTip: "杨悦",
					NpcTemplateID: 59363,
					ItemTabType: 8,
					ItemTabIndex: 21062,
					_Type: 3,
					Score: 43,
				},
				{
					Index: 244,
					Name: "瑞瑞",
					NamePath: null,
					NameFrame: 244,
					Level: 5,
					Quality: 3,
					Class: 3,
					Star: 3,
					Type: "2",
					Source: "5",
					BgPath: "ui\\Image\\Pets\\kp_瑞瑞.tga",
					OutputDes: '<text>text="获取线索：青萝水边，秀女灵心。" font=168</text>',
					Desc: '<text>text="一只可爱的小狗。\\\\\\n圆圆的眼神，有着无法被拒绝的萌的力量。\\\\\\n“犬守太平年，喜庆伴祥瑞。”" font=65</text>',
					Show: 1,
					OnlyHaveShow: 0,
					LimitTime: 0,
					ModelID: 61690,
					ColorChannelTable: 0,
					ColorChannel: 0,
					ModelScale: "1",
					IconID: 10045,
					X: 0,
					Y: 80,
					Z: -300,
					LookAtX: 0,
					LookAtY: 100,
					LookAtZ: 150,
					CoinShopScale: "1",
					CoinShopPosY: "-1",
					IdentityYS: "0",
					YSDes: null,
					nMapID: "16",
					nMapX: "10997",
					nMapY: "77865",
					szTip: "卢蓉",
					NpcTemplateID: 59362,
					ItemTabType: 8,
					ItemTabIndex: 22530,
					_Type: 3,
					Score: 35,
				},
			],
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
		goBack() {
			this.$router.push({ name: "list" });
		},
	},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/single.less";
</style>
