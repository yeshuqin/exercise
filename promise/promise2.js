let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
    resolve('resolve')
})

let promise2=  p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('hello')
                },1000)
            }))
        },100)
    })
})

promise2.then(data => {
    console.log(data,'sss')
})
// p.then(data => {
//     return data
// }).then(data => {
//     console.log(data)
//     return 11
// }).then(data => {
//     console.log(data)
// })