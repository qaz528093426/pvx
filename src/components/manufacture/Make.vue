<template>
	<div class="m-manufacture-make" v-loading="loading">
		<el-tabs class="m-server" v-model="server" @tab-click="handleClick">
			<el-tab-pane v-for="item in server_list" :key="item" :label="item" :name="item"></el-tab-pane>
		</el-tabs>
		<div class="m-content">
			<div class="m-list">
				<el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${data.type}配方`"> <el-button slot="prepend" icon="el-icon-search"></el-button></el-input>
				<div class="u-list">
					<Item v-for="(item, index) in list" :key="index" :item="item" @changeItem="changeItem"></Item>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
import { craft_Arr, craft_types } from "@/assets/data/manufacture.json";
import { getManufactures } from "@/service/manufacture";
import Item from "@/components/manufacture/Item.vue";
export default {
	name: "make",
	props: ["data"],
	components: { Item },
	data: function () {
		return {
			loading: false,
			server: "蝶恋花",
			search: "",
			list: [],
			pre: 10,
			page: 1,

			craft_Arr,
			craft_types,
		};
	},
	computed: {
		server_list() {
			return this.data.client == "std" ? servers_std : servers_origin;
		},
		craft_type() {
			let _type = "cooking";
			craft_types.forEach((el) => {
				if (el.name == this.data.type) _type = el.key;
			});
			return _type;
		},
		search_params() {
			let _params = {
				client: this.data.client,
				type: this.craft_type,
				page: this.page,
				limit: this.per,
				mode: "simple",
			};
			if (this.search) _params.search = this.search;
			return _params;
		},
	},
	watch: {},
	methods: {
		// 数据
		loadData(params = this.search_params) {
			getManufactures(params)
				.then((res) => {
					console.log(res);
					this.list = res.data;
				})
				.finally(() => {
					this.loading = false;
				});
		},

		// 选择服务器
		handleClick() {
			console.log(this.server, "handleClick");
		},
		changeItem(index) {
			console.log(index);
		},
	},
	created: function () {
		this.loadData();
	},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/make.less";
</style>
