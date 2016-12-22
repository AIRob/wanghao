var  https=require('https');
var cheerio=require('cheerio');
var fs=require('fs');
var url='https://www.zhihu.com/question/35328488';


function filterChapters(html){
	var $=cheerio.load(html);
	var chapters=$('div.zm-item-rich-text.expandable.js-collapse-body');

	var courseData=[];

	chapters.each(function(item){
		var chapter=$(this);
		var imgSrc=chapter.find('img').attr('src') ;
	
		// var url=chapter.find('a').attr('href');
		
		courseData.push({
			imgSrc:imgSrc
		})
	})
	return courseData;
}

function ret(course){
	course.forEach(function(item){
		console.log(item.imgSrc)
	})
}


https.get(url,function(res){

	var html = '';
	res.on('data',function(data){
		html += data;
	})

	res.on('end',function(){
		var course=filterChapters(html);

		ret(course);
	})
}).on('error',function(){
	console.log('error')
})