//1.解决并发问题（同步多个异步方法的执行结果）
//2.链式调用的问题 解决多个回调嵌套的问题

//Promise是一个类
//1.每次new一个Promise都需要传递一个执行器，执行器是立即执行
//2.执行器函数中有2个参数 resolve,reject
//3.默认Promise 有三个状态pedding=> resolve 表示成功了， reject就是拒绝
//4.如果一旦成功了 不能变成失败 一旦失败 不能再成功了
//5.每个Promise都有一个then方法

let Promise = require('../promise')
let p = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve("我有钱")
    },500)
    // throw new Error('失败') //如果抛出异常也是执行失败
})

p.then(data => {
    console.log('success', data)
}, err => {
    console.log('err', err)
})

p.then(data => {
    console.log('success', data)
}, err => {
    console.log('err', err)
})

p.then(data => {
    console.log('success', data)
}, err => {
    console.log('err', err)
})


