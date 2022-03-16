<template>
	<div id="app">
		<Header></Header>
		<Breadcrumb name="技艺助手" slug="cooking" root="/manufacture" :publishEnable="false" :adminEnable="false" :feedbackEnable="true" :crumbEnable="false">
			<img slot="logo" svg-inline :src="getAppIcon('cooking')" />
		</Breadcrumb>
		<LeftSidebar>
			<Nav></Nav>
		</LeftSidebar>
		<Main :withoutRight="true">
			<!-- 标题 -->
			<div class="m-manufacture-header">
				<h1>技艺助手</h1>
				<div class="u-tabs">
					<span v-for="(item, index) in craft_types" :key="index" class="u-tab" :class="[`u-tab${index}`, craft_index == index ? 'active' : '']" @click="changeCraft(index)">{{ item.name }}</span>
				</div>
			</div>
			<!-- 展示 -->
			<div class="m-manufacture-main" ref="get_main">
				<div class="u-manufacture-main" :style="{ width: make_width + 'px' }">
					<el-tabs class="m-server" v-model="server">
						<el-tab-pane v-for="item in server_list" :key="item" :label="item" :name="item"></el-tab-pane>
					</el-tabs>
					<div class="m-content">
						<!-- 左侧 & 可制作模块 -->
						<Make :data="make_props" @makeEmit="makeEmit" />
						<!-- 中间 & 配方展示 -->
						<Recipe :id="item_id" :craft="craft.key" :server="server" />
					</div>
				</div>

				<!-- 右侧 & 购物车计算 -->
				<Cart />
			</div>
			<Footer></Footer>
		</Main>
	</div>
</template>

<script>
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { craft_types } from "@/assets/data/manufacture.json";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import Nav from "@/components/Nav.vue";
import Recipe from "@/components/manufacture/Recipe.vue";
import Make from "@/components/manufacture/Make.vue";
import Cart from "@/components/manufacture/Cart.vue";

export default {
	name: "Manufacture",
	components: { Nav, Make, Cart, Recipe },
	data: function () {
		return {
			// 引用数据
			craft_types,

			// 自设
			server: "蝶恋花",
			craft_index: 0,
			make_width: 1,
			item_id: 2,
		};
	},
	computed: {
		server_list() {
			return this.client == "std" ? servers_std : servers_origin;
		},
		craft() {
			return this.craft_types[this.craft_index];
		},
		make_props() {
			let data = {
				craft: this.craft,
				client: this.client,
			};
			return data;
		},
		client() {
			return this.$store.state.client;
		},
	},

	methods: {
		getAppIcon,

		// 切换技艺类别
		changeCraft(i) {
			this.craft_index = i;
		},
		// make传值
		makeEmit(e) {
			this.item_id = e.id;
		},
	},
	watch: {},
	mounted() {
		this.make_width = this.$refs.get_main.offsetWidth - 260;
	},
};
</script>

<style lang="less">
@import "~@/assets/css/manufacture/index.less";
</style>
