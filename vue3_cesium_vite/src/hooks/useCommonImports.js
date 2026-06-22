import { ref, inject, onMounted } from 'vue'
import GUI from 'lil-gui'
import { useExamplesStore } from "../stores/examplesStore"
import * as Cesium from 'cesium'
/**
 * 自定义钩子函数，用于集中管理通用导入模块
 * @returns {Object} 包含常用模块的对象
 */
export function useCommonImports() {

  return {
    // Vue相关
    ref,
    inject,
    onMounted,
    
    // GUI库
    GUI,
    
    // Cesium相关
    Cesium,
    // store 相关
    useExamplesStore
  }
}