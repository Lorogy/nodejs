var http=require('http');
//var cheerio=require('C:\\Users\\Lorogy\\AppData\\Roaming\\npm\\node_modules\\cheerio');
var cheerio=require('cheerio'); 
var Promise=require('bluebird');

var baseUrl='http://www.imooc.com/learn/';
var videosIds=[728,637,348,259,197,134,75];//多个课程的id号
var fetchCourseArray=[];//定义课程html代码数组

//获取每门课程首页html代码
videosIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl+id))
});

//Promise 处理每门课程
Promise
	.all(fetchCourseArray)
	.then(function(pages){
		var allcoursesData=[];//所有课程数据

		//获取所有课程数据
		pages.forEach(function(html){
			var courseData=filter(html);//每门课程数据

			allcoursesData.push(courseData);
		});

		//课程按学习人数排序
		allcoursesData.sort(function(a,b){
			return a.number<b.number
		});

		//打印所有课程数据结果
		printinfo(allcoursesData);
	});

//异步获取每门课程html代码函数
function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url);

		http.get(url,function(res){
			var html='';
			res.on('data',function(data){
				html+=data;
			})
			res.on('end',function(){
				resolve(html);
			})
		}).on('error',function(e){
			reject(e);
			console.log('获取课程数据出错！');
		})
	})
}

//过滤函数，处理html，获取课程相关信息
function filter(html){

	var $=cheerio.load(html);//cheerio插件获取html到$
	var chapters=$('.chapter');//章节
 	var title=$('.course-infos .hd h2').text();//课程标题
 	var number=$('.course-infos .statics .static-item .js-learn-num').text();//课程学习人数

 	//课程数据的结构
/*	coursedata={
		title:title,
		number:number,
		videos:[
			{
				chaptertitle:'',
				videos:[
					title:'',
					id:''
			]},
			{},...
		]
	}*/

	//课程数据变量
	var coursedata={
		title:title,
		number:number,
		videos:[]
	};

	 chapters.each(function(item){
	 	var chapter=$(this);//此章html信息
	    // var chaptertitle=chapter.find('strong').text().replace(/[^\u4e00-\u9fa5\d]/gi,"");
	    var chaptertitle=chapter.find('strong').text().trim();//章节标题
	 	var videos=chapter.find('ul').children('li');
	 	//定义章节数据变量
	 	var chapterdata={
 		chaptertitle:chaptertitle,
 		videos:[]
	 	};
	 	//遍历获取每章视频数据
	 	videos.each(function(item){
	 		var video=$(this).find('a');
	 		var videotitle=video.text().replace(/[^\u4e00-\u9fa5\w-:]/gi,"").replace("开始学习","");//视频标题
	 		var id=video.attr('href').split('video/')[1];//视频id
	 		//视频信息-->章节信息
	 		chapterdata.videos.push({
	 			title:videotitle,
	 			id:id
	 		});
	 	});
	 	//章节信息-->课程信息
	 	coursedata.videos.push(chapterdata);
	 })

	 return coursedata;

}

//打印结果函数
function printinfo(allcoursesdata){
	//遍历打印所有课程的学习人数和课程标题
	allcoursesdata.forEach( function(coursedata) {
		console.log(coursedata.title+' 课程学习人数：'+coursedata.number+'\n');
	});

	//遍历具体打印每门课程
	allcoursesdata.forEach( function(coursedata) {
		//打印具体课程标题
		console.log('###'+coursedata.title+'\n');

		var chaptersdata=coursedata.videos;//所有章节数据
		//遍历打印每章标题和视频信息
		chaptersdata.forEach(function(chapterdata){
			//打印每章标题
			console.log(chapterdata.chaptertitle+'\n');
			//遍历打印每章所有视频id和标题
			chapterdata.videos.forEach(function(video){
				console.log(' 【'+video.id+'】 '+video.title+'\n');
			})
		})
	})
}






