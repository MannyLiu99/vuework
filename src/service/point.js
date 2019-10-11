/***
 * 定义坐标类
 */
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
// function Point (x, y) {
//   this.x = x
//   this.y = y
//   console.log(this)
// }
// function Point (x, y) {
//   console.log('Point.....X:' + x + ',,Y:' + y)
//   this.x = x
//   this.y = y
// }
export {Point}
