import React from './react';
import ReactDom from './react-dom';

let element = (
    <h1 className="title" style={{color: 'red', fontSize: '50px'}}>
        hello <span>world</span>
    </h1>
)

// const element1 = React.createElement(
//     'h1',
//     {
//         className: 'title',
//         style: {
//             color: 'red',
//             fontSize: '50px'
//         }
//     }, "hello", React.createElement("span", null, "world"));
// console.log(element)
// console.log(element1)
ReactDom.render(element,document.getElementById('root'))