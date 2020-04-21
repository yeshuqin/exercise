'use strict'
function fn() {
    console.log("out")
    console.log(this)
}

// (function() {
//     if(false) {
//         function fn() {
//          console.log("in")
//         }
//     }
//     fn()
// }());
{
   function fn() {
    console.log("in")
   }
}
fn()
var a = 2
{
    var a = 1
}
console.log(a)

