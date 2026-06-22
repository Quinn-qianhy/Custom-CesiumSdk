<template>
   <el-row>
       <el-col :span='4' class="col-4">
           
       </el-col>
       <el-col :span='16' class="col-16">
            <el-aside width="200px">
               <el-menu background-color="#001547" text-color="#fff" @open="handleOpen" @close="handleClose">
                   <el-submenu index="prepare">
                        <template #title>
                            <span>准备</span>
                        </template>
                        <el-menu-item index="1-1">获取SDK</el-menu-item>
                        <el-menu-item index="1-2">引入文件</el-menu-item>
                   </el-submenu>
                   <el-submenu index="Initialize">
                        <template #title>
                            <span >初始化地图</span>
                        </template>
                        <el-menu-item index="2-1">初始化</el-menu-item>
                        <el-menu-item index="2-2">飞入</el-menu-item>
                   </el-submenu>
                   <el-submenu index="effects">
                        <template #title>
                            <span>实体特效</span>
                        </template>
                        <el-menu-item index="3-1">面渐变填充</el-menu-item>
                        <el-menu-item index="3-2">动态墙体</el-menu-item>
                   </el-submenu>
               </el-menu>
            </el-aside>
            <el-main ref="examplesListPanel">
                <div id="prepare" class="content-title">准备</div>
                <div class="content-subtitle">获取SDK</div>
                <div class="content-text">
                    开发时需要引入Cesium。包括Cesium.js文件、Cesium.css文件及相应的worker文件，可联系商务获取这些文件。
                </div>
                <div class="content-subtitle">引入文件</div>
                <div class="content-text">
                    获取文件后,只需要像普通的 JavaScript 库一样用 script 标签引入即可。
                </div>
                <div id="Initialize" class="content-title">初始化地图</div>
                <div class="content-subtitle">初始化</div>
                <div class="content-text"> 初始化地图代码如下：</div>
                        <Codemirror 
                        ref="myCm" id="code_editor"
                        :value="msg2"
                        :options="cmOptions"
                        class="code"
                        ></Codemirror>
                <div  class="content-subtitle">飞入</div>
                <div class="content-text"> 飞行到指定位置代码如下：</div>
                        <Codemirror 
                        ref="myCm" id="code_editor"
                        :value="msg3"
                        :options="cmOptions"
                        class="code"
                        ></Codemirror>
                <div id="effects" class="content-title">实体特效</div>
                <div  class="content-subtitle">面渐变填充</div>
                <div class="content-text"> 面渐变填充代码如下：</div>
                        <Codemirror 
                        ref="myCm" id="code_editor"
                        :value="msg4"
                        :options="cmOptions"
                        class="code"
                        ></Codemirror>
                <img src="/static/Images/面渐变.jpg"  style="height: 700px; width: 1000px"/>
                <div  class="content-subtitle">动态墙体</div>
                <div class="content-text"> 动态墙体代码如下：</div>
                        <Codemirror 
                        ref="myCm" id="code_editor"
                        :value="msg5"
                        :options="cmOptions"
                        class="code"
                        ></Codemirror>
                <img src="/static/Images/动态墙.jpg"  style="height: 700px; width: 1000px"/>
            </el-main>
       </el-col>
       <el-col :span='4' class="col-4">
          
       </el-col>
   </el-row>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
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

    //autofresh
    import 'codemirror/addon/display/autorefresh.js'
    
    const examplesListPanel = ref(null)
    const myCm = ref(null)
    
    const msg1 = ref(``)
    const msg2 = ref(``)
    const msg3 = ref(``)
    const msg4 = ref(``)
    const msg5 = ref(``)
    
    const cmOptions = {
        tabSize: 4,
        foldGutter: false,
        styleActiveLine: false,
        lineNumbers: false,
        line: false,
        autoRefresh:false,
        keyMap: "sublime",
        mode: 'text/x-vue',
        theme: 'base16-dark',
    }

    onMounted(() => {      
        msg2.value = `
let map = new Cesium.Map("map", {
    fullscreenButton: true,
    imageryProvider: new Cesium.GoogleImageryProvider(),
    contextOptions: {
        requestWebgl2: true,
        msaa: true,
        multisampleNum: 1,
    }
});
`
        msg3.value = `
function flyTo() {
map.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(119.6909, 30.15, 1000),
    orientation: {
        heading: 0.09545131503544901,
        pitch: -0.7670453352947222,
        roll: 0.00038362839268746285
    }
});
}
`
        msg4.value = `
var promise = Cesium.GeoJsonDataSource.load("***/geojson/bazhong_region.geojson"); //加载行政区划geojson数据
promise.then(function(dataSource) {
    viewer.dataSources.add(dataSource);
    var entities = dataSource.entities.values;
    var colorHash = {};
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity.name;
        entity.polygon.material = new Cesium.PolyGradientMaterialProperty({
        color: Cesium.Color.fromRandom(),//每个面设置随机颜色
        alphaPower: 1.3
        });
        entity.polygon.extrudedHeight = 1000;
    }
    viewer.zoomTo(dataSource.entities)
})
`
        msg5.value = `
viewer.entities.add({
    name: '方形箭头材质',
    wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
        [104.053733, 30.695891, 500,
        104.068885, 30.696580, 500,
        104.068805, 30.686952, 500,
        104.053733, 30.686011, 500,
        104.053733, 30.695891, 500
        ]),
    material: new Cesium.PolylineFlowMaterialProperty({
        image: "/*/*/*/*.png",
        color: Cesium.Color.fromCssColorString("#ffff00"),
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 10 // 速度，建议取值范围1-100
    })
    }
})
viewer.entities.add({
    name: '规则纯色墙体',
    wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
        [104.054815, 30.753495,500,
        104.081255, 30.754257,500,
        104.082284, 30.748255,500,
        104.084748, 30.740141,500,
        104.080557, 30.735556,500,
        104.080023, 30.733741,500,
        104.066846, 30.733737,500,
        104.055531, 30.733151,500,
        104.054787, 30.735978,500,
        104.051994, 30.739036,500,
        104.050691, 30.7416,500,
        104.051215, 30.744734,500,
        104.054815, 30.753495,500,]),
    material: new Cesium.PolylineFlowMaterialProperty({
        image: "/*/*/*/*.png",
        color: Cesium.Color.fromCssColorString("#ff0000"),
        repeat: new Cesium.Cartesian2(1, 1),
        axisY: true,
        speed: 10 // 速度，建议取值范围1-100
    })
    }
})
`
    })
    
    const handleOpen = (key, keyPath) => {
        locationToEle(key);
    }
    
    const handleClose = (key, keyPath) => {
        locationToEle(key);
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
    
    const locationToEle = (id) => {
        const scrollTop = getPosition(document.getElementById(id)).y;
        examplesListPanel.value.$el.scrollTop = scrollTop - 100;
    }
</script>

<style lang="scss" scoped>
#code_editor {
    width: 100%;
    overflow: hidden;
}
.el-row {
    height: 100%;
    margin-left: -5px;
    margin-right: -5px;
    box-sizing: border-box;
}
.el-col {
    height: 100%;
    padding-left: -5px;
    padding-right: 5px;
}
.col-4 {
    background-color: #001546;
}
.col-16 {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    .el-aside {
        background: #001547ff;
        height: 100%;
        overflow: hidden;
    }
    .el-main {
        overflow-x: hidden;
        // position: relative;
        img {
            margin: 10px;
        }
    }
}
.el-menu :hover {
    background: linear-gradient(90deg, rgba(62, 143, 255, 0.5), rgba(0, 0, 0, 0));
    border-left: solid 1px #2867ffff;
}
.el-menu-item:focus{
    border-left: solid 3px #243cd2;
}
.content-title {
    font-size: 22px;
    font-weight: bold;
    color: #161616;
    padding-top: 56px;
}
.content-subtitle {
    font-size: 18px;
    height: 18px;
    line-height: 18px;
    font-weight: bold;
    margin-top: 34px;
    padding-left: 5px;
    border-left: solid 6px #243cd2;
}
.content-text {
    margin-top: 18px;
    font-size: 14px;
    line-height: 32px;
}
</style>