<!--
 * @Author: qianhy
 * @Date: 2025-11-25 14:05:06
 * @LastEditTime: 2025-11-29 20:50:17
 * @LastEditors: qianhy
 * @Description: 
 * @FilePath: \vue3_cesium_vite\src\views\CodePanel.vue
-->
<template>
  <div id="code-editor-panel">
    <div class="editor-header">
      <div class="header-left">
        <span class="title">示例代码</span>
        <el-tag type="primary">vue</el-tag>
      </div>
      <div class="header-right">
        <el-button-group>BUTOTN</el-button-group>
      </div>
    </div>
    <codemirror
      ref="myCm"
      id="code_editor"
      :model-value="msg"
      @update:model-value="handleCodeChange"
      :extensions="cmExtensions"
      class="code"
      height="100%"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
// vue-codemirror component
import { Codemirror } from "vue-codemirror";
// CodeMirror languages
import { javascript } from "@codemirror/lang-javascript";
import { vue } from "@codemirror/lang-vue";
// CodeMirror themes
import { oneDark } from "@codemirror/theme-one-dark";

const msg = ref(`console.log('Hello World')`);

const cmExtensions = [javascript(), vue(), oneDark];

const handleCodeChange = (value) => {
  msg.value = value;
};
</script>

<style lang="scss" scoped>
#code-editor-panel {
  background-color: #1e1e1e;
  border: 0.0625rem solid #206189;
  transition: all 0.3s ease;
  flex-shrink: 0;
  height: 90%;
  width: 30%;
  z-index: 2;
  margin: 0.5rem;
  .editor-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background-color: #2d2d30;
    border-bottom: 0.0625rem solid #3e3e42;
    .header-left {
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      .el-tag {
        height: 1.25rem;
        padding: 0 0.4375rem;
      }
      .title {
        font-size: 0.875rem;
        font-weight: 500;
        color: #ccc;
      }
    }
    .header-right {
      .el-button-group {
        border-radius: 0.25rem;
        border: 0.0625rem solid #3e3e42;
        .el-button {
          border-radius: 0;
        }
      }
    }
  }
}
</style>
