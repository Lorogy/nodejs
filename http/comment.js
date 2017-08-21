var http=require('http');
var querystring=require('querystring');

var postData=querystring.stringify({
	'content':'test only',
	'cid':348
});

var options={
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=05bde0c8-af44-45b9-9396-7935115f9e4c; imooc_isnew_ct=1489227961; UM_distinctid=15bd891591e64-02b009a0c0dc58-3e64430f-100200-15bd8915924a5; CNZZDATA1261110065=1471852732-1493986442-null%7C1502513167; PHPSESSID=alsfhouovj75a6m71mn7jmg8n1; loginstate=1; apsid=RlYzYyNTFlZTE1MDI3YjA5ZWUzMDVhMzA0YWIwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDE5MzYyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxODgxMTM0NjczNUAxNjMuY29tAAAAAAAAAAAAAAAAAGQxMmU0OWZjNjY0NmQzOTE1YWMzZDQxNGM4ZDlkM2Nk%2FtKXWf7Sl1k%3DN2; last_login_username=18811346735%40163.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1502808002,1502811055,1502864305,1503122154; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1503122325; imooc_isnew=2; cvde=5997d2e4ab7a4-25',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
};

var req=http.request(options,function(res){
	console.log('Status: '+res.statusCode);
	console.log('headers: '+JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end',function(){
		console.log('评论完毕~');
	});
})

req.on('error',function(e){
	console.log('Error: '+e.message);
})

req.write(postData);

req.end();