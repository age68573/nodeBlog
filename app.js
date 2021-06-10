const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules/')))

app.set('views', path.join(__dirname, './views/')) // 默認就是 ./views 目錄
app.engine('html', require('express-art-template'))

// 配置板模引擎及 body-parser 一定要在 app.use(router) 掛載路由之前
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())

app.use(router) //把路由掛載到app中



app.listen(3000, () => {
  console.log('server running');
})