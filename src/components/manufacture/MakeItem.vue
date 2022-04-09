<template>
    <div class="u-child" @click="toEmit({ id: item.ID })" v-if="item">
        <div class="u-label">
            <img class="u-img" :src="iconLink(item.IconID)" :alt="item.Name" />
            <span :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
        </div>
        <div class="u-btn">
            <el-input-number v-model="item.count" :min="1" size="mini" @click.stop.native></el-input-number>
            <el-button icon="el-icon-shopping-cart-2" size="mini" type="success" @click.stop="toEmit({ id: item.ID, count: item.count })"></el-button>
        </div>
    </div>
</template>
<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "MakeItem",
    props: ["item"],
    methods: {
        iconLink,
        toEmit(data) {
            this.$emit("toEmit", data);
        },
    },
};
</script>
