/* 
    队列是先进先出的线性表
*/
class Queue {
    constructor () {
        this.items = []
    }
    enqueue(element) {
        this.items.push(element)
    }
    dequeue(element) {
        this.items.shift(element)
    }
    print () {
        console.log(this.items.toString())
    }
}


let queue =  new Queue()
queue.enqueue(1)
queue.print()
queue.enqueue(2)
queue.print()
queue.enqueue(3)
queue.print()
queue.dequeue()
queue.print()
queue.dequeue()
queue.print()
queue.dequeue()
queue.print()
