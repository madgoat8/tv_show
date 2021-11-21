<template>
	<view class="content">
		<view class="row">
			<label for="wsAddress">接口地址:</label><input type="text" v-model="wsAddress" ref="wsAddress"
				style="min-width:400rpx;" />
		</view>
		<!-- <view class="buttonGroup">
			<button @click="save()" ref="saveBtn" :focus="focus1">保存</button>
			<button @click="back()" style="margin-left:20px;" ref="cancleBtn" :focus="focus2">取消</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focusIndex:0,// 0 1 2 代表三个控件焦点
				focus0:true,
				focus1:false,
				focus2:false,
				wsAddress: ''
			}
		},
		watch:{
			wsAddress(newVal){
				uni.setStorageSync('wsAddress',newVal)
			}
		},
		onLoad() {
			this.wsAddress = uni.getStorageSync('wsAddress');
			if (!this.wsAddress) {
				this.wsAddress = "ws://"
			}
		},
		methods: {
			save() {
				try {
					uni.setStorageSync('wsAddress', this.wsAddress);
					uni.showToast({
						title: '保存成功！',
						duration: 2000
					});
				} catch (e) {
					uni.showToast({
						title: '保存失败！',
						duration: 5000
					});
				}
			},
			back() {
				// uni.navigateTo({
				// 	url: "/"
				// })
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 200px;
		/* background-color: #000000;
		color:#eee; */
	}

	label {
		display: inline-block;
		margin-right: 10px;

	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		width: 100%;
		margin: 20px 0;
	}

	input {
		border: 1px solid #000000;
		border-radius: 5px;
		display: inline-block;
	}

	.buttonGroup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
</style>
