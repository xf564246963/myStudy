// console.log('log');  //��ӡ��־
// console.info('info'); //��ӡ��Ϣ
// console.warn('warn'); //��ӡ����
// console.error('error'); //��ӡ����
// console.time('test');    
// for(var i=0; i<10000;i++){};
// console.timeEnd('test');    //����time��timeEnd֮��ָ��ִ�е�ʱ�䣬time��timeEnd������ַ�������һ��
// console.log("dirname"+__dirname);  //���ļ������·�� D:\nodejs
// console.log("filename"+__filename); //���ļ��ľ���·�� D:\nodejs\test2.js
// process.stdout //��׼��Ϣ���
// process.stderr //��׼�������  console�����Ծ������������������ԣ���������console�ȽϺ�
// process.stdout.write('process.stdout'); //process.stdout
// process.stderr.write('process.stderr'); //process.stderr
 //process.stdin.setEncoding('utf-8');   //���ñ�׼��Ϣ����ʱ�������ݵı����ʽ utf-8����ʾΪ��������
// process.stdin.on('data',function(data){  //data�¼����ڽ����м����û����������data
	// console.log(data); //data��ȡ�û����������
// })
// process.stdin.on('readable',function(){   //readable�¼����������ݿ��Զ�ȡ��ʱ����ø��¼�
	// var data=process.stdin.read();   //data ��ȡ�û���������� һ��ʼΪnull
	// console.log(data);
// })
// process.on('exit',function(){    //�������˳�ʱ����
	// console.log('ddd');
// })
// process.on('SIGINT',function(){  //�������ж�ʱ���� ��������ctrl+c����ʱ�����ж�
	// console.log("sign interrupt");
	// process.exit();   //�˳����̣����û����һ��ͻ���ctrl+c����ʱһֱ����SIGINT�¼��ķ���
// })
//console.log(process.argv);  //argv���Է���һ�����飬������ֵ 0��nodeָ������� 1��nodeִ���ļ�test2.js�ľ���·��
//������node test2.js ���ø÷���ʱ �����ں���� xf 111 ad hello�����ݣ������Ǽ��뵽������

// var fs=require('fs'); //�Դ��Ļ�ȡ�����ļ����ݵ�ģ��fs
// fs.readFile('test3.js','utf-8',function(err,data){ //readFile���첽����//readFile(�ļ�����·��,���Ը�ʽ���ص�����(������ʾ,��������))
	// if(err){
		// console.log(err);
	// }else{
		// console.log(data); //data.toString()������ת��data�ĸ�ʽ	
	// }
// })
// var data=fs.readFileSync('test.js','utf-8');    //readFileSyncû�лص�����ֱ�ӷ���ָ���ļ�����������
// console.log(data);							//readFileSync��ͬ������

// var path = require('path'); //nodejs�Դ���pathģ�����ڻ�ȡ�ļ���·�����ź��ļ���չ��
// var fileName='test.txt';
// console.log(path.sep); // \ ·���ָ���  /*windowϵͳ��·���ָ�����'\' mac��Linux��·���ָ�����'/' �ⷽ�����԰������ֲ�ͬ��ϵͳ��ȷ���ļ�·��*/
// console.log(path.extname(fileName)); //.txt /*���������lastIndexOfҪ���ԭʼ����*/

//var sum=require('./test.js'); //ע��ģ��test.js������һ�����󣬶�������������ŵķ���
//console.log(sum.sum(100)); //exports���ŵ���sum����������sum.sum()����

var arr=require('./test.js');
console.log(arr);