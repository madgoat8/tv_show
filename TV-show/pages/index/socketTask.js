// 废弃 start
			setSocketTask() {
				let that = this
				let socketTask = that.socketTask
				if (socketTask) {
					console.log('socketTask:', socketTask)
					socketTask.onClose((res) => {
						console.log('WebSocket 已关闭！');
						that.showErrToast('服务已关闭！');
						that.reconnectSocket()
					});
					socketTask.onOpen(function(res) {
						that.stopReconnectSocket()
						console.log('WebSocket连接成功！', res);
						that.showToast('服务连接成功！')
					});
					socketTask.onError(function(res) {
						console.log('WebSocket连接打开失败，请检查！', res);
						that.showErrToast('连接服务失败！');
						that.reconnectSocket()
					});
					socketTask.onMessage(function(res) {
						console.log('收到服务器内容：' + res.data, JSON.parse(res.data));
						that.currentData = JSON.parse(res.data)
						that.sortByKey(that.currentData.Content, 'rowindex', 1)
						// console.log('sorted:',that.sortedRowData)
						console.log('sorted:', that.currentData.Content)
						// that.stopReconnectSocket()
					});
				} else {
					console.log('setSocketTask error.socketTask is undefine.')
				}
			},
			closeSocket() {
				let that = this
				that.stopReconnectSocket()
				that.socketTask && that.socketTask.close(); // 确保已经关闭后再重新打开
				that.socketTask = null;
			},
			reconnectSocket() {
				let that = this
				that.reconnectInterval && clearInterval(that.reconnectInterval)
				setInterval(() => {
					that.socketTask && that.socketTask.close(); // 确保已经关闭后再重新打开
					that.socketTask = null;
					that.connWs()
				}, 6000)
			},
			stopReconnectSocket() {
				let that = this
				if (that.reconnectInterval) {
					clearInterval(that.reconnectInterval)
				}
			},
			// 废弃end