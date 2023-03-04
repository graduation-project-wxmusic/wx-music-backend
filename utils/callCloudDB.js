const axios = require('axios')
const getAccessToken = require('./getAccessToken.js')

const callCloudDB = async (ctx, fnName, query = '') => {
  const ACCESS_TOKEN = await getAccessToken()
  return await axios({
    method: 'POST',
    url: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    data: {
      query,
      env: ctx.state.env,
    }
  })
}

module.exports = callCloudDB
