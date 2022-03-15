<template>
	<div class="m-item" @click="changeItem">
		<div class="u-name" slot="reference">
			<img class="u-img" :src="iconLink(IconID)" :alt="item.Name" />
			<div :class="`u-quality--${Quality}`">{{ item.Name }}</div>
		</div>

		<div class="u-btn">
			<el-input-number v-model.number="num" @change="changeNum" :min="1" :max="10" size="small"></el-input-number>
		</div>

		<div class="u-add" @click.stop="addCart">加入购物车</div>
	</div>
</template>

<script>
// import Item from "@jx3box/jx3box-editor/src/Item.vue";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
	name: "Item",
	props: ["item"],
	data: function () {
		return {
			num: 1,
		};
	},
	computed: {
		Quality() {
			return this.item.Quality || 1;
		},
		IconID() {
			return this.item.IconID || 1;
		},
	},
	methods: {
		iconLink,
		changeNum(i) {
			this.num = i;
		},
		changeItem() {
			this.$emit("changeItem", { count: this.num, ...this.item });
		},
		addCart() {
			this.$emit("changeItem", { add: true, count: this.num, ...this.item });
		},
	},
};
</script>
<style lang="less" scoped>
.m-item {
	.flex;
	.pr;
	.r(5px);
	.mb(10px);
	.pointer;
	background: @color;
	padding: 5px 10px;
	justify-content: space-between;
	align-items: center;
	.u-line {
		.w(100%);
	}
	.u-name {
		.flex;
		align-items: center;
	}
	.u-img {
		.size(24px);
		.mr(10px);
	}
	&:hover {
		filter: brightness(120%);
		.u-add {
			.db;
		}
	}
	.u-add {
		.none;
		.pa;
		.lh(42px);
		.r(5px);
		.rt(-7em,0);
		padding: 0 1em;
		background: #2289f0;
		color: #fff;
	}
}

.el-input-number {
	width: 120px;
}
.u-btn {
	.el-input-number__decrease,
	.el-input-number__increase {
		width: 30px !important;
	}
}
</style>
