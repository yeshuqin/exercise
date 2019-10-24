// 高阶函数
//一个函数的参数 是一个函数 （回调）
//一个函数 返回一个函数 （拆分函数）


//函数before
//希望将核心的逻辑提取出来，在外面增加功能


//重写原型上的方法
Function.prototype.before = function(beforeFn) {
    return (...args) => { //箭头函数中没有this指向 没有argument 所以会像上级作用域查找
        beforeFn()
        this(...args) //展开运算符 say(1,2,3)
    }
}

//AOP 切片 装饰 把核心抽离出来 在核心基础上增加功能
const say = (...args) => { //剩余运算符把所以的参数组长一个数组
    console.log("说话", args)
}

const newSay = say.before(() => {
    console.log("你好")
})

newSay(1,2,3)
