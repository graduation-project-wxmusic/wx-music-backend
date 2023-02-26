const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa()
const router = new Router()

/**
 * 跨域
 */
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

/**
 * 全局中间件
 */
const ENV = 'cloud1-8gde89ykd7916df3'
app.use(async (ctx, next) => {
  ctx.state.env = ENV
  await next()
})

/**
 * 路由
 */
const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('The service has started on port 3000.')
})