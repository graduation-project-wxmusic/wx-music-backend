const axios = require('axios')
const getAccessToken = require('./getAccessToken.js')

const callCloudFn = async (ctx, fnName, params = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  return await axios({
    method: 'POST',
    url: `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ctx.state.env}&name=${fnName}`,
    data: {
      ...params
    }
  })
}

module.exports = callCloudFn
