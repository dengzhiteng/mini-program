import {
  usersWxlogin
} from '../../api/users'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  wxApiLogin
} from "../../utils/asyncWx.js";

Page({
  // 获取用户信息并获取token
  async handleGetUserInfo(e) {
    // test
    wx.setStorageSync("token", 'token1234554sdfsfsdf123123test');
    try {
      // 1 获取用户信息
      // 2 获取小程序登录成功后的必要信息
      // 3 发送请求 获取用户的token
      // 4 把token存入缓存中 同时跳转回上一个页面
      const {userInfo} = e.detail;
      wx.setStorageSync('userInfo', userInfo)
      const { encryptedData, rawData,iv, signature }  =e.detail;
      const {code} = await  wxApiLogin()
      const {
        token
      } = await usersWxlogin({
        encryptedData,
        iv,
        code,
        signature,
        rawData
      });
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})