<template>
    <div class="v-homeland-tutorial">
        <h1 class="m-homeland-title">家园指南</h1>

        <div class="m-homeland-info">
            <!-- TODO:配一张图 -->
            <div class="m-homeland-games">
                <ul>
                    <li v-for="(item, i) in game_data" :key="'game-' + i">
                        <el-popover placement="top-start" width="200" trigger="hover" :content="showGameTip(item.szTip)" popper-class="m-homeland-games-pop" v-if="showGameTip(item.szTip)">
                            <span slot="reference"
                                ><i class="u-pic"><img :src="showGamePic(item.szPath)" /></i> <span class="u-name">{{ item.szName }}</span></span
                            >
                        </el-popover>
                        <template v-else>
                            <i class="u-pic"><img :src="showGamePic(item.szPath)" /></i> <span class="u-name">{{ item.szName }}</span>
                        </template>
                    </li>
                </ul>
            </div>

            <!-- TODO:优化表格样式 -->
            <div class="m-homeland-levels">
                <table>
                    <caption>
                        家园升级表
                    </caption>
                    <thead>
                        <th>等级</th>
                        <th>属性1</th>
                        <th>属性2</th>
                        <th>属性3</th>
                        <th>属性4</th>
                        <th>5</th>
                        <th>园宅币</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in level_data" :key="'level' + i">
                            <td>{{ item.Level }}</td>
                            <td>{{ item.Attribute1 }}</td>
                            <td>{{ item.Attribute2 }}</td>
                            <td>{{ item.Attribute3 }}</td>
                            <td>{{ item.Attribute4 }}</td>
                            <td>{{ item.Attribute5 }}</td>
                            <td>{{ item.Currency }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- TODO:家园作品推荐 -->
            <div class="m-homeland-posts" v-if="posts && posts.length">
                <h2 class="m-homeland-subtitle">家园攻略</h2>
                <ul>
                    <li v-for="(item,i) in posts" :key="'post-' + i">
                        {{item}}
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<script>
import { getHomelandLevelUp, getHomelandGame } from "@/service/homeland.js";
import {getMenu} from '@jx3box/jx3box-common/js/api_misc'
export default {
    name: "Tutorial",
    props: [],
    components: {},
    data: function () {
        return {
            level_data: [],
            game_data: [],

            posts : []
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 加载基本信息
        loadInfo: function () {
            getHomelandLevelUp().then((res) => {
                this.level_data = res?.data;
            });
            getHomelandGame().then((res) => {
                this.game_data = res?.data;
            });
        },
        // 加载推荐作品
        loadData : function (){
            getMenu('homeland_rec').then((data) => {
                this.posts = data || []
            })  
        },

        // 显示日常图标
        showGamePic: function () {},

        // 显示活动介绍
        showGameTip : function (str){
            let output = str?.split('\\n')
            return output.length > 0 ? output[1] : ''
        }
    },
    mounted: function () {
        this.loadInfo();
        this.loadData()
    },
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/tutorial.less";
</style>
