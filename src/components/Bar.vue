<template>
  <div>
    <h2>Bar 组件(无命名空间)</h2>
    <p>获取全局的state:{{ count }}</p>
    <p>获取全局的state:{{ message }}</p>
    <p>获取全局的getter中的值:剩余任务数量：{{ remaining }}</p>
    <button @click="increment">直接调用muttation方法 :同步自增</button>
    <br>
    <button @click="asyncIncrement({ num: 3 })"> 异步调用actions方法:异步自增,使用辅助函数,并且传递参数</button>
  </div>
</template>

<script>
// 这个组件是没加命名空间写法
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions({//参数不用写,自动传递num=3
        asyncIncrement: 'asyncincrement'
      }),
      increment () {
        this.$store.commit({
          type: 'increment'
        })
      }
    },
    computed: {
      message () {
        return 'hello'
      },
      ...mapState({
        count: 'count',
        message: 'message'
      }),
      ...mapGetters({
        remaining: 'remaining'
      })
    }
  }
</script>

<style></style>
