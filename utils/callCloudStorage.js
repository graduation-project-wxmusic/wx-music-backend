const axios = require('axios')
const getAccessToken = require('./getAccessToken.js')
const fs = require('fs')

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

  async upload(ctx) {
    // 1、请求地址
    const ACCESS_TOKEN = await getAccessToken()
    const file = ctx.request.file
    const path = `swiper/${Date.now()}-${Math.random()}-${file.originalname}`
    const res = await axios({
      method: 'POST',
      url: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
      data: {
        path,
        env: ctx.state.env,
      }
    })
    const info = res.data;
    /**
     * TODO:
     * <Error>
        <Code>PaymentRequired</Code>
        <Message>The action performed on your resource is not allowed for now, please check the quota of your package.</Message>
        <Resource>/swiper/1678010072913-0.8893627015227339-1.png</Resource>
        <RequestId>NjQwNDY3OWNfZWNhYzEwMGJfNTc4M18xMDNjNWUy</RequestId>
        <TraceId>OGVmYzZiMmQzYjA2OWNhODk0NTRkMTBiOWVmMDAxODc0OWRkZjk0ZDM1NmI1M2E2MTRlY2MzZDhmNmI5MWI1OTVhZmNjOGRhMDFhODRkMDI4YmJmYmQyZDI5OGM4MzJlZmZlNjQ4YzIwNGQ0ODkxY2M3YjdjYTcxMTY3Y2YzMmQ=</TraceId>
      </Error>
     */
    // 2、上传图片
    // await axios({
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   },
    //   url: info.url,
    //   formData: {
    //     key: path,
    //     Signature: info.authorization,
    //     'x-cos-security-token': info.token,
    //     'x-cos-meta-fileid': info.cos_file_id,
    //     file: file.buffer
    //   },
    // }).catch((err) => {
    //   console.log('err', err);
    // })
    return info.file_id
  },

  async delete(ctx, fileid_list) {
    const ACCESS_TOKEN = await getAccessToken()
    const res = await axios({
      method: 'POST',
      url: `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`,
      data: {
        env: ctx.state.env,
        fileid_list: fileid_list
      },
    })
    return res.data
  }
}

module.exports = cloudStorage
