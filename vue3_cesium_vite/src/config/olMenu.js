/** OpenLayers 示例菜单 */
const olMenu = [
  {
    subMenu: '基础地图',
    menuItem: [
      {
        menuItemName: '地图初始化',
        pages: [
          {
            name: '高德影像浏览',
            image: '/examples/openlayers/cards/olBasicMap.png',
            type: 'html',
            url: '/examples/openlayers/html/olBasicMap.html'
          }
        ]
      }
    ]
  },
  {
    subMenu: '官方示例',
    menuItem: [
      {
        menuItemName: '矢量与交互',
        pages: [
          {
            name: '矢量图层',
            image: '/examples/openlayers/cards/olVectorLayer.png',
            type: 'html',
            url: '/examples/openlayers/html/olVectorLayer.html',
            statusHint:
              '数据来自 openlayers.org/data/vector/ecoregions.json，悬停或点击可查看区域名称。'
          },
          {
            name: '交互绘制',
            image: '/examples/openlayers/cards/olDrawFeatures.png',
            type: 'html',
            url: '/examples/openlayers/html/olDrawFeatures.html',
            statusHint: '基于官方 Draw Features 示例改造，绘制类型通过左侧 GUI 菜单切换。'
          },
          {
            name: '点击弹窗',
            image: '/examples/openlayers/cards/olPopup.png',
            type: 'html',
            url: '/examples/openlayers/html/olPopup.html',
            statusHint: '基于官方 Popup 示例改造，点击地图显示 HDMS 坐标弹窗。'
          }
        ]
      },
      {
        menuItemName: '图层加载',
        pages: [
          {
            name: 'XYZ',
            image: '/examples/openlayers/cards/olXyz.png',
            type: 'html',
            url: '/examples/openlayers/html/olXyz.html',
            statusHint: '基于官方 XYZ 示例改造，使用 ImageTile 加载高德影像瓦片。'
          },
          {
            name: 'WebGL Tiles',
            image: '/examples/openlayers/cards/olWebglTiles.png',
            type: 'html',
            url: '/examples/openlayers/html/olWebglTiles.html',
            statusHint: '基于官方 WebGL Tiles 示例改造，WebGLTile 渲染栅格瓦片。'
          },
          {
            name: 'Tiled WMS',
            image: '/examples/openlayers/cards/olTiledWms.png',
            type: 'html',
            url: '/examples/openlayers/html/olTiledWms.html',
            statusHint: '基于官方 Tiled WMS 示例改造，叠加 GeoServer WMS 州界图层。'
          },
          {
            name: 'WMTS',
            image: '/examples/openlayers/cards/olWmts.png',
            type: 'html',
            url: '/examples/openlayers/html/olWmts.html',
            statusHint: '基于官方 WMTS 示例改造，叠加 USGS 地质 WMTS 图层。'
          },
          {
            name: 'XYZ Esri',
            image: '/examples/openlayers/cards/olXyzEsri.png',
            type: 'html',
            url: '/examples/openlayers/html/olXyzEsri.html',
            statusHint: '基于官方 XYZ Esri 示例改造，加载 ArcGIS REST 瓦片服务。'
          },
          {
            name: 'Canvas Tiles',
            image: '/examples/openlayers/cards/olCanvasTiles.png',
            type: 'html',
            url: '/examples/openlayers/html/olCanvasTiles.html',
            statusHint: '基于官方 Canvas Tiles 示例改造，TileDebug 显示 XYZ 瓦片坐标。'
          },
          {
            name: 'Tile Load Events',
            image: '/examples/openlayers/cards/olTileLoadEvents.png',
            type: 'html',
            url: '/examples/openlayers/html/olTileLoadEvents.html',
            statusHint: '基于官方 Tile Load Events 示例改造，底部进度条显示瓦片加载进度。'
          }
        ]
      },
      {
        menuItemName: 'Mapbox图层加载',
        pages: [
          {
            name: 'Mapbox Vector Tiles',
            image: '/examples/openlayers/cards/olMapboxVectorTiles.png',
            type: 'html',
            url: '/examples/openlayers/html/olMapboxVectorTiles.html',
            statusHint:
              '基于官方 Mapbox Vector Tiles 示例改造，需填写 Mapbox Access Token 后点击「加载地图」。'
          },
          {
            name: 'Advanced Mapbox Vector Tiles',
            image: '/examples/openlayers/cards/olMapboxVectorTilesAdvanced.png',
            type: 'html',
            url: '/examples/openlayers/html/olMapboxVectorTilesAdvanced.html',
            statusHint:
              '基于官方 Advanced Mapbox Vector Tiles 示例改造，自定义 tileGrid 复用瓦片以节省带宽。'
          },
          {
            name: 'Mapbox Vector Layer',
            image: '/examples/openlayers/cards/olMapboxVectorLayer.png',
            type: 'html',
            url: '/examples/openlayers/html/olMapboxVectorLayer.html',
            statusHint:
              '基于官方 Mapbox Vector Layer 示例改造，使用 ol-mapbox-style 的 MapboxVectorLayer。'
          },
          {
            name: 'Vector tiles created from a Mapbox Style object',
            image: '/examples/openlayers/cards/olMapboxStyle.png',
            type: 'html',
            url: '/examples/openlayers/html/olMapboxStyle.html',
            statusHint:
              '基于官方 mapbox-style 示例改造，ol-mapbox-style 从 Mapbox Style JSON 创建矢量瓦片地图。'
          },
          {
            name: 'Mapbox-gl Layer',
            image: '/examples/openlayers/cards/olMapboxLayer.png',
            type: 'html',
            url: '/examples/openlayers/html/olMapboxLayer.html',
            statusHint:
              '基于官方 Mapbox-gl Layer 示例改造，在 OpenLayers 中嵌入 mapbox-gl-js 图层与热力图叠加。'
          }
        ]
      },
      {
        menuItemName: '内置控件',
        pages: [
          {
            name: '鼠标位置',
            image: '/examples/openlayers/cards/olMousePosition.png',
            type: 'html',
            url: '/examples/openlayers/html/olMousePosition.html',
            statusHint: '基于官方 Mouse Position 示例改造，坐标显示在地图左下角。'
          },
          {
            name: '比例尺',
            image: '/examples/openlayers/cards/olScaleLine.png',
            type: 'html',
            url: '/examples/openlayers/html/olScaleLine.html',
            statusHint: '基于官方 Scale Line 示例改造，支持 ScaleLine / ScaleBar 切换。'
          },
          {
            name: '缩放滑块',
            image: '/examples/openlayers/cards/olZoomSlider.png',
            type: 'html',
            url: '/examples/openlayers/html/olZoomSlider.html',
            statusHint: '基于官方 Zoom Sliders 示例改造，可通过 GUI 切换三种样式。'
          },
          {
            name: '全屏控件',
            image: '/examples/openlayers/cards/olFullScreen.png',
            type: 'html',
            url: '/examples/openlayers/html/olFullScreen.html',
            statusHint: '基于官方 Full Screen 示例改造，点击右上角按钮进入全屏。'
          },
          {
            name: '鹰眼控件',
            image: '/examples/openlayers/cards/olOverviewMap.png',
            type: 'html',
            url: '/examples/openlayers/html/olOverviewMap.html',
            statusHint: '基于官方 OverviewMap 示例改造，右下角显示缩略鹰眼。'
          },
          {
            name: '版权信息',
            image: '/examples/openlayers/cards/olAttributions.png',
            type: 'html',
            url: '/examples/openlayers/html/olAttributions.html',
            statusHint: '基于官方 Attributions 示例改造，窄屏时自动折叠版权信息。'
          }
        ]
      },
      {
        menuItemName: '自定义控件',
        pages: [
          {
            name: '指北控件',
            image: '/examples/openlayers/cards/olCustomControls.png',
            type: 'html',
            url: '/examples/openlayers/html/olCustomControls.html',
            statusHint: '基于官方 Custom Controls 示例改造，自定义「N」按钮重置地图旋转。'
          }
        ]
      }
    ]
  }
]

export default olMenu
