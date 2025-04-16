// pages/Aichat.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInput: '', // 用户输入的内容
    chatHistory: [], // 聊天记录
    scrollTop: 0 // 滚动条位置
  },

  inputChange: function (e) {
    this.setData({
      userInput: e.detail.value
    });
  },

  sendMessage: async function () {
    const userInput = this.data.userInput;
    if (userInput) {
      // 添加用户消息到聊天记录
      const newUserMessage = { type: 'user', content: userInput };
      const newChatHistory = [...this.data.chatHistory, newUserMessage];
      this.setData({
        chatHistory: newChatHistory,
        userInput: '',
        scrollTop: 9999 // 滚动到最底部
      });

      try {
        const res = await wx.cloud.extend.AI.bot.sendMessage({
          data: {
            botId: "bot-da5a4fe5", // 第2步中获取的Agent唯一标识
            msg: userInput, // 用户的输入
            history: newChatHistory.filter(item => item.type === 'user').map(item => item.content), // 历史对话的内容
          },
        });
        let botResponse = '';
        for await (let x of res.textStream) {
          botResponse += x;
        }
        // 添加机器人回复到聊天记录
        const newBotMessage = { type: 'bot', content: botResponse };
        const updatedChatHistory = [...newChatHistory, newBotMessage];
        this.setData({
          chatHistory: updatedChatHistory,
          scrollTop: 9999 // 滚动到最底部
        });
        console.log('机器人回复:', botResponse);
      } catch (error) {
        console.error('调用聊天机器人失败:', error);
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})