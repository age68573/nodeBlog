const express = require('express')
const path = require('path')
const app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules/')))

app.set('views', path.join(__dirname, './views/')) // 默認就是 ./views 目錄

app.engine('html', require('express-art-template'))
app.get('/', (req, res) => {
  res.render('index.html', {
    name: 'jeremy'
  })
})

app.listen(3000, () => {
  console.log('server running');
})