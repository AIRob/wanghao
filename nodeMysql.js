/**
 * Created by wh on 16/12/19.
 */

var mysql=require('mysql');


var connection=mysql.createConnection({
    'host':'127.0.0.1',
    'user':'root',
    'password':'123456',
    'port':'3306'
});

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("success");
    }
});
connection.query('SELECT 1 + 1 AS solution',function(err,rows,field){
    if(err){
        console.log(err)
    }else{
        console.log("chenggong")
    }
});

connection.end(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log(3333)
    }
})