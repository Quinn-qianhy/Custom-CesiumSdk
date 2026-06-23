/**
 * HTML 示例运行时数据别名
 * 大体积数据走本地/内网服务，可通过 .env 覆盖 VITE_DATA_BASE_URL
 */
;(function () {
  var baseUrl =
    (typeof window !== 'undefined' &&
      window.__CESIUM_DATA_BASE_URL__) ||
    'http://localhost:8888'

  window.CESIUM_DATA = {
    baseUrl: baseUrl,
    geojson: {
      sichuanRegion: '/data/geojson/sichuan_region.json'
    },
    tilesets: {
      chengduBuilding:
        baseUrl + '/3dtiles/chengdu_building/tileset.json',
      fallback:
        'https://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json'
    },
    terrain: {
      localDem: baseUrl + '/cesiumLocal_dem'
    }
  }
})()
