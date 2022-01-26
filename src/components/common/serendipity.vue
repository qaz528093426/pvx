<template>
    <div class="m-serendipity">
        <el-select v-model="server" placeholder="区服" size="medium" class="u-select">
            <el-option v-for="item in servers" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <ul class="u-list" v-if="list && list.length > 0">
            <li v-for="(item, i) in list" :key="i">
                <span>{{ item.name || "匿名" }}</span>
                <span>{{ item.dwTime | wikiDate }}</span>
            </li>
        </ul>
        <el-alert class="u-alert" v-else title="无记录" type="info" center :closable="false" />
    </div>
</template>
<script>
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
import { getUserInfo, getSerendipity } from "@/service/adventure";
import { showRecently } from "@/utils/moment";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "serendipity",
    props: ["title"],
    components: {},
    data: function () {
        return {
            servers,
            server: "长安城",
            list: [],
        };
    },
    computed: {
        params: function () {
            return {
                server: this.server,
                serendipity: this.title,
                start: 0,
                pageIndex: 1,
                pageSize: 10,
            };
        },
    },
    methods: {
        getUserServer() {
            User.isLogin() &&
                getUserInfo().then((res) => {
                    this.server = res.data.data.jx3_server;
                });
        },
        loadSerendipity() {
            getSerendipity(this.params).then((res) => {
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
        this.loadSerendipity();
        this.getUserList();
    },
    mounted: function () {},
};
</script>
