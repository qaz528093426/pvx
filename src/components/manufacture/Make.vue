<template>
	<div class="m-manufacture-make" v-loading="loading">
		<div class="m-list">
			<!-- 搜索框 -->
			<el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${data.craft.name}配方`"> <el-button slot="prepend" icon="el-icon-search"></el-button></el-input>
			<!-- 默认展示 & 无搜索 -->
			<template v-if="!search">
				<el-collapse class="u-list" v-model="list_index" v-if="list && list.length">
					<el-collapse-item v-for="(item, index) in list" :key="index" :title="item.BelongName" :name="index">
						<div class="u-child" :class="item_id == child.ID || first_id == child.ID ? 'active' : ''" v-for="(child, k) in item.list" :key="k" @click="toEmit({ id: child.ID })">
							<div class="u-label">
								<img class="u-img" :src="iconLink(child.IconID)" :alt="child.Name" />
								<span :class="`u-quality--${child.Quality}`">{{ child.Name }}</span>
							</div>
							<div class="u-btn">
								<el-input-number v-model="child.count" :min="1" size="mini" @click.stop.native></el-input-number>
								<el-button icon="el-icon-plus" size="mini" type="success" @click.stop="toEmit({ id: child.ID, add: child })"></el-button>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</template>
			<!-- 有搜索展示 -->
			<template v-else>
				<div class="u-child-title">搜索结果</div>
				<template v-if="search_list.length">
					<div class="u-child" :class="item_id == item.ID || first_id == item.ID ? 'active' : ''" v-for="(item, k) in search_list" :key="k" @click="toEmit({ id: item.ID })">
						<div class="u-label">
							<img class="u-img" :src="iconLink(item.IconID)" :alt="item.Name" />
							<span :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
						</div>
						<div class="u-btn">
							<el-input-number v-model="item.count" :min="1" size="mini"></el-input-number>
							<el-button icon="el-icon-plus" size="mini" type="success" @click.stop="toEmit({ id: item.ID, add: item })"></el-button>
						</div>
					</div>
				</template>
				<div v-else class="u-null"><i class="el-icon-warning"></i> 没有搜索到对应配方</div>
			</template>
		</div>
	</div>
</template>
<script>
import { getManufactures, getCraftJson } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
	name: "make",
	props: ["data", "item_id"],
	components: {},
	data: function () {
		return {
			loading: false,
			search: "",

			list: [],
			all_list: [],
			search_list: [],
			craft_group: "",

			list_index: 0,
			first_id: "",
		};
	},
	computed: {
		params() {
			return { client: this.data.client, type: this.data.craft.key, mode: "simple" };
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
		item_id(val) {
			if (val) this.first_id = "";
		},
		first_id: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (!this.item_id) this.$emit("makeEmit", { id: val });
			},
		},
	},
	methods: {
		// 数据获取和处理
		// ==========================
		// 加载craft_type对应的所有数据
		loadData() {
			this.loading = true;
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
			this.first_id = this.list[0]?.list[0]?.ID;
		},

		// 交互
		// ===================

		// 发送emit
		toEmit(data) {
			this.$emit("makeEmit", data);
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
