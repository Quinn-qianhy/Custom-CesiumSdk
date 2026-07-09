/**
 * globe-for-webgl 实体线材质示例中的材质配置摘录
 * 来源: globe-for-webgl/static/examples/entityPolylineMaterial.html
 *
 * 所有箭头/纹理流动均使用 Cesium.PolylineFlowMaterialProperty（材质类型 "PolylineFlow"）
 */
// eslint-disable-next-line no-unused-vars

const materialExamples = [
  {
    name: '绿色箭头流动',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: "Cesium.Color.fromCssColorString('#a6d96a')",
          repeat: 'new Cesium.Cartesian2(4.0, 1.0)',
          image: '/static/examples/material/arrow_1.png',
          speed: 20,
        },
      },
    },
  },
  {
    name: '青色箭头流动',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: 'Cesium.Color.AQUA',
          image: '/static/examples/material/arrow2.png',
          repeat: 'new Cesium.Cartesian2(20, 1)',
          speed: 30,
        },
      },
    },
  },
  {
    name: '绿色线条流动',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: "Cesium.Color.fromCssColorString('#66bd63')",
          image: '/static/examples/material/line.png',
          repeat: 'new Cesium.Cartesian2(2.0, 1.0)',
          speed: 25,
        },
      },
    },
  },
  {
    name: '绿色箭头线流动',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: "Cesium.Color.fromCssColorString('#1a9850')",
          image: '/static/examples/material/lineAarrow.png',
          speed: 20,
          repeat: 'new Cesium.Cartesian2(5, 1)',
        },
      },
    },
  },
  {
    name: '黄绿纹理流动',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: 'Cesium.Color.CHARTREUSE',
          image: '/static/examples/material/lineClr.png',
          speed: 25,
        },
      },
    },
  },
  {
    name: '纯纹理流动（无 color 着色）',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          image: '/static/examples/material/lineClr2.png',
          speed: 10,
        },
      },
    },
  },
  {
    name: '半透明数据流',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: 'new Cesium.Color(89/255, 249/255, 255/255, 0.8)',
          image: '/static/examples/material/LineDataTrans.png',
          speed: 8,
        },
      },
    },
  },
  {
    name: '链路脉冲',
    polyline: {
      arcType: 'Cesium.ArcType.NONE',
      width: 10,
      material: {
        class: 'Cesium.PolylineFlowMaterialProperty',
        options: {
          color: "Cesium.Color.fromCssColorString('#00ff00')",
          image: '/static/examples/material/LinkPulse.png',
          speed: 3,
        },
      },
    },
  },
];

export default materialExamples;
