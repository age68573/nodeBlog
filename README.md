| 路徑            | 方法 | GET參數                 | POST參數 | 是否需要登入 | 備註         |
| --------------- | ---- | ----------------------- | -------- | ------------ | ------------ |
| /               | GET  |                         |          |              | 渲染首頁     |
| /register(登入) | GET  |                         |          |              | 渲染註冊頁面 |
| /register       | POST | email,nickname,password |          |              | 處理註冊請求 |
| / login         | GET  |                         |          |              | 渲染登入頁面 |
| / login         | POST | email,password          |          |              | 處理登入請求 |
| / logout        | GET  |                         |          |              | 處理登出請求 |