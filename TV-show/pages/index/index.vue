<template>
	<view class="content" v-bind:style="{'background-color':currentData.backgroundcolor,'color':currentData.fontcolor}"
		@click="whole.onClick" @tap="whole.onClick" id="onClick">
		<view class="text-area">
			<text class="title" v-bind:style="{'font-size':currentData.titlefontsize+'vw'}">{{currentData.title}}</text>
		</view>
		<ul>
			<li v-for="(item,index) in currentData.Content" :key=index v-bind:style="{'font-size':item.fontsize+'vw','line-height':item.fontsize+3+'vw'}">
				<div class="rowName">{{item.name}}：</div>
				<div class="rowValue">{{item.value}}</div>
			</li>
			<!-- <li>
				<div class="rowName">牌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
				<div class="rowValue">{{id}}</div>
			</li>
			<li>
				<div class="rowName">条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</div>
				<div class="rowValue">{{barcode}}</div>
			</li>
			<li>
				<div class="rowName">采集时间：</div>
				<div class="rowValue">{{time}}</div>
			</li> -->
		</ul>
		<!-- <view style="position: absolute;right:40rpx;top:40rpx;">
			<div @click="toConfig()">设置</div>
		</view> -->
		<view style="position: absolute;right:0rpx;top:0rpx;width:120rpx;height:120rpx" @click="toConfig()">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				socketTask: '',
				reconnectInterval: '',
				wsAddress: '',
				currentData: '',
				sortedRowData: '',
				// title: '分道系统',
				// id: '123456789012345-熊猫',
				// barcode: '12345678901234567890123456789012',
				// time: '2021-09-23 13:34:25'
				timeout: 6000,
				timeoutObj: ''
			}
		},
		onLoad() {
			// uni.closeSocket({

			// });
			console.log('onLoad')
			// this.setWs();
			this.loadConfig();
			this.setWs()
			// this.setSocketTask()

			// this.setWs();
			// this.connWs();
			// plus.key.addEventListener('keydown', function(e) {
			// 	alert("BackButton Key pressed!");
			// 	uni.showToast({
			// 		title: e
			// 	})
			// })
		},
		onShow() {
			//从配置进入此页面，需判断ws是否更改
			console.log('onShow')

			this.loadConfig();
		},
		watch: {
			wsAddress(newVal, oldVal) {
				let that = this
				console.log('wsAddress change.newVal:', newVal, 'oldVal:', oldVal, 'wsAddress:', that.wsAddress)
				if (newVal == oldVal) {
					console.log("save wsAddress return.")
					return
				}
				if (oldVal) {
					plus.runtime.restart();
				} else {
					// that.connWs()
					that.reset()
				}
				// uni.closeSocket({
				// 	complete() {
				// 		// console.log('uni.closeSocket.')
				// 		// that.showToast("尝试重新连接服务……")
				// 		// // setTimeout(() => {
				// 		// that.reset()
				// 		// }, 1000)

				// 		that.connWs()
				// 	}
				// })
				// that.closeSocket()
				// that.connWs()
			},
			// socketTask(newVal) {
			// 	if (newVal)
			// 		this.setSocketTask()
			// }
		},
		beforeDestroy() {
			// 实例销毁前，关闭websocket
			// that.closeSocket()
			uni.closeSocket({
				complete() {
					// console.log('uni.closeSocket.')
					// that.showToast("地址更改，重连……")
					// setTimeout(()=>{
					// 	that.connWs()
					// },1000)
				}
			})
		},
		methods: {
			showToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				});
			},
			showErrToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'error',
					duration: 3000
				});
			},
			sortByKey(array, key, order) {
				return array.sort(function(a, b) {
					var x = a[key]
					var y = b[key]
					if (order) {
						return x < y ? -1 : x > y ? 1 : 0
					} else {
						return x < y ? (x > y ? 1 : 0) : -1
					}
				})
			},
			toConfig() {
				uni.navigateTo({
					url: "../config/config"
				})
			},
			keyCodeClick(keyCode) {
				console.log('tmd，调用了，值：' + keyCode);
				// this.key = keyCode;
				if (keyCode == 13) {
					this.toConfig()
				}
				// alert(keyCode)
				// uni.showToast({
				// 	title: keyCode,
				// 	duration: 2000
				// });
				// this.showToast(keyCode)
				// this.showToast(keyCode)
			},

			/////////////////////////////////////////////
			/////////////////////////////////////////////
			/////////////////////////////////////////////

			/////////////////////////////////////////////
			/////////////////////////////////////////////
			/////////////////////////////////////////////
			loadConfig() {
				try {
					this.wsAddress = uni.getStorageSync('wsAddress');
					if (!this.wsAddress) {
						uni.showToast({
							title: '按确定去设置',
							icon: 'none',
							duration: 5000
						});
					}
				} catch (e) {
					uni.showToast({
						title: '获取配置失败！',
						duration: 5000
					});
				}
			},

			connWs() {
				let that = this
				console.log('connect to socket...', that.wsAddress)
				that.setWs()
				that.socketTask = uni.connectSocket({
					url: that.wsAddress,
					success: (e) => {
						// that.showToast('连接成功1！')
						// console.log('connectSocket success.',e)
						// uni.sendSocketMessage({
						// 	data: 'ping2',
						// 	success: res => {
						// 		console.log('连接正常....');
						// 	},
						// 	fail: err => {
						// 		console.log('连接失败重新连接....', err);
						// 		// that.connWs();
						// 	},
						// 	complete() {
						// 		// that.timeoutObj = setTimeout(function() {
						// 		// 	that.checkOpenSocket()
						// 		// }, that.timeout);
						// 	}
						// });
						// // that.stopReconnectSocket()
						// // that.setWs()
						// that.reset()
					},
					fail: () => {
						that.showErrToast('服务连接失败！')
						console.log('connectSocket fail.')
						// setTimeout(() => {
						// 	that.connWs()
						// }, 6000)
						// that.reconnectSocket()
					},
					complete: (e) => {
						// that.setWs()
					}
				});

			},

			setWs() {
				let that = this
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接成功！', res);
					that.showToast('服务连接成功！')
				});
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
					that.showErrToast('服务已关闭！');
					// that.reset()
				});
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！', res);
					that.showErrToast('连接服务失败！');
				});
				uni.onSocketMessage(function(res) {
					// console.log('收到服务器内容：' + res.data, JSON.parse(res.data));
					try {
						that.currentData = JSON.parse(res.data)
						that.sortByKey(that.currentData.Content, 'rowindex', 1)
					} catch (err) {
						// that.showErrToast("接收内容有错！")
						console.error('接收内容无法解析：', err)
					}
				});
			},
			// 判断是否已连接
			checkOpenSocket() {
				let that = this
				uni.sendSocketMessage({
					data: 'ping',
					success: res => {
						console.log('连接正常....');
					},
					fail: err => {
						console.log('连接失败重新连接....', err);
						that.showErrToast('连接服务失败！');
						that.connWs();
					},
					complete() {
						// that.timeoutObj = setTimeout(function() {
						// 	that.checkOpenSocket()
						// }, that.timeout);
					}
				});
			},
			// 检测心跳reset
			reset() {
				// clearTimeout(this.timeoutObj);
				clearInterval(this.timeoutObj);
				this.start(); // 启动心跳
			},
			// 启动心跳 start
			start() {
				let that = this
				that.checkOpenSocket()
				
				this.timeoutObj = setInterval(function() {
					that.checkOpenSocket()
				}, this.timeout);
			}
		}
	}
</script>

<script module="whole" lang="renderjs">
	let code;
	export default {
		mounted() {
			//全局监听按键输入
			window.document.onkeydown = function(e) {
				code = e.keyCode;
				document.getElementById("onClick").click();
			}
		},
		methods: {
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('keyCodeClick', code);
			}
		}
	}
</script>
<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		/* background-color: #000; */
		overflow: hidden;
		position: relative;
	}


	.title {
		font-size: 6vw;
		/* color: #eee; */
		margin-bottom: 4vw;
	}

	ul {
		width: 100%;
		margin:0;
		padding:0;
	}

	li {
		list-style: none;
		position: relative;
		/* margin:2vw; */
		font-size: 2vw;
		/* color: #505050; */
		margin:0;
		padding:0 10rpx 0 10rpx;
		overflow: hidden;
	}

	.rowName {
		position: absolute;
		width: 20vw;
		text-align: justify;
		text-align-last: end;
		padding-right: 1vw;
	}

	/* .rowName:before {
		position: absolute;
		left: 100%;
		content: '\FF1A';
	} */

	.rowValue {
		padding-left: 20vw;
		overflow-wrap: break-word;
		/* overflow: hidden; */
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin: 0;
	}
</style>
