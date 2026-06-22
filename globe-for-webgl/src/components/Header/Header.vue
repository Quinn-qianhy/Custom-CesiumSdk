<template>
  <div id="header" style="background: #03030a;box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15); height: 68px">
    <img src="/static/Images/dj-logo.png" alt="" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#03030a"
      text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
      <el-menu-item index="/Examples">示例</el-menu-item>
      <el-menu-item index="/APIView">API</el-menu-item>
      <el-menu-item index="/Development">开发教程</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref("/Examples")
const router = useRouter()

const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  router.push(key);
  // console.log(key, keyPath);
}
</script>
<style lang="scss" scoped>
#header {
  img {
    float: left;
    margin: 5px;
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .el-menu {
    float: left;
    margin-right: 100px;
    // width: 400px;
    left: 20%;
    font-family: 'PingFangSC, PingFangSC-Regular';

    text-decoration:none .el-menu-item {
      width: 64px;
      height: 22px;
      font-size: 16px;
      // font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      // text-align: left;
      color: #ffffff;
      // line-height: 22px;
    }
  }

  .el-menu-demo {
    border-bottom: none;
  }
}
</style>
