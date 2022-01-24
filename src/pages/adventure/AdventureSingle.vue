<template>
    <div class="v-adventure-single">
        单页
        <TriggerSingle v-if="false" />
    </div>
</template>

<script>
// import TriggerSingle from "../trigger/TriggerSingle.vue";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        // TriggerSingle
    },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {  
        console.log(this.id);
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
