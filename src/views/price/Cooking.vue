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
      <img slot="logo" svg-inline :src="getAppIcon('cooking')" />
    </Breadcrumb>
    <LeftSidebar><Nav></Nav></LeftSidebar>
    <Main :withoutRight="true">
      <div class="m-cooking m-main">
        <!-- 头部 -->
        <div class="m-cooking-header">
          <h1 class="u-title">技艺助手</h1>
          <div class="c-cooking-tabs">
            <el-radio-group v-model="type" size="medium" @change="search">
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
        <div class="m-cooking-main">
          <!-- 左侧边 -->
          <div class="m-cooking-side">
            <div class="c-cooking-search">
              <el-autocomplete
                class="c-cooking-input"
                v-model="searchValue"
                :fetch-suggestions="querySearch"
                placeholder="搜索：名称，属性"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
            <div class="c-cooking-column">
              <el-menu @open="handleOpen" @close="handleClose">
                <el-submenu
                  v-for="(item, index) in typeColumnArr"
                  :key="item.index"
                  :index="item.index"
                >
                  <template slot="title">
                    <span>{{ item.title }}</span>
                  </template>
                  <el-menu-item
                    v-for="(subItem, i) in item.subTitle"
                    :key="subItem.index"
                    :index="subItem.index"
                    @click="handleClick(subItem)"
                  >
                    <div
                      class="c-cooking-menu-item"
                    >
                      {{ subItem.title }}
                      <div
                        class="c-cooking-menu-action"
                        v-if="subItem.actionBox"
                      >
                        <el-input-number
                          size="mini"
                          :min="1"
                          @change="handleNumber(this,index,i)"
                          v-model="subItem.buildNumber"
                        ></el-input-number>
                        <el-button icon="el-icon-plus" circle></el-button>
                      </div>
                    </div>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
          <!-- 内容 -->
          <div class="m-cooking-content"></div>
          <!-- 购物车 -->
          <div class="m-cooking-panel"></div>
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
export default {
  name: "Cooking",
  props: [],
  components: { Nav },
  data: function () {
    return {
      type: "sewing",
      typeColumnArr: [
        {
          title: "上衣",
          index: "1",
          subTitle: [
            {
              title: "上衣配方1",
              actionBox: false,
              index: "1-1",
              focal: false,
              getExp: 100,
              buildNumber: 1,
              moneyExpend: "600精力",
              consumeList: [
                {
                  title: "上衣材料1",
                  index: "1",
                },
                {
                  title: "上衣材料2",
                  index: "80",
                },
                {
                  title: "上衣材料3",
                  index: "2",
                },
              ],
            },
            {
              title: "上衣配方2",
              actionBox: false,
              index: "1-2",
              getExp: 500,
              buildNumber: 1,
              focal: false,
              moneyExpend: "300精力",
              consumeList: [
                {
                  title: "上衣材料1",
                  index: "90",
                },
                {
                  title: "上衣材料2",
                  index: "80",
                },
                {
                  title: "上衣材料3",
                  index: "55",
                },
              ],
            },
            {
              title: "上衣配方3",
              index: "1-3",
              actionBox: false,
              focal: true,
              buildNumber: 1,
              getExp: 900,
              moneyExpend: "200精力",
              consumeList: [
                {
                  title: "上衣材料1",
                  index: "9",
                },
                {
                  title: "上衣材料2",
                  index: "5",
                },
                {
                  title: "上衣材料3",
                  index: "2",
                },
              ],
            },
          ],
        },
        {
          title: "裤子",
          index: "2",
          subTitle: [
            {
              title: "裤子配方1",
              index: "2-1",
              focal: false,
              actionBox: false,
              buildNumber: 1,
              moneyExpend: "500精力",
              getExp: 200,
              consumeList: [
                {
                  title: "上衣材料1",
                  index: "5",
                },
                {
                  title: "上衣材料2",
                  index: "7",
                },
                {
                  title: "上衣材料3",
                  index: "5",
                },
              ],
            },
            {
              title: "裤子配方2",
              index: "2-2",
              focal: false,
              actionBox: false,
              buildNumber: 1,
              getExp: 300,
              moneyExpend: "1600精力",
              consumeList: [
                {
                  title: "裤子材料1",
                  index: "1",
                },
                {
                  title: "裤子材料2",
                  index: "80",
                },
                {
                  title: "裤子材料3",
                  index: "2",
                },
              ],
            },
            {
              title: "裤子配方3",
              index: "2-3",
              focal: true,
              actionBox: false,
              buildNumber: 1,
              getExp: 100,
              moneyExpend: "700精力",
              consumeList: [
                {
                  title: "裤子材料1",
                  index: "1",
                },
                {
                  title: "裤子材料2",
                  index: "80",
                },
                {
                  title: "裤子材料3",
                  index: "2",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getAppIcon,
    handleClick(item) {
      console.log(this.typeColumnArr, this.typeColumnArr[index][i]);
      console.log(i, index, this.typeColumnArr[index]);
    },
    handleMouse(index, i) {
      let type = this.typeColumnArr[index]["subTitle"][i]["actionBox"];
      this.typeColumnArr[index]["subTitle"][i]["actionBox"] = !type;
    },
    handleSelect() {},
    handleNumber(e) {},
    handleOpen() {
      console.log("handleOpen");
    },
    handleClose() {
      console.log("handleClose");
    },
    querySearch() {},
    search() {},
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
