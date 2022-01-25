<template>
    <div class="m-trigger-game">
        <el-select v-model="server" placeholder="区服" size="medium" class="u-select-meirentu" @change="getUserList">
            <el-option v-for="item in servers" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <ul class="m-game-user" v-if="list && list.length > 0">
            <li v-for="(item, i) in list" :key="i">
                <span>{{ item.name || "匿名" }}</span>
                <span>{{ item.dwTime | wikiDate }}</span>
            </li>
        </ul>
        <el-alert class="u-alert" v-else title="无记录" type="info" center  :closable="false" />
    </div>
</template>
<script>
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
import { getUserInfo, getUserSerendipity } from "@/service/adventure";
import { showRecently } from "@/utils/moment";
export default {
    name: "game",
    props: ["title"],
    components: {},
    data: function () {
        return {
            servers,
            server: "长安城",
            list: [],
        };
    },
    computed: {},

    methods: {
        getUserServer() {
            getUserInfo().then(res => {
                this.server = res.data.data.jx3_server;
            });
        },
        getUserList() {
            let params = {
                server: this.server,
                serendipity: this.title+'2',
                start: 0,
                pageIndex: 1,
                pageSize: 9,
            };
            getUserSerendipity(params).then(res => {
                this.list = res.data.data.data;
            });
        },
    },
    filters: {
        wikiDate: function (val) {
            return showRecently(val * 1000);
        },
    },
    created: function () {
        this.getUserServer();
        this.getUserList();
    },
    mounted: function () {},
};
</script>
