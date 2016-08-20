// console.log('log');  //打印日志
// console.info('info'); //打印信息
// console.warn('warn'); //打印警告
// console.error('error'); //打印错误
// console.time('test');    
// for(var i=0; i<10000;i++){};
// console.timeEnd('test');    //计算time与timeEnd之间指令执行的时间，time与timeEnd传入的字符串必须一致
// console.log("dirname"+__dirname);  //此文件的相对路径 D:\nodejs
// console.log("filename"+__filename); //此文件的绝对路径 D:\nodejs\test2.js
// process.stdout //标准信息输出
// process.stderr //标准错误输出  console的属性就是依赖于这两个属性，但还是用console比较好
// process.stdout.write('process.stdout'); //process.stdout
// process.stderr.write('process.stderr'); //process.stderr
 //process.stdin.setEncoding('utf-8');   //设置标准信息监听时返回内容的编码格式 utf-8是显示为正常内容
// process.stdin.on('data',function(data){  //data事件：在进程中监听用户输入的内容data
	// console.log(data); //data获取用户输入的内容
// })
// process.stdin.on('readable',function(){   //readable事件：当有内容可以读取的时候调用该事件
	// var data=process.stdin.read();   //data 获取用户输入的内容 一开始为null
	// console.log(data);
// })
// process.on('exit',function(){    //当进程退出时调用
	// console.log('ddd');
// })
// process.on('SIGINT',function(){  //当进程中断时调用 比如利用ctrl+c返回时就是中断
	// console.log("sign interrupt");
	// process.exit();   //退出进程，如果没有这一句就会用ctrl+c返回时一直调用SIGINT事件的方法
// })
//console.log(process.argv);  //argv属性返回一个数组，有两个值 0是node指令的名字 1是node执行文件test2.js的绝对路径
//在利用node test2.js 调用该方法时 可以在后面接 xf 111 ad hello等内容，将它们加入到该数组

// var fs=require('fs'); //自带的获取其他文件内容的模块fs
// fs.readFile('test3.js','utf-8',function(err,data){ //readFile是异步调用//readFile(文件绝对路径,语言格式，回调函数(错误提示,内容数据))
	// if(err){
		// console.log(err);
	// }else{
		// console.log(data); //data.toString()方法来转换data的格式	
	// }
// })
// var data=fs.readFileSync('test.js','utf-8');    //readFileSync没有回调函数直接返回指定文件的内容数据
// console.log(data);							//readFileSync是同步调用

// var path = require('path'); //nodejs自带的path模块用于获取文件的路径符号和文件扩展名
// var fileName='test.txt';
// console.log(path.sep); // \ 路径分隔符  /*window系统的路径分隔符是'\' mac和Linux的路径分隔符是'/' 这方法可以帮助区分不同的系统来确定文件路径*/
// console.log(path.extname(fileName)); //.txt /*比用正则或lastIndexOf要便捷原始方法*/

//var sum=require('./test.js'); //注入模块test.js，返回一个对象，对象里面包含开放的方法
//console.log(sum.sum(100)); //exports开放的是sum方法，所以sum.sum()调用

var arr=require('./test.js');
console.log(arr);