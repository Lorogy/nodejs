var http=require('http');
//var cheerio=require('C:\\Users\\Lorogy\\AppData\\Roaming\\npm\\node_modules\\cheerio');
var cheerio=require('cheerio'); 
var url='http://www.imooc.com/learn/348';
function filter(html){

	var $=cheerio.load(html);
	var chapters=$('.chapter');
 	
	var coursedata=[];

	 chapters.each(function(item){
	 	var chapter=$(this);
	    var chaptertitle=chapter.find('strong').text().replace(/[^\u4e00-\u9fa5\d]/gi,"");
	 	var videos=chapter.find('ul').children('li');
	 	var chapterdata={
 		chaptertitle:chaptertitle,
 		videos:[]
	 	};

	 	videos.each(function(item){
	 		var video=$(this).find('a');
	 		var videotitle=video.text().replace(/[^\u4e00-\u9fa5\w-:]/gi,"").replace("开始学习","");
	 		var id=video.attr('href').split('video/')[1];
	 		chapterdata.videos.push({
	 			title:videotitle,
	 			id:id
	 		});
	 	});
	 	coursedata.push(chapterdata);
	 })

	 return coursedata;

}

function printinfo(data){
	data.forEach( function(item) {
		var chaptertitle=item.chaptertitle;
		console.log(chaptertitle+'\n');

		item.videos.forEach(function(video){
			console.log(' 【'+video.id+'】 '+video.title+'\n');
		})

	});
}

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html+=data;
	})
	res.on('end',function(){
		var coursedata=filter(html);
		printinfo(coursedata);
	})
}).on('error',function(){
	console.log('error');
});