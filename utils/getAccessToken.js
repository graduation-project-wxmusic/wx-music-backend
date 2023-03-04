const axios = require('axios')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

const APPID = 'wxe2b9f81f0d7f5eed'
const APPSECRET = '69460cd3c2a737c331b69b803ce29c55'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

/**
 * 更新access_token.json
 */
const updateAccessToken = async () => {
  await axios({
    method: 'GET',
    url: URL
  }).then((result) => {
    const { data } = result
    if (data && data.errcode) {
      updateAccessToken()
      console.error(`error: updateAccessToken ${JSON.stringify(data)}`)
    }
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: data?.access_token,
      createTime: new Date()
    }))
  }).catch((error) => {
    updateAccessToken()
    console.error(`error: updateAccessToken ${JSON.stringify(error)}`)
  })
}

/**
 * 返回可用的access_token
 */
const getAccessToken = async () => {
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)
    const createTime = new Date(readObj.createTime).getTime()
    const nowTime = new Date().getTime()
    if ((nowTime - createTime) / 1000 / 60 / 60 >= 2 || !readObj.access_token) {
      await updateAccessToken()
      await getAccessToken()
    }
    return readObj.access_token
  } catch (error) {
    await updateAccessToken()
    await getAccessToken()
  }
}

module.exports = getAccessToken
