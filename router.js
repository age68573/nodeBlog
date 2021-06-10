const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register.html')
})
router.post('/register', (req, res) => {
  // 1. 獲取表單的提交數據
  // 2. 操作數據庫
  // 3. 發送響應
  console.log(req.body);
})
module.exports = router