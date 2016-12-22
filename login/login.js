/**
 * Created by wh on 16/12/21.
 */
var http=require('http');
var server=http.createServer(function(req,res){

    res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':"http://localhost:63342"});

    req.on('data',function(data){
        console.log(data.toString('utf8'));
        console.log("接接受数据开始111")
    })
    //
    res.end('ok2222ay'); //访问3000端口。。。


    req.on("end",function(){
        console.log("完毕11")
    })
}).listen(3000);