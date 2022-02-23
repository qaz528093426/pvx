<template>
	<a class="m-furniture-item flex">
		<div class="m-furniture-image">
			<!-- 是否可交互 -->
			<span class="u-use" v-if="true"><i></i></span>
			<!-- 园宅币价格 -->
			<div class="u-price flex"><i></i>15000</div>
		</div>
		<div class="m-furniture-detail flex">
			<span class="u-name">家具名字</span>
			<span class="u-type"> 大分类-小分类</span>
			<span class="u-attribute u-blue">风水 1000</span>
			<span class="u-attribute u-pink">观赏 300</span>
			<span class="u-attribute u-yellow">坚固 20</span>
			<span class="u-attribute u-green">趣味 300</span>
			<span class="u-attribute u-purple">实用 20</span>
		</div>
	</a>
</template>

<script>
export default {
	name: "Card",
	props: [],
	components: {
		//demo
	},
	data: function () {
		return {
			mode: "",
		};
	},
	computed: {},

	methods: {},
	created: function () {},
};
</script>
