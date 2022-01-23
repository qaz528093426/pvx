<template>
    <div class="v-adventure-List">
        <div class="m-adventure-header">
            <div class="u-title"></div>
            <AdventureSearch />
        </div>
        <div class="m-adventure-list">
            <AdventureItem v-for="(item, i) in 6" :key="i" :item="item" />
        </div>
    </div>
</template>

<script>
import AdventureSearch from "@/components/adventure/search.vue";
import AdventureItem from "@/components/adventure/item.vue";
export default {
    name: "adventureList",
    props: [],
    components: { AdventureSearch, AdventureItem },
    data: function () {
        return {
            list:[]
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
