function slopeArraw(points) {
  var polygon = points
  //多边形内部的网格插值
  // num 插值数
  function interpolation(num = 10) {
    var lons = []
    var lats = []
    var gridsPoints = []
    var endPoints = []
    for (let i = 0; i < polygon.length; i++) {
      const element = polygon[i];
      const lon = element[0]
      const lat = element[1]
      lons.push(lon)
      lats.push(lat)
    }
    const minLon = Math.min(...lons)
    const minLat = Math.min(...lats)

    const maxLon = Math.max(...lons)
    const maxLat = Math.max(...lats)

    var extent = [minLon, minLat, maxLon, maxLat];
    var cellSide = 1 / num;
    var options = {
      units: 'miles'
    };
    var grid = turf.pointGrid(extent, cellSide, options);
    for (let index = 0; index < grid.features.length; index++) {
      const element = grid.features[index];
      const coor = element.geometry.coordinates
      const lonLat = [coor[0], coor[1]]
      gridsPoints.push(lonLat)
    }

    //判断点是否在多边形内部
    var points = turf.points(gridsPoints);
    var searchWithin = turf.polygon([polygon]);
    var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);

    for (let index = 0; index < ptsWithin.features.length; index++) {
      const element = ptsWithin.features[index];
      const coor = element.geometry.coordinates
      const lonLat = [coor[0], coor[1]]
      endPoints.push(lonLat)
    }
    return endPoints
  }
  //通过单个position获取的高程
  function getHeightByPosition(position) {
    const promise = new Cesium.sampleTerrain(
      viewer.terrainProvider || viewer.scene.terrainProvider,
      13,
      [position],
    ).then(function (res) {
      return res[0].height
    })
    return promise
  }

  function bufferPoint() {
    const points1 = interpolation() //多边形内部的插值点
    for (let index = 0; index < points1.length; index++) {
      const element = points1[index];
      var startPoint = {
        lon: element[0],
        lat: element[1]
      }
      //求插值点的高程
      const position = Cesium.Cartographic.fromDegrees(element[0], element[1]);
      const height = getHeightByPosition(position)
      //得到一个插值点的缓冲面经纬度数组
      const polygon = pointBFpolygon(element)
      //得到缓冲面的最大高程点
      const maxPoint = polygonTolanlat(polygon)
      const arrCompare = []
      arrCompare.push(height)
      arrCompare.push(maxPoint)
      //两个异步操作结束之后进行的操作
      const positions = contrastHeight(startPoint, arrCompare)
      positions.then(res => {
        dwarPolygon(res)
      })
    }
  }

  function contrastHeight(startPoint, arrCompare) {
    const positions = []
    const promise = Promise.all(arrCompare).then(res => {
      startPoint.height = res[0]
      const endPoint = res[1]
      if (startPoint.height > endPoint.height) {
        positions.push(startPoint.lon)
        positions.push(startPoint.lat)
        positions.push(endPoint.lon)
        positions.push(endPoint.lat)
      } else {
        positions.push(endPoint.lon)
        positions.push(endPoint.lat)
        positions.push(startPoint.lon)
        positions.push(startPoint.lat)
      }
      return positions
    })
    return promise
  }
  //缓冲面数组获得所有高程最大值的点
  async function polygonTolanlat(polygon) {
    var allres = []
    var maxHeight
    polygon.forEach(item => {
      const position = Cesium.Cartographic.fromDegrees(item[0], item[1]);
      allres.push(getHeightByPosition(position))
    })
    const arrHeight = await Promise.all(allres)
    arrHeight.forEach(item => {
      if (item != undefined) {
        maxHeight = maxHeight > item ? maxHeight : item
      }
    });
    //指定元素在数组中的下标
    var max_index = arrHeight.indexOf(maxHeight)
    const maxLonLat = polygon[max_index]
    var maxPoint = {
      lon: maxLonLat[0],
      lat: maxLonLat[1],
      height: maxHeight
    }
    return maxPoint
  }
  //单个点的缓冲面坐标数组
  function pointBFpolygon(element) {
    const point = turf.point(element)
    const buffered = turf.buffer(point, 0.05, {
      units: 'miles'
    })
    return buffered.geometry.coordinates[0]
  }

  function dwarPolygon(positions) {
    viewer.entities.add({
      name: "ArrowLines",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(positions),
        width: 10,
        material: new Cesium.PolylineArrowMaterialProperty(
          Cesium.Color.YELLOW
        ),
        clampToGround: true
      }
    });
  }

  bufferPoint()
}
