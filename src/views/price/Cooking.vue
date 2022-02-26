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
        <div class="m-cooking-header flex-column-center">
          <h1 class="u-title">技艺助手</h1>
          <div class="flex-center-between">
            <div class="c-cooking-tabs">
              <el-radio-group v-model="type" size="medium" @change="changeType">
                <el-radio-button label="tailoring">缝纫</el-radio-button>
                <el-radio-button label="founding">锻造</el-radio-button>
                <el-radio-button label="cooking">烹饪</el-radio-button>
                <el-radio-button label="medicine">制药</el-radio-button>
                <el-radio-button label="furniture">梓匠</el-radio-button>
              </el-radio-group>
            </div>
            <div class="c-cooking-servers">
              <el-select v-model="serversName" placeholder="请选择服务器">
                <el-option
                  v-for="item in serversArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 中央 -->
        <div class="m-cooking-main flex-start-between">
          <!-- 左侧边 -->
          <div class="m-cooking-side">
            <div class="c-cooking-search">
              <el-input
                v-model="itemName"
                placeholder="请输入物品名称"
                @change="remoteMethod"
              ></el-input>
            </div>
            <div class="c-cooking-itemList">
              <el-menu :default-openeds="menuOpeneds">
                <el-submenu
                  v-for="item in formArr"
                  :key="item.BelongID"
                  :index="item.BelongID.toString()"
                >
                  <template slot="title">
                    <span>{{ item.BelongName }}</span>
                  </template>
                  <div v-for="val in itemArr" :key="val.ID">
                    <el-menu-item
                      v-if="val.Belong == item.BelongID"
                      :index="val.ID.toString()"
                      @click="handleClickItem(val)"
                    >
                      <ListItem :item="val" @addPanel="addPanel" />
                    </el-menu-item>
                  </div>
                </el-submenu>
              </el-menu>
            </div>
          </div>
          <!-- 内容 -->
          <div class="m-cooking-content">
            <ContentBox :item="itemObj" />
          </div>
          <!-- 购物车 -->
          <div class="m-cooking-panel">
            <div>
              <div v-for="item in panelArr" :key="item.ItemID">
                <Panel
                  :item="item"
                  :serversName="serversName"
                  @changePanel="changePanel"
                  @removePanel="removePanel"
                />
              </div>
            </div>
            <div>
              <div v-for="item in makingsArr" :key="item.id">
                <Makings :item="item" :serversName="serversName" />
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
import { getManufactures, getOther } from "@/service/cooking";
import Panel from "../../components/cooking/Panel.vue";
import Makings from "../../components/cooking/Makings.vue";
import ListItem from "../../components/cooking/ListItem.vue";
import ContentBox from "../../components/cooking/ContentBox.vue";
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";

export default {
  name: "Cooking",
  props: [],
  components: { Nav, Panel, Makings, ListItem, ContentBox },
  data: function () {
    return {
      type: "cooking",
      ProfessionID: "4",
      serversName: "", //服务器名字
      serversArr: [], //服务器列表
      menuOpeneds: [],
      loading: false, //搜索状态
      belongArr: [
        {
          BelongName: "回复类食品",
          BelongID: "10",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "辅助类食品",
          BelongID: "20",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "增强类食品",
          BelongID: "30",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "特殊食品",
          BelongID: "40",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "烹饪材料",
          BelongID: "50",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "宴席",
          BelongID: "60",
          ProfessionID: "4",
          children: [],
        },
        {
          BelongName: "帽子",
          BelongID: "10",
          ProfessionID: "5",
          children: [],
        },
        {
          BelongName: "上衣",
          BelongID: "20",
          ProfessionID: "5",
          children: [],
        },
        {
          BelongName: "裤子",
          BelongID: "30",
          ProfessionID: "5",
          children: [],
        },
        {
          BelongName: "鞋",
          BelongID: "40",
          ProfessionID: "5",
          children: [],
        },
        {
          BelongName: "腰带",
          BelongID: "50",
          ProfessionID: "5",
          children: [],
        },
        {
          BelongName: "护手",
          BelongID: "60",
          ProfessionID: "5",
          children: [],
        },
      ], //类型列表
      formArr: [], //物品类型表
      itemArr: [], //物品列表
      itemName: "", //搜索的物品名称
      itemObj: null, //选中物品数据
      panelArr: [], //购物车数据
      makingsArr: [], //购物车需要材料数据
    };
  },
  mounted() {
    this.serversArr = servers_std;
    this.serversName = servers_std[0];
    this.getData();
  },
  methods: {
    getAppIcon,
    getData() {
      this.formArr = [];
      getManufactures({
        type: this.type,
        name: this.itemName,
        // mode: "simple",
        client: "std",
      }).then((res) => {
        let arr = [];
        res.data.forEach((item) => {
          arr.push({
            Belong: item.Belong, //类型id
            RequireItem: this.addMakings(item), //素材列表
            Name: item.Name, //物品名字
            ItemID: item.ItemID,
            IconID: item.IconID,
            ID: item.ID,
            nLevel: item.nLevel, //需要等级
            NeedExpertise: item.NeedExpertise || 0, //是否需要专精 1是 其余不是
            CostVigor: item.CostVigor, //精力消耗
            szTip: item.szTip, //配方来源
          });
        });
        this.itemArr = arr;
        this.itemObj = this.itemArr[1];
      });
      this.belongArr.forEach((item) => {
        if (item.ProfessionID == this.ProfessionID) {
          this.menuOpeneds.push(item.BelongID);
          this.formArr.push(item);
        }
      });
    }, //获取物品数据
    addMakings(item) {
      let arr = [];
      for (let x = 0; x < 8; x++) {
        if (item[`RequireItemIndex${x}`]) {
          arr.push({
            RequireItemIndex: item[`RequireItemIndex${x}`], //素材 otherID
            RequireItemCount: item[`RequireItemCount${x}`], //素材需求数量
          });
        }
      }
      return arr;
    }, //素材index转换数组
    changeType(e) {
      switch (e) {
        case "cooking":
          this.ProfessionID = "4";
          break;
        case "tailoring":
          this.ProfessionID = "5";
          break;
        case "founding":
          this.ProfessionID = "6";
          break;
        case "medicine":
          this.ProfessionID = "7";
          break;
        case "furniture":
          this.ProfessionID = "15";
          break;
        default:
          break;
      }
      this.type = e;
      this.getData();
    }, //选择类型
    handleClickItem(item) {
      this.itemObj = item;
      console.log(this.itemObj);
    }, //选择物品
    remoteMethod(e) {
      this.itemName = e;
      this.getData();
      console.log(e);
    }, //搜索物品
    changePanel(obj) {
      // this.panelArr.map((item) => {
      //   if (item.id == obj.item.id) {
      //     console.log(obj, "val");
      //     if (obj.currentValue > obj.oldValue) {
      //       console.log(this.AllListArr, "this.AllListArr");
      //       this.addMakings(obj.item.children);
      //     } else {
      //     }
      //   }
      // });
    }, //点击增加购物车物品
    addPanel(item) {
      this.handleClickItem(item);
      if (this.panelArr.length == 20) {
        this.$message({
          message: "购物车已满",
          type: "warning",
        });
        return;
      }
      let arr = this.panelArr.filter((val) => val.ItemID == item.ItemID);
      // console.log(makingsArr, "makingsArr");
      let obj = {
        ItemID: item.ItemID,
        IconID: item.IconID,
        Name: item.Name,
        num: 1,
      };
      if (arr.length > 0) {
        this.$message({
          message: "不可重复添加购物车",
          type: "warning",
        });
        return;
      }
      this.panelArr.push(obj);
      this.makingsArr = [...this.makingsArr, ...item.RequireItem].sort(
        (a, b) => a.RequireItemIndex - b.RequireItemIndex
      );
    }, //加入购物车
    showMakings(arr) {
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let nextItem = arr[i + 1];
        if (nextItem && item.id == nextItem.id) {
          nextItem.num += item.num;
          console.log(nextItem.num, item.num, i);
          arr.splice(i, 1);
        }
      }
      return arr;
    },
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
      // this.removeMakings(data.children);
      this.panelArr.forEach((item, index) => {
        if (item.ItemID == data.ItemID) {
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
