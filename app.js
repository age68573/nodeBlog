const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules/')))

app.set('views', path.join(__dirname, './views/')) // 默認就是 ./views 目錄
app.engine('html', require('express-art-template'))

// 配置板模引擎及 body-parser 一定要在 app.use(router) 掛載路由之前
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())

// 在 express 框架中，默認不支持 cookie 和 session
// 但可以使用第三方中間件: express-session
  //  添加 session 數據: req.session.foo = 'bar'  
  //  訪問 session 數據: req.session.foo
app.use(session({
  // 配置加密字符串，會在原有密碼基礎之上和這個字串拼起來加密
  secret: 'keyboard cat',
  resave: false,
  // 無論是否有使用session，都默認直接給你分配一把鑰匙
  saveUninitialized: true
}))


app.use(router) //把路由掛載到app中

// 配置一個處理 404 的中間件
app.use((req, res) => {
  res.render('404.html')
})
// 配置一個全局錯誤處理中間件
app.use((err, req, res, next) => {
  res.status(500).json({
    error_code: 500,
    message: err.message
  })
})

app.listen(3000, () => {
  console.log('server running');
})