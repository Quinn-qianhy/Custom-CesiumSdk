const menu = [{
  subMenu: '场景控制',
  menuItem: [{
    menuItemName: '基础场景',
    pages: [{
      name: '基础场景浏览',
      image: '/static/examples/viewer.png',
      url: '/static/examples/viewer.html'
    },
    {
      name: '场景出图（导出图片）',
      image: '/static/examples/sceneScreenshot.png',
      url: '/static/examples/sceneScreenshot.html'
    },
    {
      name: '自定义空间背景图',
      image: '/static/examples/backgroundPicture.png',
      url: '/static/examples/backGroundMap.html'
    },
    {
      name: '自定义天空盒',
      image: '/static/examples/skyboxPicture.png',
      url: '/static/examples/mapRotation.html'
    },
    {
      name: '动态天空盒',
      image: '/static/examples/Dynamic SkyBox.gif',
      url: '/static/examples/Dynamic SkyBox.html'
    },
    {
      name: '测试用窗口',
      image: '/static/examples/development.png',
      url: '/static/examples/text.html'
    },
    ]
  },
  {
    menuItemName: '视图切换和对比',
    pages: [{
      name: '颜色调整',
      image: '/static/examples/adjustmentColor.png',
      url: '/static/examples/adjustmentColor.html'
    },
    {
      name: '双屏联动',
      image: '/static/examples/doubleView.png',
      url: '/static/examples/doubleView.html'
    },
    {
      name: '卷帘对比',
      image: '/static/examples/slidingWindow.gif',
      url: '/static/examples/slidingWindow.html'
    },
    {
      name: '地表透明',
      image: '/static/examples/Transparent.gif',
      url: '/static/examples/Transparent.html'
    },
    {
      name: '二三维视图切换',
      image: '/static/examples/viewSwitch.png',
      url: '/static/examples/viewSwitch.html'
    }
    ]
  },
  {
    menuItemName: '相机视角控制',
    pages: [{
      name: '开场动画',
      image: '/static/examples/openAnimation.gif',
      url: '/static/examples/openAnimation.html'
    },
    {
      name: '地球旋转',
      image: '/static/examples/rotationMap.gif',
      url: '/static/examples/rotationMap.html'
    },
    {
      name: '绕点飞行',
      image: '/static/examples/rotationPoint.gif',
      url: '/static/examples/rotationPoint.html'
    },
    {
      name: '限定视角范围',
      image: '/static/examples/limitCameraView.gif',
      url: '/static/examples/limitCameraView.html'
    },
    {
      name: '视角历史记录',
      image: '/static/examples/viewRecord.png',
      url: '/static/examples/viewRecord.html'
    },
    {
      name: '路径飞行',
      image: '/static/examples/RouteFlyManager.gif',
      url: '/static/examples/RouteFlyManager.html'
    },
    ]
  },
  ]
}, {
  subMenu: '地图与地形服务',
  menuItem: [{
    menuItemName: '在线地图',
    pages: [{
      name: '百度地图',
      image: '/static/examples/baiduMapOffset.png',
      url: '/static/examples/baiduMap.html'
    },
    {
      name: 'OSM地图',
      image: '/static/examples/OsmMap.png',
      url: '/static/examples/OsmMap.html'
    },
    {
      name: '反色滤镜地图',
      image: '/static/examples/mapColorFilter.png',
      url: '/static/examples/mapColorFilter.html'
    },
    {
      name: '高德地图',
      image: '/static/examples/gaodeMap.png',
      url: '/static/examples/gaodeMap.html'
    },
    {
      name: 'ArcGis Online地图',
      image: '/static/examples/arcMapOnline.png',
      url: '/static/examples/arcMapOnline.html'
    },
    ]
  }, {
    menuItemName: '三维地形',
    pages: [{
      name: 'cesium地形',
      image: '/static/examples/chinaExaggeration.png',
      url: '/static/examples/chinaExaggeration.html'
    },
    {
      name: '局部地形（本地）',
      image: '/static/examples/localTerrain.png',
      url: '/static/examples/localTerrain.html'
    },
    {
      name: 'ARCGIS地形',
      image: '/static/examples/arcgisTerrain.png',
      url: '/static/examples/arcGisTerrain.html'
    },
    {
      name: '地形夸张',
      image: '/static/examples/terrainExaggeration.png',
      url: '/static/examples/terrainExaggeration.html'
    },

    ]
  }, {
    menuItemName: '标准瓦片服务',
    pages: [{
      name: '本地单张图片',
      image: '/static/examples/singlePicture.png',
      url: '/static/examples/singleMap.html'
    },
    {
      name: '本地区域影像',
      image: '/static/examples/localImage.png',
      url: '/static/examples/localImage.html'
    },
    {
      name: 'geoserver WMS服务',
      image: '/static/examples/geoserverWMS.png',
      url: '/static/examples/geoserverWMS.html'
    },
    {
      name: 'TMS服务',
      image: '/static/examples/3DTile_buildingMaterial.png',
      url: '/static/examples/3DTile_buildingMaterial.html'
    }
    ]
  },]
}, {
  subMenu: '控件配置',
  menuItem: [{
    menuItemName: '内置控件',
    pages: [{
      name: 'POI兴趣点搜索',
      image: '/static/examples/POIsearch.png',
      url: '/static/examples/POIsearch.html'
    },
    {
      name: '偏振立体(VR)',
      image: '/static/examples/Polarized Stereo.png',
      url: '/static/examples/Polarized Stereo.html'
    }]
  },
  {
    menuItemName: '自定义控件',
    pages: [{
      name: '导航控件',
      image: '/static/examples/navigation.png',
      url: '/static/examples/navigation.html'
    },
    {
      name: '鹰眼控件',
      image: '/static/examples/eagleEyeMap.png',
      url: '/static/examples/eagleEyeMap.html'
    },
    {
      name: '经纬度拾取',
      image: '/static/examples/PickLocation.png',
      url: '/static/examples/coordinateDisplay.html'
    }
    ]
  }
  ]
},
{
  subMenu: '绘制与加载',
  menuItem: [{
    menuItemName: '点线面',
    pages: [{
      name: '绘制点线面',
      image: '/static/examples/drawGeometry.png',
      url: '/static/examples/drawGeometry.html'
    }]
  },
  {
    menuItemName: '加载实体',
    pages: [{
      name: '加载实体点',
      image: '/static/examples/entityPoint.png',
      url: '/static/examples/entityPoint.html'
    },
    {
      name: '加载实体线',
      image: '/static/examples/entityPolyline.png',
      url: '/static/examples/entityPolyline.html'
    },
    {
      name: '实体线材质',
      image: '/static/examples/entityPolylineMaterial.png',
      url: '/static/examples/entityPolylineMaterial.html'
    },
    {
      name: '加载实体面',
      image: '/static/examples/entityPolygon.png',
      url: '/static/examples/entityPolygon.html'
    }
    ]
  },
  {
    menuItemName: '基础点对象',
    pages: [{
      name: '聚合点',
      image: '/static/examples/clusterPoint.png',
      url: '/static/examples/clusterPoint.html'
    },
    {
      name: '动态效果点',
      image: '/static/examples/pointDynamic.gif',
      url: '/static/examples/pointDynamic.html'
    },
    {
      name: '图标点加文字(primitive)',
      image: '/static/examples/Icon with Text.png',
      url: '/static/examples/Icon with Text.html'
    },
    {
      name: 'Primitive大量点',
      image: '/static/examples/pointsPrimitive.png',
      url: '/static/examples/pointPrimitive.html'
    },
    {
      name: '旋转棱锥',
      image: '/static/examples/entityRotaryPyramid.gif',
      url: '/static/examples/entityRotaryPyramid.html'
    },
    ]
  },
  {
    menuItemName: '基础线对象',
    pages: [
      {
        name: '光晕线',
        image: '/static/examples/glowPolyline.png',
        url: '/static/examples/glowPolyline.html'
      },
      {
        name: '动态Path轨迹线',
        image: '/static/examples/Path Track Line.gif',
        url: '/static/examples/Path Track Line.html'
      },
      {
        name: '迁徙效果',
        image: '/static/examples/migrationPolyline.gif',
        url: '/static/examples/migrationPolyline.html'
      },
      {
        name: 'Polyline Volume管线',
        image: '/static/examples/PolylineVolume.png',
        url: '/static/examples/PolylineVolume.html'
      },
    ]
  },
  {
    menuItemName: '基础面对象',
    pages: [
      {
        name: '矩形(promitives)',
        image: '/static/examples/Primitives Rectangle.png',
        url: '/static/examples/Primitives Rectangle.html'
      }, {
        name: '动态墙对象',
        image: '/static/examples/entityWall.gif',
        url: '/static/examples/entityWall.html'
      },
      {
        name: '绘制反选遮罩',
        image: '/static/examples/maskLayer.png',
        url: '/static/examples/mask.html'
      },
      {
        name: '雷达扫描',
        image: '/static/examples/RadarScan.gif',
        url: '/static/examples/RadarScan.html'
      },
      {
        name: '圆形波纹',
        image: '/static/examples/RippleCircular.gif',
        url: '/static/examples/RippleCircular.html'
      },
      {
        name: '圆形扩散',
        image: '/static/examples/DiffusionCircle.gif',
        url: '/static/examples/DiffusionCircle.html'
      }
    ]
  },
  ]
}, {
  subMenu: '量算与分析',
  menuItem: [{
    menuItemName: '空间分析',
    pages: [{
      name: '量算',
      image: '/static/examples/measure.png',
      url: '/static/examples/measure.html'
    },
    {
      name: '缓冲分析',
      image: '/static/examples/Buffer Analysis.png',
      url: '/static/examples/Buffer Analysis.html'
    },
    {
      name: '限高分析',
      image: '/static/examples/HeightLimitAnalysis.gif',
      url: '/static/examples/HeightLimitAnalysis.html'
    }, {
      name: '通视分析',
      image: '/static/examples/Line of Sight Analysis.png',
      url: '/static/examples/Line of Sight Analysis.html'
    },
    {
      name: '天际线分析',
      image: '/static/examples/Skyline Analysis.png',
      url: '/static/examples/Skyline Analysis.html'
    },
    {
      name: '可视域分析',
      image: '/static/examples/Viewshed Analysis.png',
      url: '/static/examples/Viewshed Analysis.html'
    },
    ]
  },
  {
    menuItemName: '地形分析',
    pages: [{
      name: '地形开挖(凸多边形)',
      image: '/static/examples/globeClip.png',
      url: '/static/examples/globeClip.html'
    }, {
      name: '地形开挖(任意多边形)',
      image: '/static/examples/globeClipArbitrarily.png',
      url: '/static/examples/globeClipArbitrarily.html'
    },
    {
      name: '淹没分析',
      image: '/static/examples/Inundation Analysis.gif',
      url: '/static/examples/Inundation Analysis.html'
    },
    {
      name: '坡度坡向分析',
      image: '/static/examples/SlopeAspectAnalysis.png',
      url: '/static/examples/SlopeAspectAnalysis.html'
    },
    ]
  },
  {
    menuItemName: '模型相关',
    pages: [{
      name: '3dtiles模型剖切（BIM）',
      image: '/static/examples/BIMClip.png',
      url: '/static/examples/BIMClip.html'
    },
    {
      name: '倾斜模型裁剪开挖',
      image: '/static/examples/photographyClip.png',
      url: '/static/examples/photographyClip.html'
    },
    {
      name: '倾斜模型局部压平',
      image: '/static/examples/3DTilesFlatten.gif',
      url: '/static/examples/3DTilesFlatten.html'
    },
    {
      name: '3dtiles拾取效果',
      image: '/static/examples/3dtileStylePicking.png',
      url: '/static/examples/3dtileStylePicking.html'
    },
    {
      name: '3dtileStyle批量着色',
      image: '/static/examples/3dtileFeatureStyling.png',
      url: '/static/examples/3dtileFeatureStyling.html'
    },
    {
      name: '倾斜摄影模型建筑单体化(分栋)',
      image: '/static/examples/3dtilesMonomerization.png',
      url: '/static/examples/3dtilesMonomerization.html'
    },
    {
      name: '倾斜摄影模型建筑单体化(分层)',
      image: '/static/examples/3DTiles_Monomerization.png',
      url: '/static/examples/3DTiles_Monomerization.html'
    },
    ]
  }
  ]
}, {
  subMenu: '可视化特效',
  menuItem: [{
    menuItemName: '实体特效',
    pages: [{
      name: '飞线',
      image: '/static/examples/PolylineTrailMaterialProperty.gif',
      url: '/static/examples/PolylineTrailMaterialProperty.html'
    },
    {
      name: '面渐变填充',
      image: '/static/examples/PolyGradientMaterialProperty.png',
      url: '/static/examples/PolyGradientMaterialProperty.html'
    },
    {
      name: '火焰粒子',
      image: '/static/examples/Flame Particles System.gif',
      url: '/static/examples/Flame Particles System.html'
    },
    {
      name: '喷泉粒子',
      image: '/static/examples/Fountain Particle System.gif',
      url: '/static/examples/Fountain Particle System.html'
    },
    {
      name: '柱状统计',
      image: '/static/examples/Histogram.png',
      url: '/static/examples/Histogram.html'
    },
    {
      name: '天气粒子(雨、雾、雪)',
      image: '/static/examples/weatherEffects.gif',
      url: '/static/examples/weatherEffects.html'
    },
    ]
  },
  {
    menuItemName: '场景特效',
    pages: [
      {
        name: '水面倒影',
        image: '/static/examples/Reflector.png',
        url: '/static/examples/Reflector.html'
      }, {
        name: 'MSAA抗锯齿',
        image: '/static/examples/MSAA.png',
        url: '/static/examples/MSAA.html'
      }, {
        name: '视频投放',
        image: '/static/examples/Video Delivery.gif',
        url: '/static/examples/Video Delivery.html'
      }, {
        name: '夜视效果',
        image: '/static/examples/NightVisionEffect.png',
        url: '/static/examples/NightVisionEffect.html'
      }, {
        name: '景深效果',
        image: '/static/examples/DepthOfFieldEfect.png',
        url: '/static/examples/DepthOfFieldEfect.html'
      }, {
        name: '黑白效果',
        image: '/static/examples/BlackAndWhiteEffect.png',
        url: '/static/examples/BlackAndWhiteEffect.html'
      }, {
        name: '马赛克效果',
        image: '/static/examples/MosaicEffect.png',
        url: '/static/examples/MosaicEffect.html'
      }, {
        name: '日照阴影',
        image: '/static/examples/SunlightShadow.gif',
        url: '/static/examples/SunlightShadow.html'
      }
    ]
  },
  {
    menuItemName: '其它',
    pages: [{
      name: '热力图',
      image: '/static/examples/HeatMap.png',
      url: '/static/examples/HeatMap.html'
    }, {
      name: '热力图3D',
      image: '/static/examples/HeatMap3D.gif',
      url: '/static/examples/HeatMap3D.html'
    },
    {
      name: '等高线',
      image: '/static/examples/Contour Line.png',
      url: '/static/examples/Contour Line.html'
    }
    ]
  }
  ]
}, {
  subMenu: '矢量数据',
  menuItem: [{
    menuItemName: '',
    pages: [{
      name: 'GeoJson图层(POI数据)',
      image: '/static/examples/geojson-PoiLayer.png',
      url: '/static/examples/geojson-PoiLayer.html'
    },
    {
      name: '流动水域面',
      image: '/static/examples/Water Surface Geojson.gif',
      url: '/static/examples/Water Surface Geojson.html'
    },
    {
      name: 'KML图层',
      image: '/static/examples/KML_data.png',
      url: '/static/examples/KML_data.html'
    }
    ]
  }]
}, {
  subMenu: '三维模型',
  menuItem: [{
    menuItemName: '3DTiles模型',
    pages: [{
      name: '倾斜摄影模型',
      image: '/static/examples/3DTilesPicture.png',
      url: '/static/examples/3DTile.html'
    },
    {
      name: '建筑白模',
      image: '/static/examples/3DTile_building.png',
      url: '/static/examples/3DTile_building.html'
    },
    {
      name: '建筑白模材质特效',
      image: '/static/examples/3DTile_buildingMaterial.png',
      url: '/static/examples/3DTile_buildingMaterial.html'
    },
    {
      name: '管道流向动态展示',
      image: '/static/examples/3DTile_pipeline_uv_speed.png',
      url: '/static/examples/3DTile_pipeline_uv_speed.html'
    }
    ]
  },
  ]
},

]

export default menu;
