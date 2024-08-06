<template>
  <div class="row-wrapper">
    <div class="col">
      <!-- 这里放置内容 -->
      第一个 el-col
      <br />
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button><el-button @click="increaseHeight">增加高度</el-button>

    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第二个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第三个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第二个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第三个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第二个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第三个 el-col
    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第一个 el-col
      <br />
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button>
      <el-button @click="increaseHeight">增加高度</el-button><el-button @click="increaseHeight">增加高度</el-button>

    </div>
    <div class="col">
      <!-- 这里放置内容 -->
      第三个 el-col
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>

<style scoped>
.row-wrapper{
  display: flex;
  justify-content: flex-start;
  line-height: 40px;
  flex-wrap: wrap;
}
.col {
  border: 1px solid #ccc;
  width: 25%;
}
</style>
