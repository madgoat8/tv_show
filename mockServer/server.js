var ws = require('nodejs-websocket');
const { v4: uuidv4 } = require('uuid');




let msgObj = {
  'backgroundcolor': 'black',
  'title': '分道系统',
  'titlefontsize': 15,
  'titlerowindex': 0,
  'fontcolor': 'white',
  'Content':
    [
      {
        'name': '条码',
        'value': '1234567890123456789012345678901234567890',
        'rowindex': 2,
        'fontsize': 4
      },
      {
        'name': '牌号',
        'value': '娇子',
        'rowindex': 1,
        'fontsize': 4
      },
      {
        'name': '采集时间',
        'value': '2021 - 08 - 08 12: 12: 12',
        'rowindex': 3,
        'fontsize': 4
      },{
        'name': '条码2',
        'value': '1234567890123456789012345678901234567890',
        'rowindex': 2,
        'fontsize': 4
      }
    ]
}

var server = ws.createServer(function (socket) {
  console.log("New connection")

  let intervalObj=setInterval(function () {
    msgObj.Content[0].value = uuidv4().substr(0,34)
    msgObj.Content[1].value = '中华中华中华中华中华中华' + Math.floor((Math.random() * 1000) + 1);

    msgObj.Content[2].value = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
    // console.log(socket.readyState)
    socket.sendText(JSON.stringify(msgObj))
  }, 200, 'sendMockData');
  // sendMockData(socket)
  // 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
  var count = 1;
  socket.on('text', function (str) {
    // 在控制台输出前端传来的消息　　
    console.log(str);
    //向前端回复消息
    socket.sendText('服务器端收到客户端端发来的消息了！' + count++);
  });

  socket.on('connect', function (code) {
    console.log('开启连接', code)

  })
  socket.on('close', function (code) {
    console.log('关闭连接', code,intervalObj)
    clearInterval(intervalObj)

  })
  socket.on('error', function (code) {
    console.log('异常关闭', code)

  })
}).listen(19000);
console.log("WebSocket建立完毕");


function sendMockData (socket) {
  msgObj.Content[0].value = uuidv4()
  msgObj.Content[1].value = '中华' + Math.floor((Math.random() * 1000) + 1);

  msgObj.Content[2].value = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
  console.log(socket.readyState)
  socket.sendText(JSON.stringify(msgObj))
}


function formatDate (mData, fmt) { //author: meizz   
  var o = {
    "M+": mData.getMonth() + 1,                 //月份   
    "d+": mData.getDate(),                    //日   
    "h+": mData.getHours(),                   //小时   
    "m+": mData.getMinutes(),                 //分   
    "s+": mData.getSeconds(),                 //秒   
    "q+": Math.floor((mData.getMonth() + 3) / 3), //季度   
    "S": mData.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (mData.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}