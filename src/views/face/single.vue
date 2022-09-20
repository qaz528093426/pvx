<template>
    <div class="v-face-single" v-loading="loading">
        <div class="m-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <el-input placeholder="请输入搜索内容" v-model="searcheTitle" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search" @click="getFaceList"></el-button>
            </el-input>
        </div>
        <!-- 海报banner -->
        <div class="f-s-banner" v-if="post.banner"><el-image style="width:100%;height:100%" :src="post.banner"></el-image></div>
        <!-- 基本信息 -->
        <div class="m-header">
            <!-- <img :src="'https://console.cnyixun.com/upload/avatar/2021/3/5/1893535.jpg?x-oss-process=style/avatar_m'" class="u-avatar" /> -->
            <h2 class="u-title">{{ title }}</h2>
            <div class="u-info">
                <div class="u-author u-info-margin">
                    By
                    <a class="u-name" :href="author_link" target="_blank">{{ author_name }}</a>
                    <time class="u-time">{{ updated_at }}</time>
                </div>
                <div class="u-info-client">
                    <!-- <span class="u-client" :class="client">{{ showClientLabel(client) }}</span> -->
                    <span :class="client">
                        <i class="u-client" v-if="post.star">STAR</i>
                        <i class="u-client" :class="client || 'std'">{{ showClientLabel(client) }}</i>
                        <i class="u-client" :class="body_type_info.class" v-if="body_type_info">{{body_type_info.name}}</i>
                    </span>
                    <!-- :href="edit_link" v-if="canEdit" -->
<!--                    <a class="u-info-margin" >
                        <i class="u-icon-edit el-icon-edit-outline"></i>
                        <span>编辑</span>
                    </a> -->
                </div>

            </div>
            <div class="u-desc" v-if="remark">{{ remark }}</div>
            <el-divider content-position="left">JX3BOX</el-divider>
        </div>

        <div class="m-single-pics" v-if="previewSrcList && previewSrcList.length">
            <el-carousel class="m-carousel" :interval="4000" type="card" arrow="always">
                <el-carousel-item v-for="(item, i) in previewSrcList" :key="i">
                    <div class="m-face-pic" @click="showOriginImage(i)"><el-image fit="contain" :src="item" class="u-pic" :preview-src-list="previewSrcList"></el-image></div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 购买区及下载区 -->
        <div class="m-face-tips">
            <div class="m-face-pay">
                <div class="m-face-pay-info">
                    <el-button type="text">作品类型：</el-button>
                    <span v-if="price_type==0">免费</span>
                    <span v-if="price_type!=0">收费</span>
                    <span v-if="price_type!=0" class="m-face-pay-type">
                        <el-button type="text">收费类型：</el-button>
                        <span v-if="price_type == 1">{{ price_count }} 盒币</span>
                        <span v-if="price_type == 2">{{ price_count }} 金箔</span>
                    </span>
                </div>
                <div class="m-face-pay-btn" v-if="price_type!=0 && !has_buy"><el-button type="warning" round size="small">购买</el-button></div>
            </div>
            <div>如数据中包含付费元素，将不可用于新建角色导入，如用于新建角色请点击最下方导出</div>
        </div>
        <div class="m-face-down">
            <el-divider content-position="left">下载列表</el-divider>
            <div class="m-face-files">
                <div v-if="downFileList.length==0">
                    暂无数据。
                </div>
                <ul  class="m-face-box-list" v-if="downFileList.length>0">
                    <li v-for="item in downFileList" :key="item.id">
                        <i  class="el-icon-document"></i>
                        <span>
                            {{item.describe?item.describe:'暂无描述'}}
                        </span>
                        <div  class="u-desc">
                            <span >
                                <i  class="el-icon-date"></i>
                                创建于 {{item.created_at}}
                            </span>
                        </div>
                        <div  class="el-button-group u-action">
                            <el-button  icon="el-icon-download" size="small" round @click="getDownUrl(item.uuid)">下载</el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <el-pagination
                small
                layout="prev, pager, next"
                :hide-on-single-page="downPageQueryInfo.pageSize > downPageQueryInfo.total"
                :page-size="downPageQueryInfo.pageSize"
                :current-page="downPageQueryInfo.pageIndex"
                :total="downPageQueryInfo.total"
                @current-change="getAccessoryList"
            ></el-pagination>
        </div>
       <div class="m-single-data">
            <el-divider content-position="left">独家数据分析</el-divider>
            <facedata v-if="facedata" :data="facedata" />
        </div>
        <!-- 点赞 -->
       <Thx class="m-thx" :postId="id" :postType="post_type" :postTitle="title" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true" />
        <!-- 评论 -->
        <div>
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" :category="post_type" />
        </div>
    </div>
</template>

<script>
import { resolveImagePath } from '@jx3box/jx3box-common/js/utils';
import { getOneFaceInfo, getAccessoryList,getDownUrl} from '@/service/face.js';
import { getStat, postStat } from '@jx3box/jx3box-common/js/stat';
import facedata from '@jx3box/jx3box-facedat/src/Facedat.vue';
import Comment from '@jx3box/jx3box-comment-ui/src/Comment.vue';
import { __Links } from '@jx3box/jx3box-common/data/jx3box.json';
import { showDate } from '@jx3box/jx3box-common/js/moment';
import { editLink, authorLink } from '@jx3box/jx3box-common/js/utils.js';
import User from '@jx3box/jx3box-common/js/user';
export default {
    name: 'single',
    components: { facedata, Comment },
    data: function() {
        return {
            loading: false,
            searcheTitle: '', //搜索值
            post: {},
            stat: {},
            has_buy: false, //是否购买
            client_map: {
                std: '重制',
                origin: '缘起',
                all: '双端'
            },
            body_type_info:null,
            body_type_arr: [
                {
                    name: '成男',
                    class: 'u-man',
                    type:1
                },
                {
                    name: '成女',
                    class: 'u-woman',
                    type:2
                },
                {
                    name: '萝莉',
                    class: 'u-girl',
                    type:6
                },
                {
                    name: '正太',
                    class: 'u-boy',
                    type:5
                }
            ],
            downFileList: [],
            downPageQueryInfo: {
                pageIndex: 1,
                pageSize: 15,
                total: 0
            }
        };
    },
    computed: {
        id: function() {
            return this.$route.params.id;
        },
        author_name: function() {
            return this.post?.author_name || '匿名';
        },
        updated_at: function() {
            return this.post?.updated_at || '';
        },
        author_link: function() {
            return this.post?.author_link || '';
        },
        client: function() {
            return this.post?.client || '';
        },
        remark: function() {
            return this.post?.remark || '';
        },
        facedata: function() {
            return this.post?.post_meta?.data || '';
        },
        meta: function() {
            return this.post?.post_meta || '';
        },
        title() {
            return this.post?.title || '无标题';
        },
        author_id() {
            return this.post?.user_id || '';
        },
        edit_link: function () {
            return editLink(this.post?.post_type, this.post?.ID);
        },
        post_type: function() {
            return this.post?.post_type || 'face';
        },
        price_type: function() {
            return this.post?.price_type || '';
        },
        price_count() {
            return this.post?.price_count || '0';
        },
        previewSrcList: function() {
            return this.post?.images || [];
        },
        // canEdit: function () {
        //     return this.post?.post_author == User.getInfo().uid || User.isEditor();
        // },
    },
    watch: {},
    created: function() {
        this.getData();
    },
    methods: {
        getFaceList() {
            this.$router.push({name:'list',params:{title:this.searcheTitle}})
        },
        getData() {
            if (this.id) {
                this.loading = true;
                getOneFaceInfo(this.id)
                    .then(res => {
                        this.post = this.$store.state.post = res.data.data;
                        document.title = this.post.title;
                        for(let i=0;i<this.body_type_arr.length;i++){
                            if(this.body_type_arr[i].type==this.post.body_type){
                                this.body_type_info=this.body_type_arr[i]
                            }
                        }
                        this.getAccessoryList();
                    })
                    .finally(() => {
                        this.loading = false;
                    });

                getStat('face', this.id).then(res => {
                    this.stat = res.data;
                });
                postStat('face', this.id);
            }
        },
        getAccessoryList() {
            getAccessoryList(this.id, this.downPageQueryInfo).then(res => {
                // console.log(res)
                let data = res.data.data;
                this.has_buy = data.has_buy;
                if(data.has_buy){
                    this.downFileList = data.list;
                    this.downPageQueryInfo.total = data.page.total;
                }

            });
        },
        getDownUrl(uuid){
          getDownUrl(this.id,uuid).then(res=>{
              window.location.href=res.data.data.url
          })
        },
        goBack() {
            this.$router.push({ name: 'list' });
        },
        showClientLabel: function(val) {
            return this.client_map[val];
        },
        showOriginImage: function(i) {
            console.log(i);
        }
    }
};
</script>

<style lang="less">
@import '~@/assets/css/face/single.less';
</style>
