<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="技艺助手" slug="cooking" root="/manufacture" :publishEnable="false" :adminEnable="false" :feedbackEnable="true" :crumbEnable="false"> </Breadcrumb>
        <LeftSidebar>
            <Nav></Nav>
        </LeftSidebar>
        <Main :withoutRight="true">
			<div class="m-main">
				<div class="m-manufacture-header">
				<h1 class="u-title">技艺助手</h1>
				<div class="u-settings" v-if="isStd">
					<div class="u-servers">
						<el-select v-model="server" placeholder="请选择" size="small">
							<span slot="prefix" class="u-prefix"><i class="el-icon-coin"></i> 价格参考服务器</span>
							<el-option v-for="item in server_list" :key="item" :label="item" :value="item"> </el-option>
						</el-select>
					</div>
				</div>
			</div>
            <div class="m-manufacture-main">
                <div class="m-manufacture-sidebar">
					<!-- 分类 -->
					<div class="u-tabs">
						<span v-for="(item, index) in craft_types" :key="index" class="u-tab" :class="[`u-tab${index}`, craft_index == index ? 'active' : '']" @click="changeCraft(index)">{{
							item.name
						}}</span>
					</div>
                    <!-- 左侧 & 可制作模块 -->
                    <Make class="u-left" :data="make_props" :item_id="item_id" @makeEmit="makeEmit" />
                </div>
                <div class="m-manufacture-content">
					<!-- 中间 & 配方展示 -->
					<Recipe class="u-middle" :id="item_id" :craft="craft.key" :server="server" />
					<!-- 右侧 & 购物车计算 -->
					<Cart class="u-right" :add_item="add_item" />
                </div>
            </div>
			</div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
    import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
    import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
    import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
    import { craft_types } from "@/assets/data/manufacture.json";
    import Nav from "@/components/Nav.vue";
    import Recipe from "@/components/manufacture/Recipe.vue";
    import Make from "@/components/manufacture/Make.vue";
    import Cart from "@/components/manufacture/Cart.vue";

    export default {
        name: "Manufacture",
        components: { Nav, Make, Cart, Recipe },
        data: function () {
            return {
                // 引用数据
                craft_types,

                // 自设
                server: "蝶恋花",
                craft_index: 0,
                make_width: 1,
                item_id: 2,
                cart_list: [],
                add_item: "",
            };
        },
        computed: {
            // 服务器
            server_list() {
                return this.client == "std" ? servers_std : servers_origin;
            },
            client() {
                return this.$store.state.client;
            },
            isStd() {
                return this.client == "std";
            },
            craft() {
                return this.craft_types[this.craft_index];
            },
            make_props() {
                let data = {
                    craft: this.craft,
                    client: this.client,
                };
                return data;
            },
        },

        methods: {
            // 切换技艺类别
            changeCraft(i) {
                this.craft_index = i;
            },
            // make传值
            makeEmit(e) {
                this.item_id = e.id;
                this.add_item = e.add;
            },
        },
        watch: {},
        mounted() {},
    };
</script>

<style lang="less">
    @import "~@/assets/css/app.less";
    @import "~@/assets/css/manufacture/index.less";
</style>
