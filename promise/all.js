//我们希望读取数据node异步 会等待同步代码都执行完成后在执行
const fs = require('fs')
let info = {}

//并发问题 如何解决 计数器

let after = (times, fn) => () => --times === 0 && fn()


let newAfter = after(2, () => {
    console.log(info)
})

fs.readFile('./promise/name.txt', 'utf8', (err, data) => {
    info['name'] = data
    newAfter()
})

fs.readFile('./promise/age.txt', 'utf8', (err, data) => {
    info['age'] = data
    newAfter()
})