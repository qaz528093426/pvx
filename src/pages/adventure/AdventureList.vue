<template>

  <div class="v-adventure-list">
    <div class="listGuide flex">
      <img src="../../assets/img/petbg.png" class="bg" />
      <div class="guideTil flex">
        <img src="../../assets/img/pettitle.png" />
        <img src="../../assets/img/boxlogo.png" />
      </div>
      <div class="screen flex">
        <div class="select flex">
          <el-radio-group v-model="adventureClassNum">
            <el-radio
              v-for="item in adventureClass"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </div>
        <div class="search flex">
          <el-input placeholder="输入奇遇名字搜索" v-model="keyword" clearable>
          </el-input>
        </div>


  </div>
</template>

<script>
import adventureClass from "../../assets/data/adventure_class.json";
export default {

  name: "adventureList",
  props: [],
  components: {},
  data: function () {
    return {
      adventureClass,
      adventureClassNum: 0,
      keyword: "",
    };
  },
  computed: {},
  watch: {},
  methods: {},
  filters: {},
  created: function () {},
  mounted: function () {},

    name: "adventureList",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},

};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
