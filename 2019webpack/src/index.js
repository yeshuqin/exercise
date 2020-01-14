
import './index.css'
import './indexLess.less'
import './indexScss.scss'
// import Vue from 'vue'
// let img = require('./image/logo.jpg')
// console.log(img)
// let image = new Image()
// image.src = img
// document.body.appendChild(image)
import moment from 'moment'; 
moment.locale('zh-cn');
console.log(moment())
console.log(moment().format('YYYY-MM-DD hh:mm:ss'))