<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <div class="copyright">
        <span
          >版权所有 © 2017-2021 |
          ICP备 号-1| 备 号</span
        >
      </div>
    </el-container>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
// Vue3的setup语法不需要显式注册组件
</script>

<style lang="scss" scoped>
#app {
  .el-container {
    height: 100%;
    width: 100%;
    .el-header {
      padding: 0;
      background: #545c64;
    }
    .el-main {
      height: calc(100% - 60px);
      padding: 0;
      background: #00113b;
    }
    .el-main::-webkit-scrollbar { // 自定义滚动条的伪对象选择器  设置滚动条隐藏
      width: 0 !important;
    }
    .copyright {
      bottom: 0;
      width: 100%;
      height: 26px;
      background: #000000;
      text-align: center;
    }
    .copyright span {
      color: #ffffff;
      font-size: 14px;
    }
  }
}

/* CodeMirror styles */
:global(.CodeMirror) {
  height: 100% !important;
  width: 100% !important;
}

:global(.CodeMirror span) {
  font-family: Consolas, 'Courier New';
  line-height: 24px;
}
</style>
