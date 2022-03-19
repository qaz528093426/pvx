<template>
	<div class="m-manufacture-cart">
		<div class="u-title">
			<i class="el-icon-box"></i>
			<span>成本计算</span>
		</div>
		<div class="u-item" v-for="(item, index) in list" :key="index">
			<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
				<Item :item_id="item.item_type_id" />
				<div class="u-img" slot="reference">
					<div class="u-border" :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"></div>
					<img :src="iconLink(item.IconID)" :alt="item.Name" />
				</div>
			</el-popover>

			<div class="u-info">
				<div class="u-line u-name" :class="`u-quality--${item.Quality}`">{{ item.Name }}</div>
				<div>
					<span class="u-price"> <GamePrice class="u-price-num" :price="item.all_price" /> </span>
				</div>
				<div class="u-item-exp">
					消耗精力值：<b>{{ item.Exp * item.count }}</b>
				</div>
				<div class="u-child" v-for="(child, k) in item.child" :key="k">
					<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
						<Item :item_id="child.price_id" />
						<div class="u-img" slot="reference">
							<img :src="iconLink(child.item_info.IconID)" :alt="child.Name" />
							<span>x {{ child.count }}</span>
						</div>
					</el-popover>

					<GamePrice v-if="child.Price" class="u-price-num" :price="child.allPrice * item.count" />
					<span v-else class="u-null">-</span>
				</div>
				<div class="u-item-num">
					<span>数量：</span>
					<el-input-number v-model="item.count" :min="1" size="mini"></el-input-number>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
	name: "cart",
	props: ["data"],
	components: { GamePrice, Item },
	data: function () {
		return {};
	},
	computed: {
		list() {
			return this.data.list;
		},
	},
	watch: {},
	methods: {
		iconLink,
		// icon边框
		item_border(id) {
			switch (id) {
				case 3:
					return `url(${__imgPath}image/item/blue.png)`;
				case 4:
					return `url(${__imgPath}image/item/purple.png)`;
				case 5:
					return `url(${__imgPath}image/item/orange.gif)`;
				default:
					return "";
			}
		},
	},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/cart.less";
</style>
