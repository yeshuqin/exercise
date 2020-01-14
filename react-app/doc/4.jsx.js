import React from 'react';
import ReactDom from 'react-dom';

//元素的更新
//元素是不可变
setInterval(() => {
    let element = <div>当前时间：{new Date().toLocaleTimeString()}</div>
    ReactDom.render(element,document.getElementById('root'))
},1000)