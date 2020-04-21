/* 
执行上下文
每次函数执行的时候，会产生一个执行上下文，执行上下文是一个对象
执行上下文里面会创建一个变量对象，里面存放着当前函数内的变量
基本数据类型保存在变量对象里的，引用数据类型要单独在堆内存里开辟空间 保存
变量对象里保存的就是堆里的内存地址
*/

function task () {
    var a = 1;
    var b = {
        name:'yeshuqin'
    }
    var c = [1,2,3]
}
//task执行上下文
let taskExecutionContent = {
    this: window,
    scopeChain: [],
    //Variable Object 变量对象 里面存的是当前函数执行要使用到的变量
    VO: {
        arguments: {},
        a: 1,
        b: 'xo1',
        c: 'xo2'
    }
}