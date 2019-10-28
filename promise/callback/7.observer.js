class Subject { //被观察者 小宝宝
    constructor () {
        this.arr = [] //[o1,o2]
        this.state = '我很开心'
    }
    attach(o) { //原型上的方法
        this.arr.push(o)
    }
    setState(newState) {
        this.state = newState
        this.arr.forEach(o => o.update(newState))
    }
}
//观察者模式包含发布订阅
class Observe { //观察者 qin chao
     constructor(name) {
        this.name = name
    }
    update(newState) {
        console.log(this.name + '小宝宝' + newState)
    }
}

let s = new  Subject('小宝宝')
let o1 = new  Observe('qin')
let o2 = new  Observe('chao')
s.attach(o1)
s.attach(o2)
s.setState('不开心了')
