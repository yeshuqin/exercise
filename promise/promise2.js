let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
    resolve('resolve')
})

p.then(data => {
    // console.log(data)
    return data
}).then(data => {
    console.log(data)
    return 11
}).then(data => {
    console.log(data)
})