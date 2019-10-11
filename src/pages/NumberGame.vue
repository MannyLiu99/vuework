<template>
  <div id="numberGame">
    <div class="number-content">
      <div v-for="(line, index) in allNumber" :key="index" class="number-line">
        <div class="number-item" v-for="(num, index_num) in line" :key="index_num">
          {{num}}
        </div>
      </div>
    </div><br/>
    <div class="number-content" hidden>
      <div class="number-line">
        <div class="number-item num-4">4</div>
        <div class="number-item">2</div>
        <div class="number-item"></div>
        <div class="number-item"></div>
      </div>
      <div class="number-line">
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
      </div>
      <div class="number-line">
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
      </div>
      <div class="number-line">
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
        <div class="number-item"></div>
      </div>
    </div>
    <div class="handle-content">
      <div class="handle-btn" @click="turnUp">上</div>
      <div class="handle-btn" @click="turnDown">下</div>
      <div class="handle-btn" @click="turnLeft">左</div>
      <div class="handle-btn" @click="turnRight">右</div>
    </div>
  </div>
</template>

<script>
import {Point} from '../service/point.js'

export default {
  name: 'NumberGame',
  data () {
    return {
      test: 'test',
      allNumber: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      // 操作类型： 上下左右
      HANDLE_TYPE: {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down'
      },
      // 格子大小 如4*4
      SIZE: 4
    }
  },
  methods: {
    turnLeft: function () {
      this.mergeLeft(this.HANDLE_TYPE.left)
      // var p = this.createRandomPosition()
      // console.log(this.isPositionBusy(p))
      // this.setPositionValue(p, 2)
      // let p = {}
      // this.isWall(p, HANDLE_TYPE)
    },
    turnRight: function () {
      let p = {}
      this.isWall(p, this.HANDLE_TYPE.right)
    },
    turnUp: function () {
      let p = {}
      this.isWall(p, this.HANDLE_TYPE.up)
    },
    turnDown: function () {
      let p = {}
      this.isWall(p, this.HANDLE_TYPE.down)
    },
    createNumber: function () {
      if (this.isFull(this.allNumber)) {
        console.log('铺满了')
        return
      }
      let p = this.createRandomPosition()
      if (this.isPositionBusy(p)) {
        this.createNumber()
      } else {
        this.setPositionValue(p, 2)
      }
    },
    // 生成随机位置
    createRandomPosition: function () {
      let x = this.getRandomInt(0, 4)
      let y = this.getRandomInt(0, 4)
      // return {'x': x, 'y': y}
      return new Point(x, y)
    },
    // 生成随机数
    getRandomInt: function (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min // 不含最大值，含最小值
    },
    // 位置是否被占用
    isPositionBusy: function (positionObj) {
      let x = this.allNumber[positionObj.x]
      let p = x[positionObj.y]
      if (p !== 0) {
        return true
      } else {
        return false
      }
    },
    // 所有位置是否都已经铺满数字
    isFull: function (arr) {
      let result = true
      if (arr.constructor.name === 'Array') {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].includes(0)) {
            result = false && result
          }
        }
      }
      return result
    },
    // 位置设值
    setPositionValue: function (p, v) {
      let x = this.allNumber[p.x]
      x[p.y] = v
      // console.log(this.allNumber)
    },
    // 获取位置的值
    getPositionValue: function (p) {
      let x = this.allNumber[p.x]
      return x[p.y]
    },
    // 判断是否靠墙
    isWall: function (p, handleType) {
      let result = false
      if (handleType === this.HANDLE_TYPE.left) {
        if (p.y <= 0) {
          result = true
        }
      } else if (handleType === this.HANDLE_TYPE.right) {
        if (p.y >= this.SIZE) {
          result = true
        }
      } else if (handleType === this.HANDLE_TYPE.up) {
        if (p.x <= 0) {
          result = true
        }
      } else if (handleType === this.HANDLE_TYPE.down) {
        if (p.x >= this.SIZE) {
          result = true
        }
      } else {
        result = true
      }
      return result
    },
    //  向左合并type
    mergeLeft: function () {
      if (this.isFull(this.allNumber)) {
        console.log('铺满了！！！')
        return
      }
      let aN = this.allNumber
      // debugger
      for (let i = 0; i < aN.length; i++) {
        let aNL = aN[i]
        for (let j = 0; j < aNL.length; j++) {
          if (aNL[j] === 0) {
            continue //  跳出本次循环
          }
          if (this.isWall(new Point(i, j), this.HANDLE_TYPE.left)) {
            continue
          }
          if (j < this.SIZE - 1 && aNL[j] === aNL[j + 1]) {
            aNL[j] = aNL[j] * 2
            aNL[j + 1] = 0
          } else {
            for (let t = j; t > 0; t--) {
              if (aNL[t - 1] === aNL[t]) {
                aNL[t - 1] = aNL[t] * 2
                aNL[t] = 0
                break // 4x4的特殊处理 合并过一次则跳出循环 多于的如 6x6 8x8有待验证
              } else if (aNL[t - 1] !== 0) {
                continue
              } else {
                aNL[t - 1] = aNL[t]
                aNL[t] = 0
              }
            }
            j++
          }
        }
      }
      console.log('最中修改后的数据：')
      console.log(this.allNumber)
      this.allNumber.splice(4) // 触发视图更新
      //  生成新随机数
      this.createNumber()
    }
  },
  beforeCreate: function () {
    // this.createRandomPosition() // this.createRandomPosition is not a function
    // console.log(this.test) // undefined
  },
  created: function () {
    // // console.log(this.test) // test
    // this.createNumber()
    this.allNumber = [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  },
  mounted: function () {
    // console.log(this.test)
  },
  updated: function () {
    // console.log('update：：：')
    // console.log(this.allNumber)
  }
}
</script>

<style scoped>
  .number-content{
    background: rgb(193,174,157);
    padding: 5px;
  }
  .number-line{
    display: flex;
    align-items: center;
    /*overflow: hidden;*/
  }
  .number-item{
    background: rgb(204,192,180);
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 32px;
    margin: 5px;
    border-radius: 10px;
  }

  .num-2{
    background: rgb(236,226,216);
    color: rgb(119,109,99);
  }
  .num-4{
    background: rgb(234,219,190);
    color: rgb(120,106,103);
  }
  .num-8{
    background: rgb(236,176,122);
    color: rgb(248,252,255);
  }
  .num-16{
    background: rgb(242,148,97);
    color: rgb(248,252,255);
  }
  .num-32{
    background: rgb(240,120,93);
    color: rgb(248,252,255);
  }
  .num-64{
    background: rgb(237,89,53);
    color: #fff;
  }
  .num-128{
    background: red;
    color: #fff;
  }
  .num-256{
    background: red;
    color: #fff;
  }
  .num-512{
    background: red;
    color: #fff;
  }
  .num-1024{
    background: red;
    color: #fff;
  }
  .num-2048{
    background: red;
    color: #fff;
  }

  .handle-content{
    display: flex;
    margin-top: 10px;
    /*background: rgb(193,174,157);*/
  }
  .handle-btn{
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
    text-align: center;
    background: rgb(193,174,157);
    color: wheat;
    font-size: 28px;
    border-radius: 10px;
  }
  .handle-btn:first-child{
    margin-left: 0;
  }

</style>
