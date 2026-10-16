/** 示例菜单 — 缩略图按引擎放在 public/examples/{engine}/cards/ */
const menu = [
  {
    subMenu: '场景控制',
    menuItem: [
      {
        menuItemName: '基础场景',
        pages: [
          {
            name: '基础场景浏览',
            image: '/examples/cesium/cards/viewer.png',
            type: 'html',
            url: '/examples/cesium/html/viewer.html'
          },
          {
            name: '场景出图（导出图片）',
            image: '/examples/cesium/cards/sceneScreenshot.png',
            type: 'html',
            url: '/examples/cesium/html/sceneScreenshot.html'
          },
          {
            name: '自定义空间背景图',
            image: '/examples/cesium/cards/backgroundPicture.png',
            type: 'html',
            url: '/examples/cesium/html/backGroundMap.html'
          },
          {
            name: '自定义天空盒',
            image: '/examples/cesium/cards/skyboxPicture.png',
            type: 'html',
            url: '/examples/cesium/html/mapRotation.html'
          },
          {
            name: '动态天空盒',
            image: '/examples/cesium/cards/Dynamic SkyBox.gif',
            type: 'html',
            url: '/examples/cesium/html/Dynamic SkyBox.html'
          },
          {
            name: '测试用窗口',
            image: '/examples/cesium/cards/development.png',
            type: 'html',
            url: '/examples/cesium/html/text.html'
          }
        ]
      },
      {
        menuItemName: '视图切换和对比',
        pages: [
          {
            name: '颜色调整',
            image: '/examples/cesium/cards/adjustmentColor.png',
            type: 'html',
            url: '/examples/cesium/html/adjustmentColor.html'
          },
          {
            name: '多屏联动',
            image: '/examples/cesium/cards/doubleView.png',
            type: 'html',
            url: '/examples/cesium/html/doubleView.html'
          },
          {
            name: '卷帘对比',
            image: '/examples/cesium/cards/slidingWindow.gif',
            type: 'html',
            url: '/examples/cesium/html/slidingWindow.html'
          },
          {
            name: '地表透明',
            image: '/examples/cesium/cards/Transparent.gif',
            type: 'html',
            url: '/examples/cesium/html/Transparent.html'
          },
          {
            name: '二三维视图切换',
            image: '/examples/cesium/cards/viewSwitch.png',
            type: 'html',
            url: '/examples/cesium/html/viewSwitch.html'
          }
        ]
      },
      {
        menuItemName: '相机视角控制',
        pages: [
          {
            name: '开场动画',
            image: '/examples/cesium/cards/openAnimation.gif',
            type: 'html',
            url: '/examples/cesium/html/openAnimation.html'
          },
          {
            name: '地球旋转',
            image: '/examples/cesium/cards/openAnimation.gif',
            type: 'html',
            url: '/examples/cesium/html/rotationMap.html'
          },
          {
            name: '绕点飞行',
            image: '/examples/cesium/cards/RouteFlyManager.gif',
            type: 'html',
            url: '/examples/cesium/html/rotationPoint.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '限定视角范围',
            image: '/examples/cesium/cards/limitCameraView.gif',
            type: 'html',
            url: '/examples/cesium/html/limitCameraView.html'
          },
          {
            name: '视角历史记录',
            image: '/examples/cesium/cards/viewRecord.png',
            type: 'html',
            url: '/examples/cesium/html/viewRecord.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '路径飞行',
            image: '/examples/cesium/cards/RouteFlyManager.gif',
            type: 'html',
            url: '/examples/cesium/html/RouteFlyManager.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          }
        ]
      }
    ]
  },
  {
    subMenu: '地图与地形服务',
    menuItem: [
      {
        menuItemName: '在线地图',
        pages: [
          {
            name: '百度地图',
            image: '/examples/cesium/cards/baiduMapOffset.png',
            type: 'html',
            url: '/examples/cesium/html/baiduMap.html'
          },

          {
            name: '高德地图',
            image: '/examples/cesium/cards/gaodeMap.png',
            type: 'html',
            url: '/examples/cesium/html/gaodeMap.html'
          },
          {
            name: 'ArcGis Online地图',
            image: '/examples/cesium/cards/arcMapOnline.png',
            type: 'html',
            url: '/examples/cesium/html/arcMapOnline.html'
          },
          {
            name: 'OSM地图',
            image: '/examples/cesium/cards/OsmMap.png',
            type: 'html',
            url: '/examples/cesium/html/OsmMap.html',
            statusTags: ['hint'],
            statusHint: 'OSM 服务 需要配置代理服务'
          },
          {
            name: '反色滤镜地图',
            image: '/examples/cesium/cards/mapColorFilter.png',
            type: 'html',
            url: '/examples/cesium/html/mapColorFilter.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          }
        ]
      },
      {
        menuItemName: '三维地形',
        pages: [
          {
            name: 'CesiumIon地形',
            image: '/examples/cesium/cards/chinaExaggeration.png',
            type: 'html',
            url: '/examples/cesium/html/chinaExaggeration.html'
          },
          {
            name: 'ARCGIS地形',
            image: '/examples/cesium/cards/arcgisTerrain.png',
            type: 'html',
            url: '/examples/cesium/html/arcGisTerrain.html',
            statusTags: ['hint'],
            statusHint: '使用 ArcGIS 地形服务, 不能随时加载成功'
          },
          {
            name: 'SuperMap超图在线地形',
            image: '/examples/cesium/cards/SuperMapOnlineTerrain.png',
            type: 'html',
            url: '/examples/cesium/html/SuperMapOnlineTerrain.html'
          },
          {
            name: 'Mars3D在线地形',
            image: '/examples/cesium/cards/Mars3DOnlineTerrain.png',
            type: 'html',
            url: '/examples/cesium/html/Mars3DOnlineTerrain.html'
          },
          {
            name: '局部地形（本地）',
            image: '/examples/cesium/cards/localTerrain.png',
            type: 'html',
            url: '/examples/cesium/html/localTerrain.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '地形夸张',
            image: '/examples/cesium/cards/terrainExaggeration.png',
            type: 'html',
            url: '/examples/cesium/html/terrainExaggeration.html'
          }
        ]
      },
      {
        menuItemName: '标准瓦片服务',
        pages: [
          {
            name: '本地单张图片',
            image: '/examples/cesium/cards/singlePicture.png',
            type: 'html',
            url: '/examples/cesium/html/singleMap.html'
          },
          {
            name: '本地区域影像',
            image: '/examples/cesium/cards/localImage.png',
            type: 'html',
            url: '/examples/cesium/html/localImage.html'
          },
          {
            name: 'geoserver WMS服务',
            image: '/examples/cesium/cards/geoserverWMS.png',
            type: 'html',
            url: '/examples/cesium/html/geoserverWMS.html',
            statusTags: ['hint'],
            statusHint: '请在左上角面板填写 WMS 服务地址与图层名称，点击「加载 WMS」'
          },
          {
            name: 'geoserver WMTS服务',
            image: '/examples/cesium/cards/geoserverWMTS.png',
            type: 'html',
            url: '/examples/cesium/html/geoserverWMTS.html',
            statusTags: ['hint'],
            statusHint: '请在左上角面板填写 WMTS 服务地址与图层名称，点击「加载 WMTS」'
          },
          {
            name: 'TMS服务',
            image: '/examples/cesium/cards/geoserverTMS.png',
            type: 'html',
            url: '/examples/cesium/html/geoserverTMS.html',
            statusTags: ['hint'],
            statusHint: '请在左上角面板填写 TMS 服务地址，点击「加载 TMS」'
          }
        ]
      }
    ]
  },
  {
    subMenu: '控件配置',
    menuItem: [
      {
        menuItemName: '内置控件',
        pages: [
          {
            name: 'POI兴趣点搜索',
            image: '/examples/cesium/cards/POIsearch.png',
            type: 'html',
            url: '/examples/cesium/html/POIsearch.html'
          },
          {
            name: '偏振立体(VR)',
            image: '/examples/cesium/cards/Polarized Stereo.png',
            type: 'html',
            url: '/examples/cesium/html/Polarized Stereo.html'
          },
          {
            name: '时间控制器',
            image: '/examples/cesium/cards/timeController.png',
            type: 'html',
            url: '/examples/cesium/html/timeController.html'
          }
        ]
      },
      {
        menuItemName: '自定义控件',
        pages: [
          {
            name: '导航控件',
            image: '/examples/cesium/cards/navigation.png',
            type: 'html',
            url: '/examples/cesium/html/navigation.html'
          },
          {
            name: '鹰眼控件',
            image: '/examples/cesium/cards/OverviewMap.png',
            type: 'html',
            url: '/examples/cesium/html/OverviewMap.html'
          },
          {
            name: '状态栏控件',
            image: '/examples/cesium/cards/statusBar.png',
            type: 'html',
            url: '/examples/cesium/html/statusBar.html'
          },
          {
            name: '气泡弹窗',
            image: '/examples/cesium/cards/Prompt.png',
            type: 'html',
            url: '/examples/cesium/html/prompt.html'
          }
        ]
      }
    ]
  },
  {
    subMenu: '绘制与加载',
    menuItem: [
      {
        menuItemName: '点线面',
        pages: [
          {
            name: '绘制点线面',
            image: '/examples/cesium/cards/drawGeometry.png',
            type: 'html',
            url: '/examples/cesium/html/drawGeometry.html'
          }
        ]
      },
      {
        menuItemName: '加载实体',
        pages: [
          {
            name: '加载实体点',
            image: '/examples/cesium/cards/entityPoint.png',
            type: 'html',
            url: '/examples/cesium/html/entityPoint.html'
          },
          {
            name: '加载实体线',
            image: '/examples/cesium/cards/entityPolyline.png',
            type: 'html',
            url: '/examples/cesium/html/entityPolyline.html'
          },
          {
            name: '实体线材质',
            image: '/examples/cesium/cards/entityPolylineMaterial.png',
            type: 'html',
            url: '/examples/cesium/html/entityPolylineMaterial.html'
          },
          {
            name: '加载实体面',
            image: '/examples/cesium/cards/entityPolygon.png',
            type: 'html',
            url: '/examples/cesium/html/entityPolygon.html'
          }
        ]
      },
      {
        menuItemName: '基础点对象',
        pages: [
          {
            name: '聚合点',
            image: '/examples/cesium/cards/clusterPoint.png',
            type: 'html',
            url: '/examples/cesium/html/clusterPoint.html'
          },
          {
            name: '动态效果点',
            image: '/examples/cesium/cards/pointDynamic.gif',
            type: 'html',
            url: '/examples/cesium/html/pointDynamic.html'
          },
          {
            name: '图标点加文字(primitive)',
            image: '/examples/cesium/cards/Icon with Text.png',
            type: 'html',
            url: '/examples/cesium/html/Icon with Text.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: 'Primitive大量点',
            image: '/examples/cesium/cards/pointsPrimitive.png',
            type: 'html',
            url: '/examples/cesium/html/pointPrimitive.html'
          },
          {
            name: '旋转棱锥',
            image: '/examples/cesium/cards/entityRotaryPyramid.gif',
            type: 'html',
            url: '/examples/cesium/html/entityRotaryPyramid.html'
          }
        ]
      },
      {
        menuItemName: '基础线对象',
        pages: [
          {
            name: '光晕线',
            image: '/examples/cesium/cards/glowPolyline.png',
            type: 'html',
            url: '/examples/cesium/html/glowPolyline.html'
          },
          {
            name: '动态Path轨迹线',
            image: '/examples/cesium/cards/PathTrackLine.gif',
            type: 'html',
            url: '/examples/cesium/html/Path Track Line.html'
          },
          {
            name: '迁徙效果',
            image: '/examples/cesium/cards/migrationPolyline.gif',
            type: 'html',
            url: '/examples/cesium/html/migrationPolyline.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: 'Polyline Volume管线',
            image: '/examples/cesium/cards/PolylineVolume.png',
            type: 'html',
            url: '/examples/cesium/html/PolylineVolume.html'
          }
        ]
      },
      {
        menuItemName: '基础面对象',
        pages: [
          {
            name: '矩形(promitives)',
            image: '/examples/cesium/cards/Primitives Rectangle.png',
            type: 'html',
            url: '/examples/cesium/html/Primitives Rectangle.html'
          },
          {
            name: '动态墙对象',
            image: '/examples/cesium/cards/entityWall.gif',
            type: 'html',
            url: '/examples/cesium/html/entityWall.html'
          },
          {
            name: '绘制反选遮罩',
            image: '/examples/cesium/cards/maskLayer.png',
            type: 'html',
            url: '/examples/cesium/html/mask.html'
          },
          {
            name: '雷达扫描',
            image: '/examples/cesium/cards/RadarScan.gif',
            type: 'html',
            url: '/examples/cesium/html/RadarScan.html'
          },
          {
            name: '圆形波纹',
            image: '/examples/cesium/cards/RippleCircular.gif',
            type: 'html',
            url: '/examples/cesium/html/RippleCircular.html'
          },
          {
            name: '圆形扩散',
            image: '/examples/cesium/cards/DiffusionCircle.gif',
            type: 'html',
            url: '/examples/cesium/html/DiffusionCircle.html'
          }
        ]
      }
    ]
  },
  {
    subMenu: '量算与分析',
    menuItem: [
      {
        menuItemName: '空间分析',
        pages: [
          {
            name: '量算',
            image: '/examples/cesium/cards/measure.png',
            type: 'html',
            url: '/examples/cesium/html/measure.html'
          },
          {
            name: '缓冲分析',
            image: '/examples/cesium/cards/Buffer Analysis.png',
            type: 'html',
            url: '/examples/cesium/html/Buffer Analysis.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '限高分析',
            image: '/examples/cesium/cards/HeightLimitAnalysis.gif',
            type: 'html',
            url: '/examples/cesium/html/HeightLimitAnalysis.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '通视分析',
            image: '/examples/cesium/cards/Line of Sight Analysis.png',
            type: 'html',
            url: '/examples/cesium/html/Line of Sight Analysis.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '天际线分析',
            image: '/examples/cesium/cards/Skyline Analysis.png',
            type: 'html',
            url: '/examples/cesium/html/Skyline Analysis.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件'
          },
          {
            name: '可视域分析',
            image: '/examples/cesium/cards/Viewshed Analysis.png',
            type: 'html',
            url: '/examples/cesium/html/Viewshed Analysis.html',
            status: 'pending',
            statusTags: ['cesium-api'],
            statusReason: '使用定制 Cesium API 或扩展插件（cesium-viewshed.js）'
          }
        ]
      },
      {
        menuItemName: '地形分析',
        pages: [
          {
            name: '地形开挖(凸多边形)',
            image: '/examples/cesium/cards/globeClip.png',
            type: 'html',
            url: '/examples/cesium/html/globeClip.html'
          },
          {
            name: '地形开挖(任意多边形)',
            image: '/examples/cesium/cards/globeClipArbitrarily.png',
            type: 'html',
            url: '/examples/cesium/html/globeClipArbitrarily.html'
          },
          {
            name: '淹没分析',
            image: '/examples/cesium/cards/Inundation Analysis.gif',
            type: 'html',
            url: '/examples/cesium/html/Inundation Analysis.html'
          },
          {
            name: '坡度坡向分析',
            image: '/examples/cesium/cards/SlopeAspectAnalysis.png',
            type: 'html',
            url: '/examples/cesium/html/SlopeAspectAnalysis.html',
            status: 'pending',
            statusTags: ['server-data', 'cesium-api'],
            statusReason: '依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件'
          }
        ]
      },
      {
        menuItemName: '模型相关',
        pages: [
          {
            name: '3dtiles模型剖切（BIM）',
            image: '/examples/cesium/cards/BIMClip.png',
            type: 'html',
            url: '/examples/cesium/html/BIMClip.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '倾斜模型裁剪开挖',
            image: '/examples/cesium/cards/photographyClip.png',
            type: 'html',
            url: '/examples/cesium/html/photographyClip.html'
          },
          {
            name: '倾斜模型局部压平',
            image: '/examples/cesium/cards/3DTilesFlatten.gif',
            type: 'html',
            url: '/examples/cesium/html/3DTilesFlatten.html'
          },
          {
            name: '3dtiles拾取效果',
            image: '/examples/cesium/cards/3dtileStylePicking.png',
            type: 'html',
            url: '/examples/cesium/html/3dtileStylePicking.html'
          },
          {
            name: '3dtileStyle批量着色',
            image: '/examples/cesium/cards/3dtileFeatureStyling.png',
            type: 'html',
            url: '/examples/cesium/html/3dtileFeatureStyling.html'
          },
          {
            name: '倾斜摄影模型建筑单体化(分栋)',
            image: '/examples/cesium/cards/3dtilesMonomerization.png',
            type: 'html',
            url: '/examples/cesium/html/3dtilesMonomerization.html'
          },
          {
            name: '倾斜摄影模型建筑单体化(分层)',
            image: '/examples/cesium/cards/3DTiles_Monomerization.png',
            type: 'html',
            url: '/examples/cesium/html/3DTiles_Monomerization.html'
          }
        ]
      }
    ]
  },
  {
    subMenu: '可视化特效',
    menuItem: [
      {
        menuItemName: '实体特效',
        pages: [
          {
            name: '飞线',
            image: '/examples/cesium/cards/PolylineTrailMaterialProperty.gif',
            type: 'html',
            url: '/examples/cesium/html/PolylineTrailMaterialProperty.html'
          },
          {
            name: '面渐变填充',
            image: '/examples/cesium/cards/PolyGradientMaterialProperty.png',
            type: 'html',
            url: '/examples/cesium/html/PolyGradientMaterialProperty.html',
            status: 'pending',
            statusTags: ['server-data', 'cesium-api'],
            statusReason: '依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件'
          },
          {
            name: '火焰粒子',
            image: '/examples/cesium/cards/Flame Particles System.gif',
            type: 'html',
            url: '/examples/cesium/html/Flame Particles System.html'
          },
          {
            name: '喷泉粒子',
            image: '/examples/cesium/cards/Fountain Particle System.gif',
            type: 'html',
            url: '/examples/cesium/html/Fountain Particle System.html'
          },
          {
            name: '柱状统计',
            image: '/examples/cesium/cards/Histogram.png',
            type: 'html',
            url: '/examples/cesium/html/Histogram.html',
            status: 'pending',
            statusTags: ['server-data', 'cesium-api'],
            statusReason: '依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件'
          },
          {
            name: '天气粒子(雨、雾、雪)',
            image: '/examples/cesium/cards/weatherEffects.gif',
            type: 'html',
            url: '/examples/cesium/html/weatherEffects.html'
          }
        ]
      },
      {
        menuItemName: '场景特效',
        pages: [
          {
            name: '水面倒影',
            image: '/examples/cesium/cards/Reflector.png',
            type: 'html',
            url: '/examples/cesium/html/Reflector.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: 'MSAA抗锯齿',
            image: '/examples/cesium/cards/MSAA.png',
            type: 'html',
            url: '/examples/cesium/html/MSAA.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '视频投放',
            image: '/examples/cesium/cards/Video Delivery.gif',
            type: 'html',
            url: '/examples/cesium/html/Video Delivery.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '夜视效果',
            image: '/examples/cesium/cards/NightVisionEffect.png',
            type: 'html',
            url: '/examples/cesium/html/NightVisionEffect.html'
          },
          {
            name: '景深效果',
            image: '/examples/cesium/cards/DepthOfFieldEfect.png',
            type: 'html',
            url: '/examples/cesium/html/DepthOfFieldEfect.html'
          },
          {
            name: '黑白效果',
            image: '/examples/cesium/cards/BlackAndWhiteEffect.png',
            type: 'html',
            url: '/examples/cesium/html/BlackAndWhiteEffect.html'
          },
          {
            name: '马赛克效果',
            image: '/examples/cesium/cards/MosaicEffect.png',
            type: 'html',
            url: '/examples/cesium/html/MosaicEffect.html'
          },
          {
            name: '日照阴影',
            image: '/examples/cesium/cards/SunlightShadow.gif',
            type: 'html',
            url: '/examples/cesium/html/SunlightShadow.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          }
        ]
      },
      {
        menuItemName: '其它',
        pages: [
          {
            name: '热力图',
            image: '/examples/cesium/cards/HeatMap.png',
            type: 'html',
            url: '/examples/cesium/html/HeatMap.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '热力图3D',
            image: '/examples/cesium/cards/HeatMap3D.gif',
            type: 'html',
            url: '/examples/cesium/html/HeatMap3D.html'
          },
          {
            name: '等高线',
            image: '/examples/cesium/cards/Contour Line.png',
            type: 'html',
            url: '/examples/cesium/html/Contour Line.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          }
        ]
      }
    ]
  },
  {
    subMenu: '矢量数据',
    menuItem: [
      {
        menuItemName: '',
        pages: [
          {
            name: 'GeoJson图层(POI数据)',
            image: '/examples/cesium/cards/geojson-PoiLayer.png',
            type: 'html',
            url: '/examples/cesium/html/geojson-PoiLayer.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '流动水域面',
            image: '/examples/cesium/cards/Water Surface Geojson.gif',
            type: 'html',
            url: '/examples/cesium/html/Water Surface Geojson.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: 'KML图层',
            image: '/examples/cesium/cards/KML_data.png',
            type: 'html',
            url: '/examples/cesium/html/KML_data.html'
          }
        ]
      }
    ]
  },
  {
    subMenu: '三维模型',
    menuItem: [
      {
        menuItemName: '3DTiles模型',
        pages: [
          {
            name: '水面倒影（在线数据）',
            image: '/examples/cesium/cards/3DTilesPicture.png',
            type: 'html',
            url: '/examples/cesium/html/ReflectorOnline.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          },
          {
            name: '建筑白模',
            image: '/examples/cesium/cards/3DTile_building.png',
            type: 'html',
            url: '/examples/cesium/html/3DTile_building.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖第三方地图服务或 API Key'
          },
          {
            name: '建筑白模材质特效',
            image: '/examples/cesium/cards/3DTile_buildingMaterial.png',
            type: 'html',
            url: '/examples/cesium/html/3DTile_buildingMaterial.html',
            statusTags: ['hint'],
            statusHint: '使用 Cesium Ion 资产的建筑白模'
          },
          {
            name: '管道流向动态展示',
            image: '/examples/cesium/cards/3DTile_pipeline_uv_speed.png',
            type: 'html',
            url: '/examples/cesium/html/3DTile_pipeline_uv_speed.html',
            status: 'pending',
            statusTags: ['server-data'],
            statusReason: '依赖本地/内网服务器数据'
          }
        ]
      }
    ]
  },
  {
    subMenu: 'Vue 组件示例',
    menuItem: [
      {
        menuItemName: '材质 Material',
        pages: [
          {
            name: '内置线材质',
            image: '/examples/cesium/cards/development.png',
            type: 'vue',
            url: 'ownLine'
          },
          {
            name: '自定义线材质',
            image: '/examples/cesium/cards/development.png',
            type: 'vue',
            url: 'customLine'
          },
          {
            name: '内置面材质',
            image: '/examples/cesium/cards/development.png',
            type: 'vue',
            url: 'ownPolygon'
          },
          {
            name: '自定义面材质',
            image: '/examples/cesium/cards/development.png',
            type: 'vue',
            url: 'customPolygon'
          }
        ]
      },
      {
        menuItemName: '图层',
        pages: [
          {
            name: '百度地图 (Vue)',
            image: '/examples/cesium/cards/baiduMap.png',
            type: 'vue',
            url: 'baiduLayer'
          }
        ]
      },
      {
        menuItemName: 'Entity 绘制',
        pages: [
          {
            name: 'entity点',
            image: '/examples/cesium/cards/entityPoint.png',
            type: 'vue',
            url: 'entityPoint'
          },
          {
            name: 'entity线',
            image: '/examples/cesium/cards/entityPolyline.png',
            type: 'vue',
            url: 'entityLine',
            status: 'pending',
            statusReason: '组件尚未实现'
          },
          {
            name: 'entity面',
            image: '/examples/cesium/cards/entityPolygon.png',
            type: 'vue',
            url: 'entityRectangle',
            status: 'pending',
            statusReason: '组件尚未实现'
          }
        ]
      }
    ]
  }
]

export default menu
