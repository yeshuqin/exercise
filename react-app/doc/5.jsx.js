import React from 'react';
import ReactDom from 'react-dom';
/* 
    我们把页面分成若干的独立的部分，单独编写，单独维护
    函数组件
    1.一个返回普通react元素的函数就是一个合法的React组件
    2.组件需要返回一个并且仅能返回一个React跟元素
    3.组件的名称必须大写字母开头
*/

// function  Welcome1 (props) {
//     return <h1>hello {props.name} {props.age}</h1>
// }

class Welcome extends React.Component{
    render() {
        return <h1>hello {this.props.name} {this.props.age}</h1>
    }
}

let data = {name: '叶淑琴', age: 19}

ReactDom.render(<Welcome {...data}/>,document.getElementById('root'))