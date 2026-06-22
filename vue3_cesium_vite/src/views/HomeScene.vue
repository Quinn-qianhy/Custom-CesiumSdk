<!--
 * @Author: qianhy
 * @Date: 2025-11-19 21:21:18
 * @LastEditTime: 2025-12-22 21:06:17
 * @LastEditors: qianhy
 * @Description: 
 * @FilePath: \vue3_cesium_vite\src\views\HomeScene.vue
-->
<template>
  <div class="main-layout">
    <div class="left-panel" :class="{ collapsed: isSidebarCollapsed }">
      <div class="left-sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <h2 class="title" v-show="!isSidebarCollapsed">HY 3D API 示例中心</h2>
          </div>
          <el-button 
            size="small" 
            class="is-text collapse-btn glow-effect" 
            :icon="isSidebarCollapsed ? ArrowRight : ArrowLeft" 
            @click="toggleSidebar" />
        </div>
        <div class="sidebar-content">
          <div class="search-section" v-show="!isSidebarCollapsed">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索菜单..."
              clearable
              @input="handleSearch"
              class="search-input"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <div class="menu-section">
            <el-tree
              ref="treeRef"
              :data="filteredTreeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              node-key="id"
              class="custom-tree-menu"
              :expand-on-click-node="true"
              :default-expanded-keys="['场景控制', '图层加载']"
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node" :class="{ 'collapsed-node': isSidebarCollapsed }">
                  <component 
                    :is="data.icon" 
                    v-if="data.icon" 
                    class="node-icon" 
                    :class="{ 'collapsed-icon': isSidebarCollapsed && node.level === 1 }"
                  />
                  <span 
                    :class="{'node-label-chidren': node.level > 1}"
                    class="node-label" 
                    v-if="!isSidebarCollapsed || node.level > 1"
                  >
                    {{ node.label }}
                  </span>
                  <span 
                    v-if="node.level === 1 && !isSidebarCollapsed" 
                    class="node-count"
                  >
                    {{ calculateChildrenCount(data.children) }}
                  </span>
                </div>
              </template>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="right-header">
        <TopNavbar 
          @go-to-api-page="goToAPIPage" 
          @go-to-links-page="goToLinksPage" 
          @switch-theme="switchTheme" />
      </div>
      <el-container class="layout-container-demo">
        <el-main ref="examplesListPanel">
          <template v-for="(item, index) in menuArray" :key="index">
            <el-divider :id="item.subMenu" content-position="left" class="big_divider">{{ item.subMenu }}</el-divider>
            <template v-for="_item in item.menuItem" :key="_item.menuItemName">
              <el-divider content-position="left" :id="_item.menuItemName">{{ _item.menuItemName }}</el-divider>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="__item in _item.pages" :key="__item" class="glow-effect">
                <img :src="__item.image" class="image" style="width:250px;height:250px;"
                  @click="openPage(__item.url, __item.name)" />
                <div style="padding: 10px;" class="pagename">
                  <span>{{ __item.name }}</span>
                </div>
              </el-card>
            </template>
          </template>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import MenuList from '../config/config.js'
import { ref, nextTick, toRef, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useExamplesStore } from '../stores/examplesStore'
import TopNavbar from '../components/general/TopNavbar.vue'
import { 
  ArrowLeft, 
  ArrowRight, 
  Search,
  Location,
  Edit,
  Setting,
  MagicStick,
  Pointer,
  Files
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'

const store = useExamplesStore() // 引入store
const examplesListPanel = ref(null)
const menuArray = ref([])
const isSidebarCollapsed = ref(false) // 添加折叠状态
const treeRef = ref(null)
const searchKeyword = ref('')
const $router = useRouter()

menuArray.value = MenuList

// 定义图标映射
const iconMap = {
  '场景控制': markRaw(Location),
  '矢量图形绘制': markRaw(Edit),
  '材质Material': markRaw(MagicStick),
  '控件': markRaw(Setting),
  '交互控制': markRaw(Pointer),
  '默认': markRaw(Files)
}

// 将菜单数据转换为树形结构并添加图标
const treeData = computed(() => {
  return menuArray.value.map(item => {
    // 根据分类名称选择图标
    const IconComponent = iconMap[item.subMenu] || iconMap['默认']
    
    return {
      id: item.subMenu,
      label: item.subMenu,
      icon: IconComponent,
      children: item.menuItem.map(menuItem => {
        return {
          id: menuItem.menuItemName,
          label: menuItem.menuItemName,
          menuItem: menuItem
        }
      })
    }
  })
})

// 根据搜索关键词过滤树形数据
const filteredTreeData = computed(() => {
  if (!searchKeyword.value) {
    return treeData.value
  }
  console.log(treeData.value, "treeData.value");
  
  const keyword = searchKeyword.value.toLowerCase()
  return treeData.value
    .map(category => {
      // 检查分类名称是否匹配
      const categoryMatch = category.label.toLowerCase().includes(keyword)
      
      // 过滤子菜单项
      const filteredChildren = category.children.filter(child => {
        return child.label.toLowerCase().includes(keyword)
      })
      
      // 如果分类名称匹配或者有子菜单项匹配，则返回该分类
      if (categoryMatch || filteredChildren.length > 0) {
        return {
          ...category,
          children: filteredChildren
        }
      }
      return null
    })
    .filter(item => item !== null)
})

// 树节点属性配置
const defaultProps = {
  children: 'children',
  label: 'label'
}
// 计算子节点总数
const calculateChildrenCount = (children) => {
  if (!children || !Array.isArray(children)) {
    return 0
  }
  let count = 0
  children.forEach(child => {
    if (child.menuItem && child.menuItem.pages && Array.isArray(child.menuItem.pages)) {
      count += child.menuItem.pages.length
    }
  })
  return count
}

// 处理树节点点击事件
const handleNodeClick = (data) => {
  // 如果点击的是叶子节点（具体菜单项），则定位到对应内容
  if (data.menuItem) {
    locationToEle(data.menuItem.menuItemName)
  }
}

// 处理搜索输入
const handleSearch = () => {
  // 搜索功能已经在 filteredTreeData 中实现
  // 这里可以添加额外的逻辑，比如自动展开所有节点
  nextTick(() => {
    if (treeRef.value) {
      // 展开所有节点以便查看搜索结果
      treeRef.value.setExpandedKeys(
        filteredTreeData.value.map(item => item.id)
      )
    }
  })
}

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  
  // 如果侧边栏折叠，则收缩所有节点
  if (isSidebarCollapsed.value && treeRef.value) {
    // 获取所有父节点的key
    const parentKeys = treeData.value.map(item => item.id)
    // 收缩所有父节点
    parentKeys.forEach(key => {
      const node = treeRef.value.getNode(key)
      if (node && node.expanded) {
        treeRef.value.store.getNode(key).expanded = false
      }
    })
  }
}

const handleOpen = (key, keyPath) => {
  locationToEle(key);
}
// 标签定位逻辑
let locationToEle = (id) => {
  const scrollTop = getPosition(document.getElementById(id)).y;
  if (examplesListPanel.value) {
    examplesListPanel.value.$el.scrollTop = scrollTop - 100;
  }
}
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
}

const handleClose = (key, keyPath) => {
  locationToEle(key);
}
// 页面跳转
const openPage = (url, name) => {
  const routeUrl = $router.resolve({
    path: '/examples'
  })
  localStorage.setItem('examplesTitle', `Vue3+Cesium示例:${name}`)
  localStorage.setItem('componentName', name) // 存储组件名称
  window.open(routeUrl.href + `${url}`, '_blank')
}

// 跳转到API页面
const goToAPIPage = () => {
  // 这里可以根据需要实现API页面跳转逻辑
  console.log('跳转到API页面')
}

// 跳转到友情链接页面
const goToLinksPage = () => {
  // 这里可以根据需要实现友情链接页面跳转逻辑
  console.log('跳转到友情链接页面')
}

// 切换主题背景
const switchTheme = () => {
  // 这里可以根据需要实现主题切换逻辑
  console.log('切换主题背景')
}
</script>

<style lang="scss" scoped>
@use '@/styles/homeScene.scss';
</style>