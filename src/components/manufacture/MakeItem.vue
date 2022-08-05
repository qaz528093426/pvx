<template>
    <div class="u-child" @click="toStore(make.ID)" v-if="make.ID">
        <div class="u-label">
            <img class="u-img" :src="iconLink(make.IconID)" :alt="make.Name" />
            <span :class="`u-quality--${make.Quality}`">{{ make.Name }}</span>
        </div>
        <div class="u-btn">
            <el-input-number v-model="make.count" size="mini" @click.stop.native></el-input-number>
            <el-button
                icon="el-icon-shopping-cart-2"
                size="mini"
                type="success"
                @click.stop="toAddCart(make.count)"
            ></el-button>
        </div>
    </div>
</template>
<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "MakeItem",
    props: ["item"],
    computed: {
        make() {
            return this.item;
        },
    },
    methods: {
        iconLink,
        toStore(item_id) {
            this.$store.commit("toState", { item_id });
        },
        toAddCart(count) {
            this.$store.dispatch("toAddCart", { count });
        },
    },
};
</script>
