<template>
  <div class="activeCom" v-if="store.componentName != ''">
    <!-- 动态功能组件切换 -->
    <component :is="currentComponent " />
  </div>
</template>
<script setup>
import { ref, onMounted, watch, defineAsyncComponent, computed, defineComponent } from 'vue';
import { useExamplesStore } from '../../stores/examplesStore'
import comNames from '../../config/comNames'
// 动态功能组件切换
let currentComponent = null; // 存放组件实例对象
const store = useExamplesStore()
const currentComName = computed(() => {
  // console.log(store.componentName, localStorage.getItem('componentName')); 
  //新标签页打开时,store.componentName为空,localStorage.getItem('componentName')有值
  return comNames.find((item) => item.id === localStorage.getItem('componentName'))
})

// 遍历所有示例组件
const requireComponent = import.meta.globEager('../../components/**/*.vue');
Object.entries(requireComponent).forEach(async ([key, val]) => {
  // 匹配路径中的组件名称，忽略目录结构
  const componentName = key.replace(/^.*\/(\w+)\.vue$/, '$1');
  // console.log(componentName, currentComName.value.name, key, val.default);
  if (componentName === currentComName.value.name) {
    currentComponent = val.default
  }
});

</script>

<style lang="scss" scoped>
.activeCom {
  width: 100%;
  height: 100%;
  padding: 2px;
}
</style>