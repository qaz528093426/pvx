<template>
    <div class="m-trigger-item">
        <div class="m-trigger-reward">
            <span class="u-title">奖励</span>
            <span class="u-img" v-for="(item, i) in 2" :key="i"></span>
        </div>
        <div class="m-trigger-condition">
            <span class="u-title">触发方式</span>
            <ul class="u-content">
                <li v-for="item in 6" :key="item">触发条件</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "item",
    props: ["item"],
    components: {},
    data: function () {
        return {};
    },
    computed: {},

    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
