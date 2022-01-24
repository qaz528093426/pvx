<template>
    <div class="v-pet-list">
        <div class="m-pet-header">
            <div class="u-title"></div>
            <PetSearch />
        </div>
        <div class="m-pet-list">
            <PetItem v-for="(item, i) in 6" :key="i" :item="item" />
        </div>
    </div>
</template>

<script>
import PetSearch from "@/components/adventure/search.vue";
import PetItem from "@/components/adventure/item.vue";

export default {
    name: "PetList",
    props: [],
    components: { PetSearch, PetItem },
    data: function () {
        return {
            list: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 加载数据
        getPetList: function () {},
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.getPetList();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
