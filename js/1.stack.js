// 栈是一组数据的存放方式，特点是先进后出，后进后出
class Stack {
    constructor () {
        this.items = []
    }
    push(element) {
        this.items.push(element)
    }
    pop () {
        return this.items.pop()
    }
}

let stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())

function one () {
    console.log('one')
    function two() {
        console.log('two')
        function three () {
            console.log('three')
        }
        three()
    }
    two()
}
debugger
one()