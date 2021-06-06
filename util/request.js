const BASE_URL = 'http://service.picasso.adesk.com'
// const BASE_URL = 'http://157.122.54.189:9088'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			},
			complete: () => {}
		})
		uni.addInterceptor('request', {
		  invoke(args) {
		    // request 触发前拼接 url 
		    // args.url = 'https://www.example.com/'+args.url
			console.log('请求前');
		  },
		  success(args) {
		    // 请求成功后，修改code值为1
		    // args.data.code = 1
		  }, 
		  fail(err) {
		    // console.log('interceptor-fail',err)
		  }, 
		  complete(res) {
		    // console.log('interceptor-complete',res)
		  }
		})
		
		
	})
}
