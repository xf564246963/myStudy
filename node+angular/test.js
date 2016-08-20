
/*nodejsʵ�־�̬ҳ�棬���ܼ���ͼƬ*/
// var http = require("http");
// var fs=require('fs');
// var img   
// http.createServer(function(req, res) {
	// switch(req.url){
		// case '/':
		// case '/index':
			// fs.readFile('1.html','utf-8',function(err,data){
				// if(err)throw err;
				// else{
					// res.setHeader('Content-Type','text/html');
					// //res.setHeader('Content-Type','image/png');
					// //res.setHeader('Content-encoding','utf-8');
					// res.writeHeader(200,{"Content-Type":"text/html"});
					// res.write(data);
				// }
			// })
			
			// break;
		// case '/add':
			// var html='add';
			// //res.setHeader('Content-Type','text/html');
			// res.setHeader('Content-encoding','utf-8');
			// res.writeHeader(200,{"Content-Type":"text/html"});
			// res.end(html);
			// break;
		// default :
			// var html='404 not found';
			// res.setHeader('Content-encoding','utf-8');
			// res.writeHeader(404,{"Content-Type":"text/html"});
			
			// res.end(html);
			// break;
	// }
	
  // // res.writeHead( 200 , {"Content-Type":"text/html"});
  // // res.write("<h1>Node.js</h1>");
  // // res.write("<p>Hello World</p>");
  // // res.end("<p>beyondweb.cn</p>");
// }).listen(3000);
// console.log("HTTP server is listening at port 3000.");

var events = require('events'); 
var emitter = new events.EventEmitter(); 
//emitter.on('error',function(err){console.log('error!');});



var express = require('express');
var http = require("http");
var  formidable = require('formidable');


var bodyParser = require('body-parser'); 
 var multer  = require('multer');
var fs = require("fs");

var app = express();
app.use(express.static('public'));
/*用于解析post请求数据*/
  app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));  



/*用于解析文件上传数据*/
//var upload = multer({dest: 'uploads/'});


var hits = require('./routes/hits');
app.get('/hits', hits.count);
app.post('/hit', hits.registerNew);
app.post('/remove', hits.remove);
 // app.post('/userData',upload.single('photos'), function(req, res) {
	// console.log(Object.keys(req));
	// console.log(req.file)
 // });
 
app.post('/userData', function(req, res) {
	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public/images/';	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {
	  console.log(Object.keys(files.imageFile));
	 
    if (err) {
      res.locals.error = err;
     
      return;		
    }  
     
    var extName = '';  //后缀名
    switch (files.imageFile.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;		 
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;		 
    }

    if(extName.length == 0){
        res.locals.error = '只支持png和jpg格式图片';
        return;				   
    }

    var avatarName = Math.random() + '.' + extName;
    var newPath = form.uploadDir + avatarName;

    console.log(newPath);
    fs.renameSync(files.imageFile.path, newPath);  //重命名
	
	res.send(200, {
       "url":files.imageFile.path
    });
  });

  res.locals.success = '上传成功';
	
	
  
});


app.get('/adviceDetails.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "adviceDetails.html" );
})
app.get('/form', function (req, res) {
	res.sendFile( __dirname + "/public/" + "form.html" );
})
app.get('/1.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "1.html" );
})
app.get('/tabs.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "tabs.html" );
})
app.get('/2.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "2.html" );
})
app.get('/acounts.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "acounts.html" );
})
app.get('/adviceSend.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "adviceSend.htm" );
})
app.get('/cards.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "cards.html" );
})
app.get('/consumption.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "consumption.html" );
})
app.get('/convenient.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "convenient.html" );
})
app.get('/index.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "index.html" );
})
app.get('/localLife.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "localLife.html" );
})
app.get('/marketing.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "marketing.html" );
})
app.get('/money.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "money.html" );
})
app.get('/others.html', function (req, res) {
	res.sendFile( __dirname + "/public/" + "others.html" );
})

var server = app.listen(3000,function () {

  // var host = server.address().address;
  // var port = server.address().port;
  //console.log("Ӧ��ʵ�������ʵ�ַΪ http://%s:%s", host, port)

})
 console.log("HTTP server is listening at port 3000.");


/*
��test2�����������?
*/
// function sum(n){
	// var s=0;
	// for(var i=0 ;i < n ;i++){
		// s+=i;
	// }
	// return s;
// }
var arr=[1,2,3,4,5,6]
 //exports.sum = sum; //Ϊ�ⲿ�����ṩ�ӿ�
/*��д�� module.exports.sum=sum*/
module.exports='xf';



