/** 示例菜单 — 缩略图统一放在 public/examples，路径 /examples/xxx */
const menu = [
  {
    "subMenu": "场景控制",
    "menuItem": [
      {
        "menuItemName": "基础场景",
        "pages": [
          {
            "name": "基础场景浏览",
            "image": "/examples/viewer.png",
            "type": "html",
            "url": "/examples/viewer.html"
          },
          {
            "name": "场景出图（导出图片）",
            "image": "/examples/sceneScreenshot.png",
            "type": "html",
            "url": "/examples/sceneScreenshot.html",
            "status": "ok",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "自定义空间背景图",
            "image": "/examples/backgroundPicture.png",
            "type": "html",
            "url": "/examples/backGroundMap.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "自定义天空盒",
            "image": "/examples/skyboxPicture.png",
            "type": "html",
            "url": "/examples/mapRotation.html",
            "status": "ok",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "动态天空盒",
            "image": "/examples/Dynamic SkyBox.gif",
            "type": "html",
            "url": "/examples/Dynamic SkyBox.html"
          },
          {
            "name": "测试用窗口",
            "image": "/examples/development.png",
            "type": "html",
            "url": "/examples/text.html"
          }
        ]
      },
      {
        "menuItemName": "视图切换和对比",
        "pages": [
          {
            "name": "颜色调整",
            "image": "/examples/adjustmentColor.png",
            "type": "html",
            "url": "/examples/adjustmentColor.html"
          },
          {
            "name": "双屏联动",
            "image": "/examples/doubleView.png",
            "type": "html",
            "url": "/examples/doubleView.html",
            "status": "pending",
          },
          {
            "name": "卷帘对比",
            "image": "/examples/slidingWindow.gif",
            "type": "html",
            "url": "/examples/slidingWindow.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "地表透明",
            "image": "/examples/Transparent.gif",
            "type": "html",
            "url": "/examples/Transparent.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "二三维视图切换",
            "image": "/examples/viewSwitch.png",
            "type": "html",
            "url": "/examples/viewSwitch.html"
          }
        ]
      },
      {
        "menuItemName": "相机视角控制",
        "pages": [
          {
            "name": "开场动画",
            "image": "/examples/openAnimation.gif",
            "type": "html",
            "url": "/examples/openAnimation.html"
          },
          {
            "name": "地球旋转",
            "image": "/examples/openAnimation.gif",
            "type": "html",
            "url": "/examples/rotationMap.html"
          },
          {
            "name": "绕点飞行",
            "image": "/examples/RouteFlyManager.gif",
            "type": "html",
            "url": "/examples/rotationPoint.html",
            "status": "pending",
          },
          {
            "name": "限定视角范围",
            "image": "/examples/limitCameraView.gif",
            "type": "html",
            "url": "/examples/limitCameraView.html"
          },
          {
            "name": "视角历史记录",
            "image": "/examples/viewRecord.png",
            "type": "html",
            "url": "/examples/viewRecord.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "路径飞行",
            "image": "/examples/RouteFlyManager.gif",
            "type": "html",
            "url": "/examples/RouteFlyManager.html",
            "status": "pending",
          }
        ]
      }
    ]
  },
  {
    "subMenu": "地图与地形服务",
    "menuItem": [
      {
        "menuItemName": "在线地图",
        "pages": [
          {
            "name": "百度地图",
            "image": "/examples/baiduMapOffset.png",
            "type": "html",
            "url": "/examples/baiduMap.html"
          },
          {
            "name": "OSM地图",
            "image": "/examples/OsmMap.png",
            "type": "html",
            "url": "/examples/OsmMap.html"
          },
          {
            "name": "反色滤镜地图",
            "image": "/examples/mapColorFilter.png",
            "type": "html",
            "url": "/examples/mapColorFilter.html",
            "status": "pending",
          },
          {
            "name": "高德地图",
            "image": "/examples/gaodeMap.png",
            "type": "html",
            "url": "/examples/gaodeMap.html"
          },
          {
            "name": "ArcGis Online地图",
            "image": "/examples/arcMapOnline.png",
            "type": "html",
            "url": "/examples/arcMapOnline.html"
          }
        ]
      },
      {
        "menuItemName": "三维地形",
        "pages": [
          {
            "name": "cesium地形",
            "image": "/examples/chinaExaggeration.png",
            "type": "html",
            "url": "/examples/chinaExaggeration.html"
          },
          {
            "name": "局部地形（本地）",
            "image": "/examples/localTerrain.png",
            "type": "html",
            "url": "/examples/localTerrain.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "ARCGIS地形",
            "image": "/examples/arcgisTerrain.png",
            "type": "html",
            "url": "/examples/arcGisTerrain.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "地形夸张",
            "image": "/examples/terrainExaggeration.png",
            "type": "html",
            "url": "/examples/terrainExaggeration.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          }
        ]
      },
      {
        "menuItemName": "标准瓦片服务",
        "pages": [
          {
            "name": "本地单张图片",
            "image": "/examples/singlePicture.png",
            "type": "html",
            "url": "/examples/singleMap.html"
          },
          {
            "name": "本地区域影像",
            "image": "/examples/localImage.png",
            "type": "html",
            "url": "/examples/localImage.html"
          },
          {
            "name": "geoserver WMS服务",
            "image": "/examples/geoserverWMS.png",
            "type": "html",
            "url": "/examples/geoserverWMS.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "TMS服务",
            "image": "/examples/3DTile_buildingMaterial.png",
            "type": "html",
            "url": "/examples/3DTile_buildingMaterial.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "控件配置",
    "menuItem": [
      {
        "menuItemName": "内置控件",
        "pages": [
          {
            "name": "POI兴趣点搜索",
            "image": "/examples/POIsearch.png",
            "type": "html",
            "url": "/examples/POIsearch.html"
          },
          {
            "name": "偏振立体(VR)",
            "image": "/examples/Polarized Stereo.png",
            "type": "html",
            "url": "/examples/Polarized Stereo.html"
          }
        ]
      },
      {
        "menuItemName": "自定义控件",
        "pages": [
          {
            "name": "导航控件",
            "image": "/examples/navigation.png",
            "type": "html",
            "url": "/examples/navigation.html"
          },
          {
            "name": "鹰眼控件",
            "image": "/examples/eagleEyeMap.png",
            "type": "html",
            "url": "/examples/eagleEyeMap.html"
          },
          {
            "name": "经纬度拾取",
            "image": "/examples/PickLocation.png",
            "type": "html",
            "url": "/examples/coordinateDisplay.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "绘制与加载",
    "menuItem": [
      {
        "menuItemName": "点线面",
        "pages": [
          {
            "name": "绘制点线面",
            "image": "/examples/drawGeometry.png",
            "type": "html",
            "url": "/examples/drawGeometry.html"
          }
        ]
      },
      {
        "menuItemName": "加载实体",
        "pages": [
          {
            "name": "加载实体点",
            "image": "/examples/entityPoint.png",
            "type": "html",
            "url": "/examples/entityPoint.html"
          },
          {
            "name": "加载实体线",
            "image": "/examples/entityPolyline.png",
            "type": "html",
            "url": "/examples/entityPolyline.html"
          },
          {
            "name": "实体线材质",
            "image": "/examples/entityPolylineMaterial.png",
            "type": "html",
            "url": "/examples/entityPolylineMaterial.html",
            "status": "pending",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "加载实体面",
            "image": "/examples/entityPolygon.png",
            "type": "html",
            "url": "/examples/entityPolygon.html"
          }
        ]
      },
      {
        "menuItemName": "基础点对象",
        "pages": [
          {
            "name": "聚合点",
            "image": "/examples/clusterPoint.png",
            "type": "html",
            "url": "/examples/clusterPoint.html"
          },
          {
            "name": "动态效果点",
            "image": "/examples/pointDynamic.gif",
            "type": "html",
            "url": "/examples/pointDynamic.html"
          },
          {
            "name": "图标点加文字(primitive)",
            "image": "/examples/Icon with Text.png",
            "type": "html",
            "url": "/examples/Icon with Text.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "Primitive大量点",
            "image": "/examples/pointsPrimitive.png",
            "type": "html",
            "url": "/examples/pointPrimitive.html"
          },
          {
            "name": "旋转棱锥",
            "image": "/examples/entityRotaryPyramid.gif",
            "type": "html",
            "url": "/examples/entityRotaryPyramid.html"
          }
        ]
      },
      {
        "menuItemName": "基础线对象",
        "pages": [
          {
            "name": "光晕线",
            "image": "/examples/glowPolyline.png",
            "type": "html",
            "url": "/examples/glowPolyline.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "动态Path轨迹线",
            "image": "/examples/PathTrackLine.gif",
            "type": "html",
            "url": "/examples/Path Track Line.html"
          },
          {
            "name": "迁徙效果",
            "image": "/examples/migrationPolyline.gif",
            "type": "html",
            "url": "/examples/migrationPolyline.html",
            "status": "pending",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "Polyline Volume管线",
            "image": "/examples/PolylineVolume.png",
            "type": "html",
            "url": "/examples/PolylineVolume.html"
          }
        ]
      },
      {
        "menuItemName": "基础面对象",
        "pages": [
          {
            "name": "矩形(promitives)",
            "image": "/examples/Primitives Rectangle.png",
            "type": "html",
            "url": "/examples/Primitives Rectangle.html"
          },
          {
            "name": "动态墙对象",
            "image": "/examples/entityWall.gif",
            "type": "html",
            "url": "/examples/entityWall.html",
            "status": "pending",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "绘制反选遮罩",
            "image": "/examples/maskLayer.png",
            "type": "html",
            "url": "/examples/mask.html"
          },
          {
            "name": "雷达扫描",
            "image": "/examples/RadarScan.gif",
            "type": "html",
            "url": "/examples/RadarScan.html"
          },
          {
            "name": "圆形波纹",
            "image": "/examples/RippleCircular.gif",
            "type": "html",
            "url": "/examples/RippleCircular.html"
          },
          {
            "name": "圆形扩散",
            "image": "/examples/DiffusionCircle.gif",
            "type": "html",
            "url": "/examples/DiffusionCircle.html"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "量算与分析",
    "menuItem": [
      {
        "menuItemName": "空间分析",
        "pages": [
          {
            "name": "量算",
            "image": "/examples/measure.png",
            "type": "html",
            "url": "/examples/measure.html"
          },
          {
            "name": "缓冲分析",
            "image": "/examples/Buffer Analysis.png",
            "type": "html",
            "url": "/examples/Buffer Analysis.html",
            "status": "pending",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "限高分析",
            "image": "/examples/HeightLimitAnalysis.gif",
            "type": "html",
            "url": "/examples/HeightLimitAnalysis.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "通视分析",
            "image": "/examples/Line of Sight Analysis.png",
            "type": "html",
            "url": "/examples/Line of Sight Analysis.html",
            "status": "pending",
            "statusTags": [
              "cesium-api"
            ],
            "statusReason": "使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "天际线分析",
            "image": "/examples/Skyline Analysis.png",
            "type": "html",
            "url": "/examples/Skyline Analysis.html"
          },
          {
            "name": "可视域分析",
            "image": "/examples/Viewshed Analysis.png",
            "type": "html",
            "url": "/examples/Viewshed Analysis.html",
            "status": "pending",
            "statusTags": [
              "server-data",
              "cesium-api"
            ],
            "statusReason": "依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件；缺少插件: ViewShed3D.js"
          }
        ]
      },
      {
        "menuItemName": "地形分析",
        "pages": [
          {
            "name": "地形开挖(凸多边形)",
            "image": "/examples/globeClip.png",
            "type": "html",
            "url": "/examples/globeClip.html"
          },
          {
            "name": "地形开挖(任意多边形)",
            "image": "/examples/globeClipArbitrarily.png",
            "type": "html",
            "url": "/examples/globeClipArbitrarily.html"
          },
          {
            "name": "淹没分析",
            "image": "/examples/Inundation Analysis.gif",
            "type": "html",
            "url": "/examples/Inundation Analysis.html"
          },
          {
            "name": "坡度坡向分析",
            "image": "/examples/SlopeAspectAnalysis.png",
            "type": "html",
            "url": "/examples/SlopeAspectAnalysis.html",
            "status": "pending",
            "statusTags": [
              "server-data",
              "cesium-api"
            ],
            "statusReason": "依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件"
          }
        ]
      },
      {
        "menuItemName": "模型相关",
        "pages": [
          {
            "name": "3dtiles模型剖切（BIM）",
            "image": "/examples/BIMClip.png",
            "type": "html",
            "url": "/examples/BIMClip.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "倾斜模型裁剪开挖",
            "image": "/examples/photographyClip.png",
            "type": "html",
            "url": "/examples/photographyClip.html"
          },
          {
            "name": "倾斜模型局部压平",
            "image": "/examples/3DTilesFlatten.gif",
            "type": "html",
            "url": "/examples/3DTilesFlatten.html"
          },
          {
            "name": "3dtiles拾取效果",
            "image": "/examples/3dtileStylePicking.png",
            "type": "html",
            "url": "/examples/3dtileStylePicking.html"
          },
          {
            "name": "3dtileStyle批量着色",
            "image": "/examples/3dtileFeatureStyling.png",
            "type": "html",
            "url": "/examples/3dtileFeatureStyling.html"
          },
          {
            "name": "倾斜摄影模型建筑单体化(分栋)",
            "image": "/examples/3dtilesMonomerization.png",
            "type": "html",
            "url": "/examples/3dtilesMonomerization.html"
          },
          {
            "name": "倾斜摄影模型建筑单体化(分层)",
            "image": "/examples/3DTiles_Monomerization.png",
            "type": "html",
            "url": "/examples/3DTiles_Monomerization.html"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "可视化特效",
    "menuItem": [
      {
        "menuItemName": "实体特效",
        "pages": [
          {
            "name": "飞线",
            "image": "/examples/PolylineTrailMaterialProperty.gif",
            "type": "html",
            "url": "/examples/PolylineTrailMaterialProperty.html",
            "status": "pending",
            "statusTags": [
              "server-data",
              "cesium-api"
            ],
            "statusReason": "依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "面渐变填充",
            "image": "/examples/PolyGradientMaterialProperty.png",
            "type": "html",
            "url": "/examples/PolyGradientMaterialProperty.html",
            "status": "pending",
            "statusTags": [
              "server-data",
              "cesium-api"
            ],
            "statusReason": "依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "火焰粒子",
            "image": "/examples/Flame Particles System.gif",
            "type": "html",
            "url": "/examples/Flame Particles System.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "喷泉粒子",
            "image": "/examples/Fountain Particle System.gif",
            "type": "html",
            "url": "/examples/Fountain Particle System.html"
          },
          {
            "name": "柱状统计",
            "image": "/examples/Histogram.png",
            "type": "html",
            "url": "/examples/Histogram.html",
            "status": "pending",
            "statusTags": [
              "server-data",
              "cesium-api"
            ],
            "statusReason": "依赖本地/内网服务器数据；使用定制 Cesium API 或扩展插件"
          },
          {
            "name": "天气粒子(雨、雾、雪)",
            "image": "/examples/weatherEffects.gif",
            "type": "html",
            "url": "/examples/weatherEffects.html"
          }
        ]
      },
      {
        "menuItemName": "场景特效",
        "pages": [
          {
            "name": "水面倒影",
            "image": "/examples/Reflector.png",
            "type": "html",
            "url": "/examples/Reflector.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "MSAA抗锯齿",
            "image": "/examples/MSAA.png",
            "type": "html",
            "url": "/examples/MSAA.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "视频投放",
            "image": "/examples/Video Delivery.gif",
            "type": "html",
            "url": "/examples/Video Delivery.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "夜视效果",
            "image": "/examples/NightVisionEffect.png",
            "type": "html",
            "url": "/examples/NightVisionEffect.html"
          },
          {
            "name": "景深效果",
            "image": "/examples/DepthOfFieldEfect.png",
            "type": "html",
            "url": "/examples/DepthOfFieldEfect.html"
          },
          {
            "name": "黑白效果",
            "image": "/examples/BlackAndWhiteEffect.png",
            "type": "html",
            "url": "/examples/BlackAndWhiteEffect.html"
          },
          {
            "name": "马赛克效果",
            "image": "/examples/MosaicEffect.png",
            "type": "html",
            "url": "/examples/MosaicEffect.html"
          },
          {
            "name": "日照阴影",
            "image": "/examples/SunlightShadow.gif",
            "type": "html",
            "url": "/examples/SunlightShadow.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          }
        ]
      },
      {
        "menuItemName": "其它",
        "pages": [
          {
            "name": "热力图",
            "image": "/examples/HeatMap.png",
            "type": "html",
            "url": "/examples/HeatMap.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "热力图3D",
            "image": "/examples/HeatMap3D.gif",
            "type": "html",
            "url": "/examples/HeatMap3D.html"
          },
          {
            "name": "等高线",
            "image": "/examples/Contour Line.png",
            "type": "html",
            "url": "/examples/Contour Line.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "矢量数据",
    "menuItem": [
      {
        "menuItemName": "",
        "pages": [
          {
            "name": "GeoJson图层(POI数据)",
            "image": "/examples/geojson-PoiLayer.png",
            "type": "html",
            "url": "/examples/geojson-PoiLayer.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "流动水域面",
            "image": "/examples/Water Surface Geojson.gif",
            "type": "html",
            "url": "/examples/Water Surface Geojson.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "KML图层",
            "image": "/examples/KML_data.png",
            "type": "html",
            "url": "/examples/KML_data.html"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "三维模型",
    "menuItem": [
      {
        "menuItemName": "3DTiles模型",
        "pages": [
          {
            "name": "倾斜摄影模型",
            "image": "/examples/3DTilesPicture.png",
            "type": "html",
            "url": "/examples/3DTile.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          },
          {
            "name": "建筑白模",
            "image": "/examples/3DTile_building.png",
            "type": "html",
            "url": "/examples/3DTile_building.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "建筑白模材质特效",
            "image": "/examples/3DTile_buildingMaterial.png",
            "type": "html",
            "url": "/examples/3DTile_buildingMaterial.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖第三方地图服务或 API Key"
          },
          {
            "name": "管道流向动态展示",
            "image": "/examples/3DTile_pipeline_uv_speed.png",
            "type": "html",
            "url": "/examples/3DTile_pipeline_uv_speed.html",
            "status": "pending",
            "statusTags": [
              "server-data"
            ],
            "statusReason": "依赖本地/内网服务器数据"
          }
        ]
      }
    ]
  },
  {
    "subMenu": "Vue 组件示例",
    "menuItem": [
      {
        "menuItemName": "材质 Material",
        "pages": [
          {
            "name": "内置线材质",
            "image": "/examples/development.png",
            "type": "vue",
            "url": "/Material/OwnlineMaterial"
          },
          {
            "name": "自定义线材质",
            "image": "/examples/development.png",
            "type": "vue",
            "url": "/Material/CustomlineMaterial"
          },
          {
            "name": "内置面材质",
            "image": "/examples/development.png",
            "type": "vue",
            "url": "/Material/OwnPolygonMaterial"
          },
          {
            "name": "自定义面材质",
            "image": "/examples/development.png",
            "type": "vue",
            "url": "/Material/CustomPolygonMaterial"
          }
        ]
      },
      {
        "menuItemName": "图层",
        "pages": [
          {
            "name": "百度地图 (Vue)",
            "image": "/examples/baiduMap.png",
            "type": "vue",
            "url": "/baiduLayer"
          }
        ]
      },
      {
        "menuItemName": "Entity 绘制",
        "pages": [
          {
            "name": "entity点",
            "image": "/examples/entityPoint.png",
            "type": "vue",
            "url": "/entityData/point"
          },
          {
            "name": "entity线",
            "image": "/examples/entityPolyline.png",
            "type": "vue",
            "url": "/entityData/line"
          },
          {
            "name": "entity面",
            "image": "/examples/entityPolygon.png",
            "type": "vue",
            "url": "/entityData/rectangle"
          }
        ]
      }
    ]
  }
]

export default menu
