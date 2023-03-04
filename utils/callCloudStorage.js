const axios = require('axios')
const getAccessToken = require('./getAccessToken.js')

const cloudStorage = {
  async download(ctx, fileList) {
    const ACCESS_TOKEN = await getAccessToken()
    const res = await axios({
      method: 'POST',
      url: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
      data: {
        env: ctx.state.env,
        file_list: fileList
      }
    })
    return res.data
  },
}

module.exports = cloudStorage
