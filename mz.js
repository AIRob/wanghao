var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl = 'http://jandan.net/ooxx/page-2234#comments';
var x=0;
var num=0
var page=2234;

function repeat(url){
	request(url, function (error, response, body) {
		 if (!error && response.statusCode == 200) {
		    // console.log(body);    //返回请求页面的HTML
		    acquireData(body);
		}
	})
}

 
function acquireData(data) {
    var $ = cheerio.load(data);
    // var meizi = $('.text img');
    var meizi = $('.text img').toArray();
    var len = meizi.length;
    for (var i=0; i<len; i++) {
    	num++
    	console.log(num)
        var imgsrc = meizi[i].attribs.src;
        var filename=num+'.jpg'
        // var filename = parseUrlForFileName(imgsrc).substr(-7) //生成文件名
    	request(imgsrc).on('error',function(){
    		console.log(1)
    	}).pipe(fs.createWriteStream('images2/'+filename))  //调用request的管道来下载到 images文件夹下

        // downloadImg(imgsrc,filename,function() {
        //     // console.log(filename + ' done');
        // });
    }
    if(x<10){
 		x++
    	page++
		var	url = 'http://jandan.net/ooxx/page-'+page+'#comments';
    	repeat(url)
    }

}
 
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
 
var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
    // console.log('content-length:', res.headers['content-length']);  //图片大小
    if (err) {
        console.log('err: '+ err);
        return false;
    }
    // console.log('res: '+ res);
    request(uri).on('error',callback).pipe(fs.createWriteStream('images/'+filename))  //调用request的管道来下载到 images文件夹下
    
    });
};

repeat(requrl);