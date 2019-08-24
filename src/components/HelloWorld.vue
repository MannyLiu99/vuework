<template>
  <div class="hello">
    <div id="myDemo">
      <button @click="clickOnly">点击</button> <button @click="showTime">promise</button> <button @click="newFunction">箭头函数和function</button>
      <button @click="myReverse">字符串反转</button>
      <table>
        <thead><tr><th>序号</th><th>书名</th><th>作者</th><th>价格</th><th @click='showAdd'>添加</th></tr></thead>
        <tbody>
        <tr v-for="(book, index) in books" :key="book.key" :index="index">
          <td v-for="value in book" :key="value">{{value}}</td><td @click='deleteSelf(index)'>删除</td>
        </tr>
        </tbody>
      </table>
      <div v-show="showAddFlag">
        <label>书名:</label><input v-model="bookTemp.name"/>
        <label>作者:</label><input v-model="bookTemp.author"/>
        <label>价格:</label><input v-model="bookTemp.price"/>
        <button @click="add">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      bookTemp: {name: '', author: '', price: '0'},
      books: [],
      index: 0,
      showAddFlag: false
    }
  },
  methods: {
    showAdd: function () {
      this.showAddFlag = true
    },
    initBookTemp: function () {
      this.bookTemp = {name: '', author: '', price: '0'}
    },
    add: function () {
      this.index++
      this.showAddFlag = false
    },
    deleteSelf: function (index) {
      this.books.splice(index, 1)
    },
    clickOnly: function () {
      function Foo () {
        var getName = function () {
          console.log('1')
        }
        // return this
      }
      Foo.getName = function () {
        console.log('2')
      }
      Foo.prototype.getName = function () {
        console.log('3')
      }
      var getName = function () {
        console.log('4')
      }
      function getName () {
        console.log('5')
      }

      debugger
      Foo.getName()
      getName()
      Foo()
      getName()
      new Foo.getName()
      new Foo().getName()
      new new Foo().getName()
    },
    showTime: function () {
      /* for (let i = 0; i < 9; i++) {
        console.log(i)
      } */

      /* console.log('1')
      setTimeout(function () {
        console.log('2')
      }, 0)
      console.log('3')
      let pp1 = new Promise(function (resolve, reject) {
        console.log('4')
        setTimeout(function () {
          resolve()
        }, 100)
      }).then(function () {
        console.log('5')
      }).catch(function () {
        console.log('6')
      })

      let pp2 = new Promise(function (resolve, reject) {
        console.log('7')
        setTimeout(function () {
          reject()
        }, 300)
      }).then(function () {
        console.log('8')
      }).catch(function () {
        console.log('9')
      })

      Promise.all([pp1, pp2]).then(function () {
        console.log('all')
      }).catch(function () {
        console.log('catch')
      }) */

      /* var p1 = new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(1);
        },0)
      });
      var     p2 = new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(2);
        },200)
      });
      var    p3 = new Promise(function(resolve,reject){
        setTimeout(function(){
          try{
            console.log(XX.BBB);
          }
          catch(exp){
            resolve("error");
          }
        },100)
      });
      Promise.all([p1, p2, p3]).then(function (results) {
        console.log("success")
        console.log(results);
      }).catch(function(r){
        console.log("err");
        console.log(r);
      }) */
    },
    newFunction: function () {
      // 使用function方法定义构造函数
      function Person (name, age) {
        this.name = name
        this.age = age
      }
      var manny = new Person('manny', 25)
      console.log(manny) // {name: 'manny', age: 25}

      // 尝试使用箭头函数
      // var Person = (name, age) => {
      //   this.name = name
      //   this.age = age
      //   console.log(this)
      // }
      // var manny = new Person('manny', 25) // Uncaught TypeError: Person is not a constructor
      // console.log(manny)
    },
    myReverse: function () {
      let str = 'hello world'
      console.log(str.split('').reverse())// ["d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h"]
      console.log(str.split('').reverse().join(''))// dlrow olleh
      console.log(str)// hello world
    }
  },
  computed: {
  },
  watch: {
    index: function () {
      var tempBook = {
        key: this.index,
        name: this.bookTemp.name,
        author: this.bookTemp.author,
        price: this.bookTemp.price
      }
      this.books.push(tempBook)
      this.initBookTemp()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
