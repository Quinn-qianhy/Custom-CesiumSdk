<template>
  <aside class="app-sidebar" :class="{ 'is-collapsed': isSidebarCollapsed }">
    <header class="app-sidebar__header">
      <div class="app-sidebar__brand">
        <div class="app-sidebar__logo" aria-hidden="true">
          <el-icon>
            <PhGlobeHemisphereWest weight="light" />
          </el-icon>
        </div>
        <div v-show="!isSidebarCollapsed" class="app-sidebar__title">
          <span class="app-sidebar__title-main">{{ currentEngine.label }}</span>
          <span class="app-sidebar__title-sub">示例中心</span>
        </div>
      </div>
      <button
        type="button"
        class="app-sidebar__toggle"
        :aria-label="isSidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'"
        :aria-expanded="!isSidebarCollapsed"
        @click="toggleSidebar"
      >
        <el-icon>
          <PhCaretDoubleRight v-if="isSidebarCollapsed" weight="light" />
          <PhCaretDoubleLeft v-else weight="light" />
        </el-icon>
      </button>
    </header>

    <div class="app-sidebar__body">
      <div v-show="!isSidebarCollapsed" class="app-sidebar__search">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索菜单..."
          clearable
          aria-label="搜索菜单"
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon>
              <PhMagnifyingGlass weight="light" />
            </el-icon>
          </template>
        </el-input>
      </div>

      <nav class="app-sidebar__menu" aria-label="示例分类导航">
        <el-tree
          ref="treeRef"
          :key="currentEngineId"
          class="app-sidebar__tree"
          :data="filteredTreeData"
          :props="defaultProps"
          node-key="id"
          highlight-current
          :expand-on-click-node="true"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <div class="app-sidebar__node">
              <component
                :is="data.icon"
                v-if="data.icon && node.level === 1"
                weight="light"
                class="app-sidebar__node-icon"
              />
              <span
                class="app-sidebar__node-label"
                :class="{ 'app-sidebar__node-label--child': node.level > 1 }"
                v-if="!isSidebarCollapsed || node.level > 1"
              >
                {{ node.label }}
              </span>
              <span v-if="node.level === 1 && !isSidebarCollapsed" class="app-sidebar__node-count">
                {{ calculateChildrenCount(data.children) }}
              </span>
            </div>
          </template>
        </el-tree>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, markRaw, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useEngineStore } from '@/stores/engineStore'
import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhMagnifyingGlass,
  PhGlobeHemisphereWest,
  PhCrosshair,
  PhMapTrifold,
  PhStack,
  PhCube,
  PhCursor,
  PhPencilSimpleLine,
  PhGearSix,
  PhMagicWand,
  PhDrop,
  PhChartBar,
  PhChartLine,
  PhRuler,
  PhFiles
} from '@phosphor-icons/vue'

const emit = defineEmits(['navigate'])

const engineStore = useEngineStore()
const { menuData, currentEngineId, currentEngine } = storeToRefs(engineStore)

const isSidebarCollapsed = ref(false)
const treeRef = ref<InstanceType<(typeof import('element-plus'))['ElTree']> | null>(null)
const searchKeyword = ref('')

// 窄屏下侧边栏是 fixed 覆盖层，进入该断点必须自动收起，避免挡住内容
const mobileMedia = window.matchMedia('(max-width: 992px)')
const syncCollapsedWithViewport = (event: MediaQueryList | MediaQueryListEvent) => {
  isSidebarCollapsed.value = event.matches
}
syncCollapsedWithViewport(mobileMedia)
mobileMedia.addEventListener('change', syncCollapsedWithViewport)
onBeforeUnmount(() => {
  mobileMedia.removeEventListener('change', syncCollapsedWithViewport)
})

const iconMap: Record<string, ReturnType<typeof markRaw>> = {
  场景控制: markRaw(PhCrosshair),
  地图与地形服务: markRaw(PhMapTrifold),
  图层加载: markRaw(PhStack),
  交互控制: markRaw(PhCursor),
  绘制与加载: markRaw(PhPencilSimpleLine),
  图形绘制: markRaw(PhPencilSimpleLine),
  控件配置: markRaw(PhGearSix),
  材质Material: markRaw(PhDrop),
  可视化特效: markRaw(PhChartBar),
  量算与分析: markRaw(PhRuler),
  空间分析: markRaw(PhChartLine),
  矢量数据: markRaw(PhFiles),
  三维模型: markRaw(PhCube),
  'Vue 组件示例': markRaw(PhMagicWand),
  矢量图形绘制: markRaw(PhPencilSimpleLine),
  控件: markRaw(PhGearSix),
  默认: markRaw(PhFiles)
}

const treeData = computed(() =>
  menuData.value.map((item) => {
    const IconComponent = iconMap[item.subMenu] || iconMap['默认']

    return {
      id: item.subMenu,
      label: item.subMenu,
      icon: IconComponent,
      children: item.menuItem.map((menuItem) => ({
        id: menuItem.menuItemName,
        label: menuItem.menuItemName,
        menuItem
      }))
    }
  })
)

const defaultExpandedKeys = ['场景控制', '图层加载']

const filteredTreeData = computed(() => {
  if (!searchKeyword.value) {
    return treeData.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return treeData.value
    .map((category) => {
      const categoryMatch = category.label.toLowerCase().includes(keyword)
      const filteredChildren = category.children.filter((child) =>
        child.label.toLowerCase().includes(keyword)
      )

      if (categoryMatch || filteredChildren.length > 0) {
        return { ...category, children: filteredChildren }
      }
      return null
    })
    .filter(Boolean)
})

const defaultProps = {
  children: 'children',
  label: 'label'
}

const calculateChildrenCount = (children: Array<{ menuItem?: { pages?: unknown[] } }>) => {
  if (!children?.length) {
    return 0
  }

  return children.reduce((count, child) => {
    const pages = child.menuItem?.pages
    return count + (Array.isArray(pages) ? pages.length : 0)
  }, 0)
}

const handleNodeClick = (data: { menuItem?: { menuItemName: string }; id?: string }) => {
  if (data.menuItem) {
    emit('navigate', data.menuItem.menuItemName)
    return
  }

  if (isSidebarCollapsed.value) {
    emit('navigate', data.id)
  }
}

const handleSearch = () => {
  nextTick(() => {
    const tree = treeRef.value as { setExpandedKeys?: (keys: string[]) => void } | null
    tree?.setExpandedKeys?.(
      filteredTreeData.value
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .map((item) => item.id)
    )
  })
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value

  if (isSidebarCollapsed.value && treeRef.value) {
    const tree = treeRef.value as {
      getNode: (id: string) => { expanded?: boolean } | undefined
      store: { getNode: (id: string) => { expanded: boolean } }
    }
    treeData.value.forEach((item) => {
      const node = tree.getNode(item.id)
      if (node?.expanded) {
        tree.store.getNode(item.id).expanded = false
      }
    })
  }
}
</script>

<style lang="scss">
@use '@/styles/sidebar.scss';
</style>
