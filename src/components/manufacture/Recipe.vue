<template>
	<div class="m-manufacture-recipe" v-if="item">
		<!-- 配方信息展示 -->

		<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false"  trigger="hover">
			<Item :item_id="item_type_id" />
			<div class="u-img" slot="reference">
				<div class="u-border" :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"></div>
				<img :src="iconLink(item.IconID)" :alt="item.Name" />
			</div>
		</el-popover>

		<span class="u-name" :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
		<div class="u-price u-interval">[{{ server }}] 昨日平均价格:<GamePrice v-if="item_price" class="u-price-num" :price="item_price" /><span class="u-null" v-else>暂无数据</span></div>
		<div class="u-info u-interval">
			<span
				>需求等级: <b>{{ item.nLevel || "未知" }}</b></span
			>
			<span
				>消耗精力: <b>{{ item.CostVigor }}</b></span
			>
			<span
				>经验值: <b>{{ item.Exp }}</b></span
			>
		</div>
		<template v-if="item.szTip">
			<span class="u-desc" v-for="text in textFilter(item.szTip)" :key="text">{{ text }}</span>
		</template>
		<div class="u-children" v-if="child && child.length">
			<el-divider content-position="left">合成所需材料</el-divider>
			<div class="u-child u-interval" v-for="(el, index) in child" :key="index">
				<el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" width="auto" trigger="hover">
					<Item :item_id="el.price_id" />
					<div class="u-img" slot="reference">
						<div class="u-border" :style="{ backgroundImage: item_border(el.Quality), opacity: el.Quality == 5 ? 0.9 : 1 }"></div>
						<img :src="iconLink(el.item_info.IconID)" :alt="item.Name" />
					</div>
				</el-popover>

				<div class="u-info">
					<div class="u-name u-interval">
						<span :class="`u-quality--${el.Quality}`"> {{ el.Name }}</span>
						<span class="u-num">数量：x {{ el.count }}</span>
					</div>
					<div class="u-price">[{{ server }}] 昨日平均价格:<GamePrice class="u-price-num" :price="el.Price" /></div>
					<!-- <span class="u-interval">
						<span class="u-desc" v-for="text in textFilter(el.item_info.Desc)" :key="text">{{ text }}</span>
					</span> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getManufactureItem, getOther, getItemsPrice, getAuction } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
	name: "Recipe",
	props: ["id", "craft", "server"],
	data: function () {
		return {
			item: "",
			child: [],
			price: [],
		};
	},
	components: { GamePrice, Item },
	computed: {
		item_price() {
			let num = 0;
			this.item.child.forEach((el) => {
				if (el.id == this.item.CreateItemIndex1) num = el.Price;
			});
			return num;
		},
		item_type_id() {
			return this.item.CreateItemType1 + "_" + this.item.CreateItemIndex1;
		},
	},
	watch: {
		id: {
			deep: true,
			immediate: true,
			handler: function () {
				getManufactureItem(this.craft, this.id).then((res) => {
					this.item = this.procData(res.data);
				});
			},
		},
		server: {
			deep: true,
			handler: function (val) {
				this.getItemPrice();
			},
		},
	},
	methods: {
		iconLink,
		// 根据原始数据提取合成id
		procData(data) {
			// 过滤 value != null
			Object.keys(data).forEach((item) => {
				const key = data[item];
				if (key === "" || key === null || key === undefined) {
					delete data[item];
				}
			});
			// 提取合成id，并拼合组成对应物品id和数量

			let _type = [];
			let _list = [];
			let _count = [];
			for (const key in data) {
				if (key.startsWith("RequireItemType")) {
					_type.push(data[key]);
				}
				if (key.startsWith("RequireItemIndex")) {
					if (data[key]) _list.push(data[key]);
				}
				if (key.startsWith("RequireItemCount")) {
					if (data[key]) _count.push(data[key]);
				}
			}
			_list = _list.map((str, i) => {
				str = { id: str, count: _count[i], price_id: _type[i] + "_" + str };
				return str;
			});
			data.child = _list;
			this.getChildData(_list);
			return data;
		},
		// 根据提取id获取对应数据
		getChildData(arr) {
			let _arr = arr.map((item) => item.id);
			getOther({ client: this.$store.state.client, ids: _arr.join(), per: _arr.length }).then((res) => {
				let list = res.data.list;
				list = list.map((item) => {
					arr.forEach((el) => {
						if (item.ID == el.id) item.count = el.count;
					});
					return item;
				});
				this.child = list;
				this.getItemPrice();
			});
		},
		// 获取价格
		getItemPrice() {
			if (this.item.child.length) {
				let arr = [...this.item.child, { id: this.item.CreateItemIndex1, price_id: this.item_type_id }];
				let _ids = arr.map((item) => item.id);
				getItemsPrice({ ids: _ids.join(), client: this.$store.state.client }).then((res) => {
					let _list = res.data;
					let _arr = [];
					let _child = [];
					if (!_list.length) {
						_arr = arr.map((item) => item.price_id);
					} else {
						arr.forEach((item) => {
							if (!_list.some((el) => el.ItemIndex == item.id)) {
								_arr.push(item.price_id);
							}
						});
						_list.forEach((el) => {
							arr.forEach((item) => {
								if (item.id == el.ItemIndex) {
									item.Price = el.Price;
									_child.push(item);
								}
							});
						});
					}
					if (_arr.length) {
						getAuction({ list: _arr.join(), server: this.server }).then((res) => {
							let _game = res.data.data;
							if (Object.keys(_game).length) {
								for (const key in _game) {
									arr.forEach((item) => {
										if (_game[key].item_id == item.price_id) {
											item.Price = _game[key].avg_price;
											_child.push(item);
										}
									});
								}
							}
							this.child = this.child.map((item) => {
								arr.forEach((el) => {
									if (el.id == item.ID) {
										item.Price = el.Price;
										item.price_id = el.price_id;
									}
								});
								return item;
							});
							this.item.child = _child;
						});
					}
				});
			}
		},
		// 描述过滤
		textFilter(str) {
			// 匹配分段
			const regex = /<Text>text=(.*?)font=(\d+).*?<\/text>/gimsy;
			let matches = [];
			let match;
			while ((match = regex.exec(str))) {
				matches.push(match);
			}

			// 格式化分段
			let result = [];
			for (let group of matches) {
				result.push(group[1].slice(1, -2).replace(/[\\n]/g, ""));
			}
			result = result.filter(Boolean);
			return result;
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
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/recipe.less";
</style>
