<template>
	<div>
		<a class="m-furniture-item flex">
			<div class="m-furniture-image">
				<img class="u-img" src="https://console.cnyixun.com/upload/post/2021/12/14/111291_7570835.jpg" alt="" srcset="" />
				<!-- 是否可交互 -->
				<span class="u-use" v-if="show"></span>
				<span class="u-dye" v-if="true" @click="show = !show"></span>
				<!-- 园宅币价格 -->
				<div class="u-price flex"><i></i>15000</div>
			</div>
			<div class="m-furniture-detail flex">
				<div class="u-name">家具名字家具名字家具名字家具名字</div>
				<div class="u-nature"><span class="u-attribute u-blue">风水</span> <span class="u-num">1000</span></div>
				<div class="u-nature"><span class="u-attribute u-pink">观赏</span> <span class="u-num">300</span></div>
				<div class="u-nature"><span class="u-attribute u-yellow">坚固</span> <span class="u-num">20</span></div>
				<div class="u-nature"><span class="u-attribute u-green">趣味</span> <span class="u-num">300</span></div>
				<div class="u-nature"><span class="u-attribute u-purple">实用</span> <span class="u-num">20</span></div>
			</div>
		</a>
	</div>
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
			show: true,
		};
	},
	computed: {},

	methods: {},
	created: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/item.less";
</style>
