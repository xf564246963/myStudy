/*
 * HIT service
 */
var hits = 0;
var msg;
exports.count = function(req, res){
    res.send(200, {
        hits: hits
    });
}
exports.registerNew = function(req, res) {
    hits += 1;
    res.send(200, {
        hits: hits
    });
}
exports.remove = function(req, res) {
    hits -= 1;
    res.send(200, {
        hits: hits
    });
}
// exports.userData = function(req, res) {
    // var  userName = req.body.username,
         // userPwd = req.body.password;
	// //console.log(req.body.password);
	// console.log(userName,userPwd);
    // res.send(200, {
        // 'username':userName,
		// 'password':userPwd
    // });
// }

exports.userData = function(req, res) {
	console.log(req.files);
   // console.log(req.files.file.path);
   // console.log(req.files.file.type);

   // var file = __dirname + "/" + req.files.file.name;
   // fs.readFile( req.files.file.path, function (err, data) {
        // fs.writeFile(file, data, function (err) {
         // if( err ){
              // console.log( err );
         // }else{
               // response = {
                   // message:'File uploaded successfully',
                   // filename:req.files.file.name
              // };
          // }
          // console.log( response );
          // res.end( JSON.stringify( response ) );
       // });
   // });
}