const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5')
const router = express.Router()

router.get('/', (req, res) => {
  // console.log(req.session.user);
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  // 1.獲取表單數據
  // 2. 查詢資料庫用戶密碼是否正確
  // 3. 發送項應數據
  const body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error_code: 500,
        message: err.message
      })
    }
    if (!user) {
      return res.status(200).json({
        error_code: 1,
        message: 'email or password is invalid.'
      })
    }
    // 用戶存在登入成功
    req.session.user = user
    res.status(200).json({
      error_code: 0,
      message: 'OK'
    })
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})
router.post('/register', (req, res) => {
  // 1. 獲取表單的提交數據
  // 2. 操作數據庫
  // 判斷用戶是否存在 (如果已存在不允許註冊，反之)
  // 3. 發送響應
  const body = req.body
  // 對密碼進行 md5 重複加密
  body.password = md5(md5(body.password))
  User.findOne({
    $or: [
      {
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        error_code: 500,
        message: 'Internal error.'
      })
    }
    if (data) { // 代表信箱或暱稱已存在
      return res.status(200).json({
        error_code: 1,
        message: 'Email or nickname already exists.'
      })
    }
    new User(body).save().then((user) => {
      // 註冊成功，使用 session 紀錄用戶的登入狀態
      req.session.user = user
      res.status(200).json({
        error_code: 0,
        messgae: 'ok'
      }) // 這裡一定要發送JSON格式，因為客戶端指定接收JSON
    }).catch(err => {
      return res.status(500).json({
        error_code: 500,
        message: 'Internal error.'
      })
    })
    // 服務端重定向只針對同步請求才有效
    // res.redirect('/')
  })
})

router.get('/logout', (req, res) => {
  // 1. 清除登入狀態
  // 2. 重定向到登入頁
  req.session.user = null
  res.redirect('/login')
})
module.exports = router