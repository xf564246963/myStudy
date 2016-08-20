var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';  
var mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});  
var db = new mongodb.Db('test', server, {safe:true});


var insertData = function(db, callback) {  
    //连接到表  
    var collection = db.collection('user');
    //插入数据
    var data = [{"name":'xf',"age":26},{"name":'yp',"age":23}];
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

var selectData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('user');
  //查询数据
  var whereStr = {"name":'xf'};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

var delData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('user');
  //删除数据
  var whereStr = {"name":'xf'};
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

var systemSave = function(db,idName,fun,dsp){
	db.system.js.insert({
		_id:idName,
		value:fun,
		description:dsp
	 });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
	//插入数据
    // insertData(db, function(result) {
        // console.log(result);
        // db.close();
    // });
	//查找数据
	// selectData(db, function(result) {
		// console.log(result);
		// db.close();
	  // });
	//删除数据
   // delData(db, function(result) {
		// console.log(result);
		// db.close();
	  // });
	  
	
	//不能在node中操作db.system.js来储存js方法，会报错，我认为是为了提升安全性，不让人随意修改里面的方法
	
	//调用储存中的方法（需在mongodb里面用db.system.js保存js方法再调用）
	// db.eval('getUserCount()',function(err,result){
		 // if(err)
			// {
			  // console.log('Error:'+ err);
			  // return;
			// }     
			// console.log(result);
	// });
	
	//console.log(db.system);
});




