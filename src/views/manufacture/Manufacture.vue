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
					<span v-for="(item, index) in craft_types" :key="index" class="u-tab" :class="[`u-tab${index}`, craft_index == index ? 'active' : '']" @click="changeCraft(index, item.name)">{{ item.name }}</span>
				</div>
			</div>
			<!-- 展示 -->
			<div class="m-manufacture-main" ref="get_main">
				<!-- 左侧 & 可制作模块 -->
				<Make :style="{ width: make_width + 'px' }" :data="make_props" />
				<!-- 右侧 & 购物车计算 -->
				<Cart />
			</div>
			<Footer></Footer>
		</Main>
	</div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getManufactures, getOther } from "@/service/manufacture";
import { craft_types } from "@/assets/data/manufacture.json";
import Make from "@/components/manufacture/Make.vue";
import Cart from "@/components/manufacture/Cart.vue";

export default {
	name: "Manufacture",
	components: { Nav, Make, Cart },
	data: function () {
		return {
			// 引用数据
			craft_types,

			// 自设
			craft_index: 0,
			craft_type: "缝纫",
			make_width: 100,
		};
	},
	computed: {
		make_props() {
			let data = {
				type: this.craft_type,
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
		changeCraft(i, name) {
			this.craft_index = i;
			this.craft_type = name;
		},

		width() {
			return { width: this.$refs.get_main.offsetWidth - 250 + "px" };
		},
	},
	watch: {},
	mounted() {
		this.make_width = this.$refs.get_main.offsetWidth - 250;
	},
};
</script>

<style lang="less">
@import "~@/assets/css/manufacture/index.less";
</style>
