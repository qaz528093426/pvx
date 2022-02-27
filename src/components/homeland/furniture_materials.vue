<template>
	<div class="m-furniture-materials" v-loading="loading">
		<!-- TODO: 点击跳转对应物品 -->
		<div class="u-material" v-for="(item, index) in list" :key="index">
			<img class="u-material-img" :src="`${icon}icon/${item.IconID}.png`" alt="" />
			<span class="u-material-name">{{ item.Name }}</span>
			<span class="u-material-count">{{ item._count }}</span>
		</div>
	</div>
</template>

<script>
import { getFurnitureMaterials, getItemDetail } from "@/service/furniture.js";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
	name: "furnitureMaterials",
	props: ["id"],
	components: {},
	data: function () {
		return {
			list: [],
			loading: false,
			icon: __iconPath,
		};
	},
	computed: {
		client: function () {
			return this.$store.state.client;
		},
	},
	watch: {
		id: {
			immediate: true,
			handler: function (val) {
				val && this.loadData();
			},
		},
	},
	methods: {
		loadData: function () {
			this.loading = true;
			getFurnitureMaterials(this.id)
				.then((res) => {
					res?.data && this.getDetail(res.data);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		getDetail(data) {
			let counts = [];
			let itemIds = [];
			for (const key in data) {
				if (key.startsWith("RequireItemCount") && data[key]) {
					counts.push(data[key]);
				}

				if (key.startsWith("RequireItemIndex") && data[key]) {
					itemIds.push(data[key]);
				}
			}
			let params = { ids: itemIds.join(","), per: 10, client: this.client };

			getItemDetail(params).then((res) => {
				this.list = res?.data?.list?.map((item, i) => {
					return {
						...item,
						...item.item_info[0],
						_count: counts[i],
					};
				});
				console.log(this.list, "?");
			});
		},
	},
	created: function () {},
};
</script>

<style scoped lang="less">
.m-furniture-materials {
	.flex;
	.u-material {
		.flex;
		.pr;
		.pointer;
		flex-direction: column;
		align-items: center;
		.mr(15px);
		.color(@color,@pink);
		transition: all 0.1s ease-in-out;
		.u-material-img {
			.size(48px);
		}

		.u-material-count {
			.pa;
			.rt(0,28px);
			.fz(12px);
			color: #fff;
			text-align: right;
			padding: 0 3px 0 5px;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 3px 0 0 3px;
			&::before {
				content: "×";
			}
		}
		&:hover {
			.u-material-img {
				filter: saturate(120%) brightness(110%);
				transform: scale(1.04);
			}
		}
	}
}
</style>
