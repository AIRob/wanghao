/**
 * Created by wh on 17/1/13.
 */
/**
 * Created by wh on 17/1/13.
 */

var  http=require('http');
var cheerio=require('cheerio');
var request=require('request')
var fs=require('fs');
var url='http://www.fenbi.com/';
var mysql=require('mysql');
var schedule = require("node-schedule");


//////////

var connection;
function handleError () {
    connection = mysql.createConnection({
        'host':'127.0.0.1',
        'user':'wang',
        'password':'password',
        'port':'3306',
        'database':'test'
    });


    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}
handleError();



/////////////////



// var userSelectsql='select * from book';

function filterChapters(html){

    var $=cheerio.load(html);
    var chapters=$('.course-list-wrap');
    var courseData=[];

    chapters.each(function(item){

        var chapter=$(this);
        var name=chapter.find('a.course h2').text();
        var number=chapter.find('a.course .number').html();
        courseData.push({
            'name':name,
            'number':number

        })
    });
    return courseData;
}


function ret(course){
    course.forEach(function(item){
        var testType=item.name;
        var number=item.number;
        var time=formatTime(new Date())
        var adress="http://www.fenbi.com"


        // var userAddSql="insert into admin (username,pw) values ("+username+","+pw+");"
        // var userAddSql=`Insert into fbdata values(\"${name}\",\"${number}\",\"${time}\",\"${adress}\")`;
        var userAddSql="insert into fbdata (testType,number,time,adress) values ('"+testType+"','"+number+"','"+time+"','"+adress+"')";
        var userDelSql="delete from fbdata";
        connection.query(userAddSql,function(err,result,field){
            if(err){
                console.log(err);
            }else{
                console.log("success");
                // result.forEach(function (list) {
                //     console.log(list.name);
                // })
            }
        });

    });
    connection.end();
}


function getInfo(){

    http.get(url,function(res){

        var html = '';
        res.on('data',function(data){
            html += data;
        });

        res.on('end',function(){
            var course=filterChapters(html);
            ret(course);
        })
    }).on('error',function(){
        console.log('error')

    });
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function autoexec(){
    var rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 6)];

    rule.hour = 8;

    rule.minute = 0;

    var j = schedule.scheduleJob(rule, function(){

        console.log("执行任务");
    getInfo();
        

    });

}

autoexec()