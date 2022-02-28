<template>
  <div class="Makings">
    <div v-for="item in makingArr" :key="item.id">
      <div v-if="item.show" class="c-Panel-itemNav flex-center-between">
        <div>
          <img :src="iconLink(item['item_info'][0]['IconID'])" alt="" />
        </div>
        <div>{{ `${item.Name} x${item.count}` }}</div>
        <GamePrice :price="item.Price" />
      </div>
    </div>
  </div>
</template>

<script>
// getMakingArr()
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { getOther, getItemsPrice } from "@/service/cooking";
// import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
  name: "Makings",
  props: {
    makings: {
      dataType: Array,
      default: null,
    },
    serversName: {
      dataType: String,
      default: "",
    },
  },
  watch: {
    makings: {
      deep: true,
      handler() {
        // console.log(oldVal, newVal, "deep");
        this.getMakingArr();
      },
    },
  },
  components: { GamePrice },
  data: function () {
    return {
      makingArr: [],
    };
  },
  mounted() {
    this.getMakingArr();
  },
  methods: {
    iconLink,
    getMakingArr() {
      console.log(this.makings, "getMakingArr");
      let arr = this.makings;
      arr = this.makingArr.sort((a, b) => a.ID - b.ID);
      console.log(arr, "arr==================>");
      arr.forEach((item, index) => {
        // console.log(item, index, "indexindex");
        if (arr[index + 1] && item.ID == arr[index + 1].ID) {
          // setItemsPrice(item['item_info'][0]['ItemID'])
          item.show = false;
          arr[index + 1].Price += item.Price;
          arr[index + 1].count += item.count;
        }
      });
      this.makingArr = arr;
    },
    setItemsPrice(id) {
      getItemsPrice({
        server: this.serversName,
        list: id,
      }).then((res) => {
        console.log(res.data);
        return 1234;
        // this.itemArr = res.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
