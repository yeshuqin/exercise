const  PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

//promise处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
    //处理x的类型 来决定是调用resolve还是reject
    //必须要写的很严谨
    if(promise2 === x) { //自己等待自己完成
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    //判断x是不是一个普通值 先认为你是个promise
    if((typeof x === 'object' && x!==null) || typeof x === 'function') {
        //可能是promise
        try{
            let then = x.then //看一看有没then方法
            if(typeof then === 'function') {
                //是promise
                then.call(x,y => {
                    // resolve(y)
                    //y可能还是个promise 实现递归解析
                    resolvePromise(promise2, y, resolve, reject)
                },r => {
                    reject(r)
                })
            }else {
                resolve(x) //常量直接跑出去即可
            }
        }catch(e) {
            reject(e) //取then抛出异常就报错
        }
    }else {
        //不是promise
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        //创建promise executor会立即执行
        this.value = undefined
        this.reason = undefined
        this.status = PENDING
        this.onRejectedCallbacks = []
        this.onResolvedCallbacks = []
        let resolve = value => {
            if(this.status === PENDING) {
                this.value = value
                this.status = FULFILLED
                //发布 有可能resolve在then的后面执行，此时先将方法存放起来。到时候成功了 依次执行这些回调
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = value => {
            if(this.status === PENDING) {
                this.reason = value
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        //这里可能会发生异常
        try{
            executor(resolve, reject)
        }catch(e) {
            reject(e)
        }
    }

    //then方法会判断当前的状态
    then(onFulfilled, onRejected) {
        //then方法调用后应该返回一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            //应该在返回的promise中 取到上一次的状态 来决定这个Promise2是成功还是失败
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try{ //将then中的方法执行 拿到他的返回值
                        let x = onFulfilled(this.value) 
                        resolvePromise(promise2, x, resolve, reject) //将结果传递到resolve方法中
                    }catch(e) {
                        reject(e)
                    }
                })
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                })
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
}
module.exports = Promise