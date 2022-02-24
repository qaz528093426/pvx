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
    <LeftSidebar>
      <Nav></Nav>
    </LeftSidebar>
    <Main :withoutRight="true">
      <div class="m-cooking m-main">
        <!-- 头部 -->
        <div class="m-cooking-header">
          <h1 class="u-title">技艺助手</h1>
          <div class="c-cooking-tabs">
            <el-radio-group v-model="type" size="medium" @change="changeType">
              <el-radio-button label="tailoring">缝纫</el-radio-button>
              <el-radio-button label="founding">锻造</el-radio-button>
              <el-radio-button label="cooking">烹饪</el-radio-button>
              <el-radio-button label="medicine">制药</el-radio-button>
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
                    <span>{{ item.name }}</span>
                  </template>
                  <div v-if="item.children.length > 0">
                    <el-menu-item
                      v-for="val in item.children"
                      :key="val.id"
                      :index="val.id"
                      @click="handleClickItem(val)"
                    >
                      <div class="c-cooking-itemNav flex-center-between">
                        {{ val.name }}
                        <div class="c-cooking-itemAct">
                          <el-button @click="addPanel(val)" size="mini">
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
            <div class="c-cooking-mainItem flex-column-center" v-if="itemObj">
              <div class="u-cooking-itemIcon"></div>
              <div class="u-cooking-itemName">{{ itemObj.name }}</div>
              <!-- <div></div> -->
            </div>
            <div v-if="itemObj">
              <div>
                <span> 货币消耗 </span>
              </div>
              <div>
                <span> 物品消耗 </span>
              </div>
            </div>
            <div></div>
          </div>
          <!-- 购物车 -->
          <div class="m-cooking-panel">
            <div>
              <div v-for="item in panelArr" :key="item.id">
                <Panel
                  :item="item"
                  @changePanel="changePanel"
                  @removePanel="removePanel"
                />
              </div>
            </div>
            <div>
              <div v-for="item in makingsArr" :key="item.id">
                <Makings :item="item" />
              </div>
            </div>
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
import Panel from "../../components/cooking/Panel.vue";
import Makings from "../../components/cooking/Makings.vue";
import { $node } from "@jx3box/jx3box-common/js/https";
export default {
  name: "Cooking",
  props: [],
  components: { Nav, Panel, Makings },
  data: function () {
    return {
      type: "tailoring",
      formArr: [
        { name: "上衣", id: "1", children: [] },
        { name: "下装", id: "2", children: [] },
      ], //物品类型表
      itemArr: [
        {
          name: "上衣1",
          formId: "1",
          id: "1",
          num: 1,
          children: [
            { name: "上衣材料1", id: "1", num: 5 },
            { name: "上衣材料2", id: "2", num: 3 },
            { name: "上衣材料3", id: "3", num: 3 },
          ],
        },
        {
          name: "上衣2",
          formId: "1",
          id: "2",
          num: 1,
          children: [
            { name: "上衣材料1", id: "1", num: 2 },
            { name: "上衣材料2", id: "2", num: 3 },
            { name: "上衣材料4", id: "4", num: 3 },
          ],
        },
        {
          name: "下装1",
          formId: "2",
          id: "3",
          num: 1,
          children: [
            { name: "下装1材料1", id: "5", num: 6 },
            { name: "下装1材料2", id: "6", num: 2 },
          ],
        },
        {
          name: "下装2",
          formId: "2",
          id: "4",
          num: 1,
          children: [
            { name: "下装2材料1", id: "7", num: 8 },
            { name: "下装2材料2", id: "8", num: 1 },
          ],
        },
      ], //物品列表
      itemName: "", //搜索的物品名称
      itemObj: null, //选中物品数据
      panelArr: [], //购物车数据
      makingsArr: [], //购物车需要材料数据
      AllListArr: [], //购物车需要材料全部数据
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getAppIcon,
    getData() {
      // $node()
      //   .get(`/manufacture/${this.type}`, {
      //     params: {
      //       client: "origin",
      //       mode: "simple",
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      this.formArr.forEach((item) => {
        this.itemArr.forEach((val) => {
          if (item.id == val.formId) {
            item.children.push(val);
          }
        });
      });
      console.log(this.formArr, "this.formArr");
    },
    changeType(e) {
      this.getData();
    }, //选择类型
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
    changePanel(obj) {
      this.panelArr.map((item) => {
        if (item.id == obj.item.id) {
          console.log(obj, "val");
          if (obj.currentValue > obj.oldValue) {
            console.log(this.AllListArr, "this.AllListArr");
            this.addMakings(obj.item.children);
          } else {
          }
        }
      });
    }, //点击增加购物车物品
    addPanel(val) {
      let arr = this.panelArr.filter((item) => val.id == item.id);
      // console.log(arr);
      if (arr.length > 0) {
        this.$message({
          message: "不可重复添加购物车",
          type: "warning",
        });
        return;
      }
      this.panelArr.push(val);
      this.addMakings(val.children);
    }, //加入购物车
    addMakings(arr) {
      this.AllListArr = [...this.AllListArr, ...arr];
      console.log(this.AllListArr, "AllListArr");
      const listArr = this.AllListArr.sort(
        (a, b) => parseInt(a.id) - parseInt(b.id)
      );
        this.makingsArr = listArr;
        for (let i = 0; i < this.makingsArr.length; i++) {
          let item = this.makingsArr[i];
          let nextItem = this.makingsArr[i + 1];
          if (nextItem && item.id == nextItem.id) {
            console.log(nextItem.num, item.num);
            nextItem.num += item.num;
            this.makingsArr.splice(i, 1);
          }
        }
    }, //添加材料
    removeMakings(arr) {
      console.log(arr);
      arr.forEach((item) => {
        console.log(item);
        this.makingsArr.filter((val) => val.id != item.id);
        console.log(
          this.makingsArr.filter((val) => val.id != item.id)
          // "this.makingsArr.filter((val) => val.id != item.id);"
        );
      });
      console.log(this.makingsArr, "removeMakings this.makingsArr");
    }, //移除材料
    removePanel(data) {
      this.removeMakings(data.children);
      this.panelArr.forEach((item, index) => {
        if (item.id == data.id) {
          console.log(item, "this.panelArr");
          this.panelArr.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
