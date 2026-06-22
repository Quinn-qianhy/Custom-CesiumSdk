<template>
  <div id="demopage">
    <div id="codePanel" v-show="codeShow">
      <el-card class="box-card" :body-style="{ padding: 0, height: 'calc(100% - 37px)' }">
        <template #header>
          <div class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text" @click="runCode">运行</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="resetCode">重置</el-button>
          </div>
        </template>
        <Codemirror ref="myCm" id="code_editor" :value="msg" v-model="msg" :options="cmOptions" class="code">
        </Codemirror>
      </el-card>
    </div>

    <iframe id="page" :style="'width:' + iframeWidth" height="100%" frameborder="0"></iframe>
    <el-button id="code_editor_show" @click="hideCodeEditor" style="z-index: 9;">源代码</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Codemirror } from 'vue-codemirror'

// base style
import 'codemirror/lib/codemirror.css'

// theme css
import 'codemirror/theme/base16-dark.css'

// language
import 'codemirror/mode/vue/vue.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'

// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'

// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

// autofrom 'codemirror/addon/display/autorefresh.js'

const props = defineProps({
  url: String
})

const route = useRoute()
const codeShow = ref(false)
const iframeWidth = ref('100%')
const msg = ref(``)
const originMsg = ref(``)
const myCm = ref(null)

const cmOptions = {
  tabSize: 4,
  foldGutter: true,
  styleActiveLine: true,
  lineNumbers: true,
  line: true,
  autoRefresh: true,
  keyMap: "sublime",
  mode: 'text/x-vue',
  theme: 'base16-dark',
}

const hideCodeEditor = () => {
  codeShow.value = !codeShow.value
  if (codeShow.value) {
    iframeWidth.value = 'calc(100% - 600px)'
  } else {
    iframeWidth.value = '100%'
  }
}

const init = (path = '/static/examples/viewer.html') => {
  fetch(path)
    .then(response => response.text())
    .then(res => {
      document.getElementById('page').srcdoc = res
      msg.value = res
      originMsg.value = res
    })
}

const runCode = () => {
  document.getElementById('page').srcdoc = msg.value
}

const resetCode = () => {
  msg.value = originMsg.value
}

onMounted(() => {
  nextTick(() => {
    init(route.params.url.replace(/orisdom/g, "/"))
    var container = document.getElementById('demopage').parentNode.parentNode
    container.removeChild(container.childNodes[0])
    container.removeChild(container.childNodes[3])
  })
})
</script>
<style lang="scss" scoped>
#demopage {
  height: 100%;
  width: 100%;

  #codePanel {
    width: 600px;
    height: 100%;
    float: left;

    .el-card {
      border: 0;
      height: 100%;

      .card__header {
        .clearfix {
          .el-button {
            margin: -10px 5px 0 0;
          }
        }
      }

      #code_editor {
        // position: absolute;
        // left: 0;
        // top:60px;
        // width: 600px;
        height: 100%;
        // float: left;
      }
    }
  }

  #code_editor_show {
    position: absolute;
    bottom: 35px;
    left: 15px;
  }

  #page {
    float: left;
    // width: 100%;
  }
}
</style>