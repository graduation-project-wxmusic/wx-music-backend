const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('The service has started on port 3000.')
})