const  PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
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
                try{ //将then中的方法执行 拿到他的返回值
                    let x = onFulfilled(this.value) 
                    resolve(x) //将结果传递到resolve方法中
                }catch(e) {
                    reject(e)
                }
            }
            if(this.status === REJECTED) {
                try{
                    let x = onRejected(this.reason)
                    resolve(x)
                }catch(e) {
                    reject(e)
                }
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    try{
                        let x = onFulfilled(this.value)
                        resolve(x)
                    }catch(e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try{
                        let x = onRejected(this.reason)
                        resolve(x)
                    }catch(e) {
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }
}
module.exports = Promise