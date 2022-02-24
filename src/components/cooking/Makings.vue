<template>
  <div class="Makings">
    <div class="c-Panel-itemNav flex-center-between">
      <div>物品图标</div>
      <div>{{ `${item.name} x${item.num}` }}</div>
      <div>需要金钱</div>
    </div>
  </div>
</template>

<script>
// import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
  name: "Makings",
  props: ["item"],
  // components: { Item },
  data: function () {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
