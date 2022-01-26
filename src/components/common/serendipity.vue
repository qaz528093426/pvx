<template>
    <div class="m-serendipity">
        <div class="u-title">
            <span class="u-label">
                <i class="el-icon-present"></i>
                触发记录
            </span>
            <el-select v-model="server" placeholder="区服" size="medium" class="u-select">
                <el-option v-for="item in servers" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </div>
        <ul class="u-list" v-if="list && list.length > 0">
            <li class="u-header">
                <span class="u-date">日期</span>
                <span class="u-time">激活时间</span>
                <span class="u-server">服务器</span>
                <span class="u-name">玩家</span>
            </li>
            <li v-for="(item, i) in list" :key="i">
                <span class="u-date">{{ item.date_str | showDate }}</span>
                <span class="u-time">{{ item.dwTime | wikiDate }}</span>
                <span class="u-server">{{ item.gegion }}-{{ item.server }}</span>
                <span class="u-name">{{ item.name || "匿名" }}</span>
            </li>
        </ul>
        <el-alert class="u-alert" v-else title="无记录" type="info" center :closable="false" />
    </div>
</template>
<script>
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
import { getUserInfo, getSerendipity } from "@/service/serendipity";
import { showRecently, showDate } from "@/utils/moment";
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
                getUserInfo().then(res => {
                    this.server = res.data.data.jx3_server;
                });
        },
        loadSerendipity() {
            getSerendipity(this.params).then(res => {
                this.list = res.data.data.data;
            });
        },
    },
    filters: {
        wikiDate: function (val) {
            return showRecently(val * 1000);
        },
        showDate: function (val) {
            return showDate(val);
        },
    },
    watch: {
        server(val) {
            if (val) this.loadSerendipity();
        },
    },
    created: function () {
        this.getUserServer();
        this.loadSerendipity();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/serendipity.less";
</style>
