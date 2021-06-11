const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
  email: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  create_time: {
    type: Date,
    // 注意這裡不要寫 Date.now() 因為會即刻調用
    // 這裡接給了一個方法 Date.now
    // 當你去 new Model 的時候，如果沒有傳遞 create_time ，則mongoose就會調用 default 指定的 Date.now 方法
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/arangodb.svg'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [0, 1, -1]
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    // 是否有使用權限(評論登入) 0 沒有權限限制 1不可以評論 2 不可以登入
    enum: [0, 1, 2],
    default: 0
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User