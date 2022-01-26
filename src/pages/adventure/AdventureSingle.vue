<template>
    <div class="v-adventure-single" v-if="id">
        <!-- <TriggerSingle type="adventure" :id="id" /> -->
        <div class="m-adventure-wiki">
            <detail :achievement_id="petWiki.achievement_id" :item_id="item_id" title="奇遇攻略"></detail>
        </div>
    </div>
</template>

<script>
// import TriggerSingle from "../trigger/TriggerSingle.vue";
import Detail from "@/components/wiki/Detail.vue";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        // TriggerSingle,
        Detail,
    },
    data: function () {
        return {};
    },
    computed: {
        id: function () {
            return this.$route.params.id || 1;
        },
    },
    watch: {},
    methods: {
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
