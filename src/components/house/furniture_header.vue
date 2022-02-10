<template>
    <div class="m-furniture-header">
        <div class="m-furniture-title flex">
            <i class="u-logo"></i>
        </div>
        <div class="m-furniture-search flex">
            <el-select
                class="u-type u-type-select"
                v-model="furnitureType"
                placeholder="全部"
            >
                <el-option
                    v-for="item in Type"
                    :key="item.type"
                    :label="item.name"
                    :value="item.class"
                >
                </el-option>
            </el-select>
            <el-input
                class="u-search"
                placeholder="输入家具名字搜索"
                v-model="furnitureName"
                clearable
            >
            </el-input>
            <el-button
                class="u-button"
                slot="append"
                icon="el-icon-search"
            ></el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data: function () {
        return {};
    },
    methods: {},
};
</script>

<style lang="less">
@import "~@/assets/css/house/furniture.less";
</style>
