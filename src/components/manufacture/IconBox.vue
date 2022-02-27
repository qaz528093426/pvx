<template>
  <div class="GoodsBox">
      <img :src="iconLink(goodsData.IconID)" alt="" />
      <div>{{ goodsData.Name }}</div>
  </div>
</template>

<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { getOther, getItemsPrice } from "@/service/manufacture";
// import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
  name: "GoodsBox",
  props: ["goodsData"],
  watch: {},
  components: [],
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    iconLink,
  },
};
</script>

