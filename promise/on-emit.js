//我们希望读取数据node异步 会等待同步代码都执行完成后在执行
const fs = require('fs')
let info = {}
let e = {
    arr: [],
    on (fn) {
        this.arr.push(fn)
    },
    emit () {
        this.arr.forEach(fn => fn())
    }
}

e.on(() => { //订阅
    console.log('OK')
})

e.on(() => { //订阅
    if(Object.keys(info).length === 2) {
        console.log(info)
    }
})


fs.readFile('./promise/name.txt', 'utf8', (err, data) => {
    info['name'] = data
    e.emit() //发布
})

fs.readFile('./promise/age.txt', 'utf8', (err, data) => {
    info['age'] = data
    e.emit() //发布
})

//观察者模式 =》 观察者模式(watcher vue)