<template>
    <div class="v-trigger-list">
        <a :href="toSingle(i)" class="m-list" v-for="(item, i) in 6" :key="i" @click="toSingle(i)">
            <AdventureItem />
            <TriggerItem />
        </a>
    </div>
</template>

<script>
import AdventureItem from "@/components/adventure/item.vue";
import TriggerItem from "@/components/trigger/item.vue";
export default {
    name: "triggerList",
    props: [],
    components: { AdventureItem, TriggerItem },
    data: function () {
        return {
            list: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        toSingle(i) {
            return location.origin + "/trigger/" + (i + 1);
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
@import "~@/assets/css/adventure/trigger.less";
</style>
