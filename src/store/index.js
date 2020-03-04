import Vue from 'vue'
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'
import foo from './modules/foo'
import bar from './modules/bar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    foo,
    bar
  },
  state: {
    count: 10,
    message: 'hello world',
    todos: [
      { id: 1, text: '吃饭', done: true },
      { id: 2, text: '睡觉', done: false },
      { id: 3, text: '打豆豆', done: false },
      { id: 4, text: '写代码', done: false }
    ]
  },
  mutations: {
    increment (state, { num = 1 }) {
      //参数2要加大括号,是ES6配置项的写法,如果不加大括号参数二是{type: 'increment',num: 1},里面{num=1}意思是代表传递的参数是一个对象,属性num不传默认给一个1
      state.count += num
    },
    [SOME_MUTATION] (state,num) {//官网有介绍:使用常量替代 Mutation 事件类型,使用外部mutation命名的语法糖
      state.message = `你哈，世界!收到的参数是${num}`
      // state.message = num
    }
  },
  actions: {
    asyncincrement ({ commit }, { num = 1 }) {//{ commit }本来是context对象的,这是解构出commit方法出来
      setTimeout(function () {
        commit({
          type: 'increment',
          num
        })
      }, 1000)
    }
  },
  getters: {
    remaining: state => {//返回的是过滤后的个数
      return state.todos
        .filter(item => item.done === false)
        .length
    },
    getTodoById: state => {//返回的是找到符合条件一个函数
      return id => {
        return state.todos.find(item => item.id === id)
      }
    }
  }
})

export default store
