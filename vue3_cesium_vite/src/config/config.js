/*
 * @Author: qianhy
 * @Date: 2025-11-19 21:21:18
 * @LastEditTime: 2025-12-01 21:49:13
 * @LastEditors: qianhy
 * @Description: 
 * @FilePath: \vue3_cesium_vite\src\config\config.js
 */
const menu = [{
  subMenu: '场景控制',
  menuItem: [{
    menuItemName: '基础场景',
    pages: [{
      name: '基础场景浏览',
      image: '/src/assets/images/exImages/基础场景.png',
      url: '/index'
    },
    {
      name: '场景出图（导出图片）',
      image: '/src/assets/images/exImages/sceneScreenshot.png',
      url: '/static/examples/sceneScreenshot.html'
    },
    {
      name: '自定义空间背景图',
      image: '/src/assets/images/exImages/backgroundPicture.png',
      url: '/static/examples/backGroundMap.html'
    },
    {
      name: '自定义天空盒',
      image: '/src/assets/images/exImages/skyboxPicture.png',
      url: '/static/examples/mapRotation.html'
    },
    {
      name: '动态天空盒',
      image: '/src/assets/images/exImages/Dynamic SkyBox.gif',
      url: '/src/assets/images/exImages/Dynamic SkyBox.html'
    },
    {
      name: '测试页面',
      image: '/src/assets/images/exImages/测试页面.png',
      url: '/test'
    }
    ]
  }]
},
{
  subMenu: '图层加载',
  menuItem: [{
    menuItemName: '瓦片图层',
    pages: [{
      name: '天地图',
      image: '/src/assets/images/exImages/基础场景.png',
      url: '/index'
    },
    {
      name: '高德地图',
      image: '/src/assets/images/exImages/gaodeMap.png',
      url: '/test'
    },
    {
      name: '百度地图',
      image: '/src/assets/images/exImages/baiduMap.png',
      url: '/baiduLayer'
    },
    {
      name: 'OSM地图',
      image: '/src/assets/images/exImages/OsmMap.png',
      url: '/test'
    },
    {
      name: 'ArcGis Online地图',
      image: '/src/assets/images/exImages/arcMapOnline.png',
      url: '/test'
    }
    ]
  }, {
    menuItemName: '矢量图层',
    pages: [{
      name: 'GeoJson图层(POI数据)',
      image: '/src/assets/images/exImages/geojson-PoiLayer.png',
      url: '/index'
    },
    {
      name: 'KML图层',
      image: '/src/assets/images/exImages/KML_data.png',
      url: '/test'
    },
    {
      name: '流动水域面',
      image: '/src/assets/images/exImages/WaterSurfaceGeojson.gif',
      url: '/test'
    }
    ]
  }, {
    menuItemName: '3D Tiles 图层',
    pages: [{
      name: '倾斜摄影模型',
      image: '/src/assets/images/exImages/3DTilesPicture.png',
      url: '/index'
    },
    {
      name: '建筑白模',
      image: '/src/assets/images/exImages/3DTile_building.png',
      url: '/test'
    }
    ]
  }]
},
{
  subMenu: '交互控制',
  menuItem: [
    {
      menuItemName: '视图切换和对比',
      pages: [{
        name: '颜色调整',
        image: '/src/assets/images/exImages/adjustmentColor.png',
        url: '/index'
      },
      {
        name: '双屏联动',
        image: '/src/assets/images/exImages/doubleView.png',
        url: '/index'
      },
      {
        name: '卷帘对比',
        image: '/src/assets/images/exImages/slidingWindow.gif',
        url: '/index'
      },
      {
        name: '地表透明',
        image: '/src/assets/images/exImages/Transparent.gif',
        url: '/index'
      },
      {
        name: '二三维视图切换',
        image: '/src/assets/images/exImages/viewSwitch.png',
        url: '/index'
      }
      ]
    },
    {
      menuItemName: '绘制工具',
      pages: [{
        name: '内置线材质',
        image: '/src/assets/images/exImages/development.png',
        url: '/Material/OwnlineMaterial'
      },
      {
        name: '自定义线材质',
        image: '/src/assets/images/exImages/development.png',
        url: '/Material/CustomlineMaterial'
      }
      ]
    },
    {
      menuItemName: '测量工具',
      pages: [{
        name: '内置面材质',
        image: '/src/assets/images/exImages/development.png',
        url: '/Material/OwnPolygonMaterial'
      },
      {
        name: '自定义面材质',
        image: '/src/assets/images/exImages/development.png',
        url: '/Material/CustomPolygonMaterial'
      }
      ]
    },
  ]
},
{
  subMenu: '图形绘制',
  menuItem: [{
    menuItemName: 'entity图形绘制',
    pages: [{
      name: 'entity点',
      image: '/src/assets/images/exImages/entityPoint.png',
      url: '/entityData/point'
    },
    {
      name: 'entity线',
      image: '/src/assets/images/exImages/entityPolyline.png',
      url: '/entityData/line'
    },
    {
      name: 'entity面',
      image: '/src/assets/images/exImages/entityPolygon.png',
      url: '/entityData/rectangle'
    }
    ]
  },
  {
    menuItemName: 'canvas图形绘制',
    pages: [{
      name: '要素高亮设置',
      image: '/src/assets/images/exImages/development.png',
      url: '/VectorData/feature'
    }]
  },
  {
    menuItemName: 'primitive图形绘制',
    pages: [{
      name: 'primitive点',
      image: '/src/assets/images/exImages/development.png',
      url: '/drawData/draw'
    }]
  },
  {
    menuItemName: '特效图形绘制',
    pages: [{
      name: '光晕线',
      image: '/src/assets/images/exImages/glowPolyline.png',
      url: '/VectorData/feature'
    },
    {
      name: '动态Path轨迹线',
      image: '/src/assets/images/exImages/PathTrackLine.gif',
      url: '/VectorData/feature'
    },
    {
      name: '迁徙效果',
      image: '/src/assets/images/exImages/entityPoint.png',
      url: '/VectorData/feature'
    }
    ]
  }
  ]
},
{
  subMenu: '控件配置',
  menuItem: [{
    menuItemName: '内置控件',
    pages: [{
      name: 'POI兴趣点搜索',
      image: '/src/assets/images/exImages/POIsearch.png',
      url: '/Material/OwnlineMaterial'
    },
    {
      name: '偏振立体(VR)',
      image: '/src/assets/images/exImages/PolarizedStereo.png',
      url: '/Material/CustomlineMaterial'
    }
    ]
  },
  {
    menuItemName: '自定义控件',
    pages: [{
      name: '导航控件',
      image: '/src/assets/images/exImages/navigation.png',
      url: '/Material/OwnPolygonMaterial'
    },
    {
      name: '鹰眼控件',
      image: '/src/assets/images/exImages/eagleEyeMap.png',
      url: '/Material/CustomPolygonMaterial'
    },
    {
      name: '经纬度拾取',
      image: '/src/assets/images/exImages/PickLocation.png',
      url: '/Material/CustomPolygonMaterial'
    }
    ]
  },
  ]
},
{
  subMenu: '材质Material',
  menuItem: [{
    menuItemName: '线材质',
    pages: [{
      name: '内置线材质',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/OwnlineMaterial'
    },
    {
      name: '自定义线材质',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/CustomlineMaterial'
    }
    ]
  },
  {
    menuItemName: '面材质',
    pages: [{
      name: '内置面材质',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/OwnPolygonMaterial'
    },
    {
      name: '自定义面材质',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/CustomPolygonMaterial'
    }
    ]
  },
  ]
},
{
  subMenu: '可视化特效',
  menuItem: [{
    menuItemName: '粒子特效',
    pages: [{
      name: '火焰粒子',
      image: '/src/assets/images/exImages/Flame Particles System.gif',
      url: '/Material/OwnlineMaterial'
    },
    {
      name: '喷泉粒子',
      image: '/src/assets/images/exImages/Fountain Particle System.gif',
      url: '/Material/CustomlineMaterial'
    },
    {
      name: '天气粒子(雨、雾、雪)',
      image: '/src/assets/images/exImages/weatherEffects.gif',
      url: '/Material/CustomlineMaterial'
    }
    ]
  },
  {
    menuItemName: '场景特效',
    pages: [{
      name: '水面倒影',
      image: '/src/assets/images/exImages/Reflector.png',
      url: '/Material/OwnPolygonMaterial'
    },
    {
      name: '日照阴影',
      image: '/src/assets/images/exImages/SunlightShadow.gif',
      url: '/Material/CustomPolygonMaterial'
    }
    ]
  },
  ]
},
{
  subMenu: '空间分析',
  menuItem: [{
    menuItemName: 'GIS空间分析',
    pages: [{
      name: '可视域分析',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/OwnlineMaterial'
    },
    {
      name: '天际线分析',
      image: '/src/assets/images/exImages/development.png',
      url: '/Material/CustomlineMaterial'
    },
    {
      name: '淹没分析',
      image: '/src/assets/images/exImages/Inundation Analysis.gif',
      url: '/Material/CustomlineMaterial'
    },
    {
      name: '缓冲分析',
      image: '/src/assets/images/exImages/Buffer Analysis.png',
      url: '/static/examples/Buffer Analysis.html'
    },
    {
      name: '限高分析',
      image: '/src/assets/images/exImages/HeightLimitAnalysis.gif',
      url: '/static/examples/HeightLimitAnalysis.html'
    }, {
      name: '通视分析',
      image: '/src/assets/images/exImages/Line of Sight Analysis.png',
      url: '/static/examples/Line of Sight Analysis.html'
    },
    ]
  }
  ]
}
]

export default menu;