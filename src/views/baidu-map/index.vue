<template>
  <div>
    <div class="bdmap-view">
      <baidu-map
        class="bdmap"
        :scroll-wheel-zoom="scrollWheelZoom"
        @ready="initMap">
      </baidu-map>
    </div>
  </div>
</template>

<script>
import { baiduJson } from './skin'
import { marks } from './data'

export default {
  components: {},
  data () {
    return {
      $map: null,
      center: {
        lng: 112.969048,
        lat: 28.2016
      },
      zoom: 10,
      scrollWheelZoom: false
    }
  },
  created () {},
  mounted () {},
  methods: {
    /**
     * 载入地图
     */
    initMap ({ BMap, map }) {
      const point = new BMap.Point(this.center.lng, this.center.lat)
      map.centerAndZoom(point, this.zoom)
      map.setMapStyle({
        styleJson: baiduJson
      })
      // 载入边界
      this.showBoundary(BMap, map)
      // 载入标注
      this.addOverlay(BMap, map)
    },
    /**
     * 将标注添加到地图中
     */
    addOverlay (BMap, map) {
      if (marks.length === 0) return false
      marks.map(item => {
        const point = new BMap.Point(item.lng, item.lat)
        // 添加标记点
        const marker = new BMap.Marker(point)
        map.addOverlay(marker)
        // 添加圆形
        // const circle = new BMap.Circle(point, 6, {
        //   strokeColor: 'Red',
        //   strokeWeight: 6,
        //   strokeOpacity: 1,
        //   Color: 'Red',
        //   fillColor: '#f03'
        // })
        // map.addOverlay(circle)
        // 添加信息弹框
        const title = `
          <div style="line-height: 20px; margin: 0 0 5px; font-weight: bold;">
            <span>${item.title}</span>
          </div>
        `
        const content = `
          <dl style="line-height: 20px; font-size: 12px; color: #999999;">
            <dd>${item.data.a}</dd>
            <dd>${item.data.b}</dd>
            <dd>${item.data.c}</dd>
            <dd>${item.data.d}</dd>
          </dl>
        `
        const opts = {
          width: 200,
          height: 100,
          title: title,
          message: ``
        }
        const infoWindow = new BMap.InfoWindow(content, opts)
        marker.addEventListener('click', function () {
          map.openInfoWindow(infoWindow, point)
        })
      })
    },
    /**
     * 显示市区边界
     */
    showBoundary (BMap, map) {
      var bdary = new BMap.Boundary()
      var name = '长沙市'
      bdary.get(name, function (rs) {
        // 获取行政区域
        // map.clearOverlays() // 清除地图覆盖物
        // 行政区域的点有多少个
        var count = rs.boundaries.length
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            // 填充颜色
            fillColor: 'rgba(0, 255, 255, .9)',
            // 填充透明度
            fillOpacity: 0.2,
            // 设置多边形边线线粗
            strokeWeight: 2,
            // 设置多边形边线透明度
            strokeOpacity: 0.5,
            // 设置多边形边线样式为实线或虚线
            StrokeStyle: 'solid',
            // 设置多边形边线颜色
            strokeColor: '#eae85b'
          })
          // 建立多边形覆盖物
          // 添加覆盖物
          map.addOverlay(ply)
          // 调整视野
          // map.setViewport(ply.getPath())
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bdmap-view {
    width: 100%;
    height: 100vh;
    background: #dddddd;
    .bdmap {
      height: 100%;
    }
  }
</style>
