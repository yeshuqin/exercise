//柯里化：就是将一个函数拆分成多个函数
//判断类型 Object.proptotype.toString.call


//高级函数中包含柯里化 可以保留参数bind
/* 
const checkType = (content, type) =>  {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}
const b = checkType(123, 'Number')
console.log(b) 
*/

/* 
const checkType = (type) =>  {
    return (content)=> {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    } 
}
// const isString = checkType('String')
// console.log(isString('123'))

//闭包
let types  = ['Number', 'String', 'Boolean']
let utils = {}
types.forEach(type => {
    utils['is'+type] = checkType(type)
})

console.log(utils.isString('123'))
console.log(utils.isNumber('111'))
 */

//通用的柯里化
const add = (a, b, c, d, e) => {
    return a + b + c + d + e
}

const curring = (fn, arr = []) => {
    let len = fn.length
    return (...args)=> {
        arr = arr.concat(args)
        if(arr.length < len) {
            return curring(fn, arr)
        }
        return fn(...arr)
    }
}

let r = curring(add)(1)(2)(3,4,5) // [1,2,3,4,5]
console.log(r)

const checkType = (type, content) =>  {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let types  = ['Number', 'String', 'Boolean']
let utils = {}
types.forEach(type => {
    utils['is'+type] = curring(checkType)(type)
})
console.log(utils.isString('123'))