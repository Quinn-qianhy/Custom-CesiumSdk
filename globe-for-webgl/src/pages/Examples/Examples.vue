<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#001547" text-color="#fff" active-text-color="#1844edff">
        <el-sub-menu :index="item.subMenu" v-for="item in menuArray" :key="item.subMenu">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.subMenu }}</span>
          </template>
          <el-menu-item :index="_item.menuItemName" v-for="_item in item.menuItem" :key="_item.menuItemName"
            @click="locationToEle(_item.menuItemName)">{{ _item.menuItemName }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main ref="examplesListPanel">
      <template v-for="item in menuArray" :key="item.subMenu">
        <el-divider :id="item.subMenu" content-position="left" class="big_divider">{{ item.subMenu
          }}</el-divider>
        <template v-for="_item in item.menuItem" :key="_item.menuItemName">
          <el-divider content-position="left" :id="_item.menuItemName">{{ _item.menuItemName
            }}</el-divider>
          <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="__item in _item.pages" :key="__item">
            <img :src="__item.image" class="image" style="width:237px;height:237px;" @click="openPage(__item.url)" />
            <div style="padding: 14px;" class="pagename">
              <span>{{ __item.name }}</span>
            </div>
          </el-card>
        </template>
      </template>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import menuArray from "./config.js";

const examplesListPanel = ref(null)
const router = useRouter()

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
  locationToEle(key);
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
  locationToEle(key);
};

const openPage = (url) => {
  console.log(window.location.origin, url, 'url');
  const resolvedRoute = router.resolve(`/ExamplesView/${url.replace(/\//g, "orisdom")}`)
  window.open(window.location.origin + resolvedRoute.href, '_blank')
};

const getPosition = (element) => {
  var xPosition = 0;
  var yPosition = 0;
  while (element) {
    xPosition +=
      element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
};

const locationToEle = (id) => {
  const scrollTop = getPosition(document.getElementById(id)).y;
  if (examplesListPanel.value) {
    examplesListPanel.value.$el.scrollTop = scrollTop - 100;
  }
};

onMounted(() => {
  nextTick(() => {
    if (examplesListPanel.value && examplesListPanel.value.$el) {
      examplesListPanel.value.$el.addEventListener(
        "scroll",
        e => {
          console.log("父滚动条到页面顶部距离", e.target.offsetTop);
          console.log("绝对距离", examplesListPanel.value.$el);
          console.log("相对距离", examplesListPanel.value.$el.scrollTop);
          console.log(
            "绝对距离",
            e.target.offsetTop + examplesListPanel.value.$el.scrollTop
          );
        },
        false
      );
    }

    // console.log(this.$refs['三维空间分析'].$el.scrollTop)
  });
});
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-aside {
    background: #001547ff;
    height: 100%;

    .el-menu {
      border-right: 0;

      .el-submenu {
        background-color: red !important;

        .el-submenu__title {
          background-color: blueviolet !important;
        }
      }

    }
  }

  .el-main {
    padding: 15px;

    .el-divider {
      float: left;
      background-color: #1844edff;
      position: relative;
      opacity: 0.3;
    }

    .big_divider {
      div {
        // width: 64px;
        height: 22px;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: 22px;
        // top: -10px;
        background: none;
      }
    }

    .el-card {
      cursor: pointer;
      float: left;
      text-align: center;
      margin-left: 15px;
      // width: 236px;
      background-color: #001547ff;
      color: white;
      border: #001547ff;
      border-radius: 2px;

      &:hover {
        // width: 250px;
        // margin-left: -1px;
        color: white;
        background: #001fff;
        border-color: #001fff;
      }

      .pagename {
        text-align: center;
      }
    }
  }

  .el-aside::-webkit-scrollbar {
    // 自定义滚动条的伪对象选择器  设置滚动条隐藏
    width: 0 !important;
  }

  .el-main::-webkit-scrollbar {
    // 自定义滚动条的伪对象选择器  设置滚动条隐藏
    width: 0 !important;
  }
}
</style>
<style scoped>
:deep(.el-submenu__title:hover) {
  background-color: linear-gradient(90deg,
      rgba(62, 143, 255, 0.5),
      rgba(0, 0, 0, 0)) !important;
}

.el-divider {
  background-color: #525252;
}

.el-divider__text {
  background-color: #00113b;
  color: #ffffff;
}
</style>