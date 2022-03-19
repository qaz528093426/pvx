<template>
	<div class="m-manufacture-cart">
		<div class="m-title">
			<i class="el-icon-box"></i>
			<span>成本计算</span>
		</div>
		<template v-if="cart_list && cart_list.length">
			<div class="m-item" v-for="(item, index) in cart_list" :key="index">
				<div class="u-header">
					<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
						<Item :item_id="item.item_type_id" />
						<div class="u-img" slot="reference">
							<div class="u-border" :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"></div>
							<img :src="iconLink(item.IconID)" :alt="item.Name" />
						</div>
					</el-popover>
					<div class="u-title">
						<span :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
					</div>
				</div>

				<div class="u-info">
					<el-divider content-position="left">合成需要材料</el-divider>
					<div class="u-children">
						<div class="u-child" v-for="(child, k) in item.child_list" :key="k">
							<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
								<Item :item_id="child.price_id" />
								<div class="u-img" slot="reference">
									<img :src="iconLink(child.item_info.IconID)" :alt="child.Name" />
									<span
										>x <b>{{ child.count }}</b></span
									>
								</div>
							</el-popover>

							<GamePrice v-if="child.Price" class="u-price-num" :price="child.allPrice * item.count" />
							<span v-else class="u-null">-</span>
						</div>
					</div>
					<div class="u-item-num">
						<span>数量：</span>
						<el-input-number v-model="item.count" :min="1" size="mini"></el-input-number>
					</div>
					<div class="u-item-num">
						<span>消耗精力值：</span> <b>{{ item.Exp * item.count }}</b>
					</div>
					<div class="u-item-num">
						<span>合计金额：</span>
						<span class="u-price"> <GamePrice class="u-price-num" :price="item.all_price * item.count" /> </span>
					</div>
				</div>
			</div>
		</template>

		<div class="u-item-null" v-else>- 暂未添加生产配方 -</div>
		<div class="m-all" v-if="all_exp">
			<div class="u-num">
				<span>所有配方消耗精力值：</span>
				<b>{{ all_exp }}</b>
			</div>
			<div class="u-num u-price">
				<span>- 所有配方价格 合计 -</span>
				<GamePrice v-if="all_price" class="u-price-num" :price="all_price" />
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
	props: ["list"],
	components: { GamePrice, Item },
	data: function () {
		return {
			cart_list: [],
		};
	},
	computed: {
		all_exp() {
			if (!this.cart_list.length) return 0;
			let _num = 0;
			let _list = this.cart_list.map((item) => {
				return { exp: item.Exp, count: item.count };
			});
			console.log(_list, this.cart_list);
			_list.forEach((item) => {
				_num += item.count * item.exp;
			});
			return _num;
		},
		all_price() {
			if (!this.cart_list.length) return 0;
			let _num = 0;
			let _list = this.cart_list.map((item) => {
				return { price: item.all_price, count: item.count };
			});
			console.log(_list);
			_list.forEach((item) => {
				_num += item.count * item.price;
			});
			return _num;
		},
	},
	watch: {
		list(list) {
			if (list) this.toRepeated(list);
		},
	},
	methods: {
		iconLink,
		// 过滤同物品
		toRepeated(list) {
			let _ids = [...new Set(list.map((item) => item.ID))];
			let _obj = {};
			let _list = [];
			list.forEach((item) => {
				_ids.forEach((id) => {
					if (item.ID == id) _obj[item.ID] ? _obj[item.ID].push(item) : (_obj[item.ID] = [item]);
				});
			});
			for (const key in _obj) {
				let _count = 0;
				let _all = {};
				_obj[key].forEach((item) => {
					_count += item.count;
					Object.assign(_all, item);
				});
				_all.count = _count;
				_list.push(_all);
			}
			_list = _list.map((item) => {
				let _price = 0;
				item.child_list.map((el) => {
					if (!el.Price) el.Price = 0;
					el.allPrice = el.Price * el.count;
					_price += el.allPrice;
					return el;
				});
				item.all_price = _price;
				return item;
			});
			this.cart_list = _list;
		},
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
	created() {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/cart.less";
</style>
