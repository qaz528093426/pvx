<template>
    <div class="m-trigger-game">
        <el-select v-model="server" placeholder="区服" size="medium" class="u-select-meirentu">
            <el-option v-for="item in servers" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <ul class="m-game-user">
            <li v-for="(item, i) in 9" :key="i">
                <span>{{ name | secrecyName }}</span>
                <span>11小时前</span>
            </li>
        </ul>
    </div>
</template>
<script>
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
export default {
    name: "game",
    props: [],
    components: {},
    data: function () {
        return {
            server: "蝶恋花",
            servers,
            name: "浮烟@长安城",
        };
    },
    computed: {},

    methods: {},
    filters: {
        secrecyName: function (val) {
            let str = "";
            for (let i = 0; i < val.length - 1; i++) {
                str += "*";
            }
            if (val.length == 2) return val.slice(0, 1) + "***" + val.slice(1);
            return val.replace(val.substring(1, val.length - 1), str);
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>
