<template>
  <div>
    <h2>Foo 组件</h2>
    <p>Foo 自己模块(module)的 a：{{ $store.state.foo.a }}</p>
    <p>Foo 自己模块(module)的简写 a：{{ a }}</p>
    <!-- 也可以访问其他组件的状态 -->
    <p>Foo 访问别的组件(bar)中模块(module)的 a：{{ $store.state.bar.a }}</p>
    <!-- <p>Foo 访问别的组件(bar)中模块(module)的简写 a：{{ b }}</p> -->
    <p>Foo 模块增加了命名空间的getter a：{{ $store.getters['foo/abc'] }}</p>
    <!-- <p>Foo 的 a：{{ $store.getters['abc'] }}</p> -->
    <p>Foo 模块增加了命名空间的getter的简写 a,：{{ abc }}</p>
    <p>{{ count }}</p>
    <p>{{ message }}</p>
    <p>剩余任务数量：{{ remaining }}</p>
    <p>{{ getTodoById(1).text }}</p>
    <button @click="increment">自增</button>
    <br>
    <button @click="asyncIncrement">异步自增(直接调用,没有使用辅助函数)</button>
    <button @click="changeMessage(9)">改变 message(同步提交mutation,这里用了常量大写,辅助函数里不用写参数,参数会自动传递)</button>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    created () {
      console.log(this.$store)
    },
    methods: {
      increment () {//直接提交mutation,加参数的话叫提交载荷,建议对象形式比较明朗,vuex官网有介绍
        this.$store.commit({
          type: 'increment',
          num: 1
        })
      },
      asyncIncrement () {//也可以使用...mapActions方式提交,详见Bar组件
        // this.$store.dispatch('increment', {
        //   num: 2
        // })
        // 上面三行也可以写成对象形式
          this.$store.dispatch({
            type:'asyncincrement',
            num:2
          })
      },
      ...mapMutations({//提交mutation的第二种方式,是普通提交mutation的语法糖,mapMutations称为辅助函数
        changeMessage: 'SOME_MUTATION'
      })
    },
    computed: {
      // 默认访问全局成员 
      ...mapState({
        count: 'count',//不能简写,因为值固定要字符串
        message: 'message',
      }),
      // 访问模块成员,参数1写module模块的名称string,参数2是对象,最终上面可以实现简写为a即可访问模块成员
      ...mapState('foo', {
        a: 'a'//名字自定义为a,映射到foo模块里state中的a
      }),
      // ...mapState('bar', {//假设bar模块加了命名空间
      //   b: 'a'//名字自定义为a,映射到foo模块里state中的a
      // }),
      ...mapGetters(['remaining', 'getTodoById']),
      ...mapGetters('foo', ['abc'])//这句意思是当前组件映射到到模块里过滤的abc,当前组件访问的时候直接用abc即可
    }
  }
</script>

<style></style>
