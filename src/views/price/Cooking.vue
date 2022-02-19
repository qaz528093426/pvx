<template>
  <div id="app">
    <Header></Header>
    <Breadcrumb
      name="技艺助手"
      slug="cooking"
      root="/pvx/cooking"
      :publishEnable="false"
      :adminEnable="false"
      :feedbackEnable="true"
      :crumbEnable="false"
    >
      <img
        slot="logo"
        svg-inline
        :src="getAppIcon('cooking')"
      />
    </Breadcrumb>
    <LeftSidebar>
      <Nav></Nav>
    </LeftSidebar>
    <Main :withoutRight="true">
      <div class="m-cooking m-main">
        <!-- 头部 -->
        <div class="m-cooking-header">
          <h1 class="u-title">技艺助手</h1>
          <div class="c-cooking-tabs">
            <el-radio-group
              v-model="type"
              size="medium"
              @change="search"
            >
              <el-radio-button label="sewing">缝纫</el-radio-button>
              <el-radio-button label="forging">锻造</el-radio-button>
              <el-radio-button label="cooking">烹饪</el-radio-button>
              <el-radio-button label="pharmacy">制药</el-radio-button>
              <el-radio-button label="furniture">梓匠</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 中央 -->
        <!-- <keep-alive include="PetList">
                    <router-view></router-view>
                </keep-alive> -->
        <div class="m-cooking-main flex-start-between">
          <!-- 左侧边 -->
          <div class="m-cooking-side">
            <div class="c-cooking-search">
              <el-autocomplete
                class="inline-input"
                v-model="itemName"
                :fetch-suggestions="querySearch"
                placeholder="请输入物品名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
            <div class="c-cooking-itemList">
              <el-menu>
                <el-submenu
                  v-for="item in formArr"
                  :key="item.id"
                  :index="item.id"
                >
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                  <div v-if="item.children.length>0">
                    <el-menu-item
                      v-for="val in item.children"
                      :key="val.id"
                      :index="val.id"
                      @click="handleClickItem(val)"
                    >
                      <div class="c-cooking-itemNav flex-center-between">
                        {{val.name}}
                        <div class="c-cooking-itemAct">
                          <el-button
                            @click="addPanel(val)"
                            size="mini"
                          >
                            加入购物车
                          </el-button>
                        </div>
                      </div>
                    </el-menu-item>
                  </div>

                </el-submenu>
              </el-menu>
            </div>
          </div>
          <!-- 内容 -->
          <div class="m-cooking-content">
            <div
              class="c-cooking-mainItem flex-column-center"
              v-if="itemObj"
            >
              <div class="u-cooking-itemIcon"></div>
              <div class="u-cooking-itemName">{{itemObj.name}}</div>
              <!-- <div></div> -->
            </div>
            <div v-if="itemObj">
              <div>
                <span>
                  货币消耗
                </span>
              </div>
              <div>
                <span>
                  物品消耗
                </span>
              </div>
            </div>
            <div></div>
          </div>
          <!-- 购物车 -->
          <div class="m-cooking-panel">
            <Panel :panelArr="panelArr" />
          </div>
        </div>
        <!-- 底部 -->
        <div class="m-cooking-footer"></div>
      </div>
      <Footer></Footer>
    </Main>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import Panel from "../../components/cooking/panel/Panel.vue";

export default {
  name: "Cooking",
  props: [],
  components: { Nav, Panel },
  data: function () {
    return {
      type: "sewing",
      formArr: [
        { name: "上衣", id: "1", children: [] },
        { name: "下装", id: "2", children: [] },
      ], //物品类型表
      itemArr: [
        { name: "上衣1", formId: "1", id: "1", num: 1 },
        { name: "上衣2", formId: "1", id: "2", num: 1 },
        { name: "下装1", formId: "2", id: "3", num: 1 },
        { name: "下装2", formId: "2", id: "4", num: 1 },
      ], //物品列表
      itemName: "", //搜索的物品名称
      itemObj: null, //选中物品数据
      panelArr: [], //购物车数据
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getAppIcon,
    getData() {
      this.formArr.forEach((item) => {
        this.itemArr.forEach((val) => {
          if (item.id == val.formId) {
            item.children.push(val);
          }
        });
      });
      console.log(this.formArr, "this.formArr");
    },
    handleClickItem(obj) {
      this.itemObj = {
        ...obj,
      };
    }, //选择物品
    handleNumberChange(val) {
      console.log(val);
    }, //添加物品到
    handleSelect() {}, //选择搜索的物品
    querySearch() {}, //搜索物品
    addPanel(val) {
      // if (this.panelArr.length > 0) {
      //   
      // }
      let arr = this.panelArr.filter((item) => val.id == item.id);
      console.log(arr);
      if (arr.length > 0) {
        this.$message({
          message: "不可重复添加购物车",
          type: "warning",
        });
        return;
      }
      this.panelArr.push(val);
    }, //加入购物车
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
