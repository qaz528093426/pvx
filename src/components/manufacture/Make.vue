<template>
	<div class="m-manufacture-make" v-loading="loading" v-if="data">
		<el-tabs class="m-server" v-model="server">
			<el-tab-pane v-for="item in server_list" :key="item" :label="item" :name="item"></el-tab-pane>
		</el-tabs>
		<div class="m-content">
			<div class="m-list">
				<!-- 搜索框 -->
				<el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${data.craft.name}配方`"> <el-button slot="prepend" icon="el-icon-search"></el-button></el-input>
				<!-- 默认展示 & 无搜索 -->
				<template v-if="!search">
					<template v-if="list && list.length">
						<div class="u-list" v-for="(item, index) in list" :key="index">
							<div class="u-title" @click="showList(index)">
								<i :class="list_index == index ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
								<span>{{ item.BelongName }}</span>
							</div>
							<template v-if="list_index == index && item.list">
								<div class="u-child" v-for="(child, k) in item.list" :key="k">
									<div class="u-label" @click="showItem(item)">
										<img class="u-img" :src="iconLink(child.IconID)" :alt="child.Name" />
										<span :class="`u-quality--${child.Quality}`">{{ child.Name }}</span>
									</div>
									<div class="u-btn">
										<el-input-number v-model="child.count" :min="1" size="mini"></el-input-number>
										<el-button icon="el-icon-shopping-cart-2" size="mini" type="success" @click.stop="addCart(child)"></el-button>
									</div>
								</div>
							</template>
						</div>
					</template>
				</template>
				<!-- 有搜索展示 -->
				<template v-else>
					<div class="u-child-title">搜索结果</div>
					<template v-if="search_list.length">
						<div class="u-child" v-for="(item, k) in search_list" :key="k">
							<div class="u-label" @click="showItem(item)">
								<img class="u-img" :src="iconLink(item.IconID)" :alt="item.Name" />
								<span :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
							</div>
							<div class="u-btn">
								<el-input-number v-model="item.count" :min="1" size="mini"></el-input-number>
								<el-button icon="el-icon-shopping-cart-2" size="mini" type="success" @click.stop="addCart(item)"></el-button>
							</div>
						</div>
					</template>
					<div v-else class="u-null"><i class="el-icon-warning"></i> 没有搜索到对应配方</div>
				</template>
			</div>
			<!-- 配方信息展示 -->
			<!-- <div class="m-detail">
				<div><span>物品id:</span>{{ item.ID }}</div>
				<div><span>物品名称:</span>{{ item.Name }}</div>
				<div><span>需求等级:</span>{{ item.nLevel }}</div>
				<div><span>需要专精:</span>{{ item.NeedExpertise }}</div>
				<div><span> 配方来源:</span><span v-html="item.szTip"></span></div>
				<div><span>职业:</span>{{ item.ProfessionID }}</div>
				<div><span>制造需要物品数组:</span>{{ item.requireItemArr }}</div>
				<div><span>需要物品类型:</span>{{ item.RequireItemType }}</div>
				<div><span>需要物品id:</span>{{ item.RequireItemIndex }}</div>
				<div><span>需要物品数量:</span>{{ item.RequireItemCount }}</div>
				<div><span>消耗精力:</span>{{ item.CostVigor }}</div>
				<div><span>获得经验值:</span>{{ item.Exp }}</div>
			</div> -->
		</div>
	</div>
</template>
<script>
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
import { getManufactures, getManufactureItem, getCraftJson } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
	name: "make",
	props: ["data"],
	components: {},
	data: function () {
		return {
			loading: false,
			server: "蝶恋花",
			search: "",
			item_id: "",
			item: "",

			list: [],
			all_list: [],
			craft_group: "",
			search_list: [],

			list_index: 0,
		};
	},
	computed: {
		server_list() {
			return this.data.client == "std" ? servers_std : servers_origin;
		},
		params() {
			let _params = { client: this.data.client, type: this.data.craft.key, mode: "simple" };
			return _params;
		},
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler: function () {
				this.loadData();
			},
		},
		search(val) {
			let _list = [];
			this.all_list.filter((item) => {
				if (item.Name.indexOf(val) != -1) _list.push(item);
			});
			this.search_list = _list;
		},
	},
	methods: {
		// 数据获取和处理
		// ==========================
		// 加载craft_type对应的所有数据
		loadData() {
			getManufactures(this.params)
				.then((res) => {
					this.all_list = res.data.map((item) => {
						item.count = 1;
						return item;
					});
				})
				.then(() => {
					if (this.craft_group) this.toList();
				})
				.finally(() => {
					this.list_index = 0;
					this.search = "";
					this.loading = false;
				});
		},
		// 获取全部技艺分类
		getCraftType() {
			getCraftJson()
				.then((res) => {
					let craft_group = this.data?.client == "std" ? res.data.std : res.data.origin;
					this.craft_group = this.craftGroup(craft_group);
				})
				.then(() => {
					this.toList();
				});
		},
		// craft_list配方分组
		craftGroup(list) {
			let _list = [];
			let _obj = {};
			list.forEach((item) => {
				if (!_obj[item.ProfessionID]) {
					var _arr = [];
					_arr.push({ ...item, list: [] });
					_list.push(_arr);
					_obj[item.ProfessionID] = item;
				} else {
					_list.forEach((el) => {
						if (el[0].ProfessionID == item.ProfessionID) {
							el.push({ ...item, list: [] });
						}
					});
				}
			});
			return _list;
		},

		// 根据craft_list显示list, 过滤空分组
		toList() {
			let list = [];
			this.craft_group.forEach((el) =>
				el.forEach((item) => {
					if (item.ProfessionID == this.data.craft.ProfessionID) list.push(item);
				})
			);
			this.list = list
				.map((item) => {
					item.list = this.all_list.filter((el) => {
						if (item.BelongID == el.Belong) return el;
					});
					return item;
				})
				.filter((item) => item.list.length);
		},
		// 获取单个配方的信息
		getItem() {
			getManufactureItem(this.craft.key, this.item_id).then((res) => {
				this.item = res.data;
			});
		},

		// 交互
		// ===================
		// 展开组别，显示详细配方
		showList(i) {
			if (this.list_index == i) return (this.list_index = -1);
			this.list_index = i;
		},
		// 选择展示对应配方信息
		showItem() {
			console.log("showItem");
		},
		// 加入购物车
		addCart() {
			console.log("addCart");
		},

		iconLink,
	},
	created: function () {
		this.getCraftType();
	},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/make.less";
</style>
