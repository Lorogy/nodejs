var eventemitter=require('events').EventEmitter;
var learn=new eventemitter();

learn.on('learned',function(what){
	console.log('I have learned : '+what+'-html~');
});
learn.on('learned',function(what){
	console.log('I have learned : '+what+'-css~');
});
learn.on('learned',function(what){
	console.log('I have learned : '+what+'-js~');
});
learn.on('learned',function(what){
	console.log('I have learned : '+what+'-sass/less~');
});
learn.on('learned',function(what){
	console.log('I have learned : '+what+'-grunt/gulp~');
});
// learn.on('learning',function(what){
// 	console.log('I have learned : '+what+'-nodejs~');
// });
learn.on('learn',function(what){
	console.log('I will leran : '+what+'-vue~');
});
learn.on('learn',function(what){
	console.log('I will leran : '+what+'-webpack~');
});

var haslistener1=learn.emit('learned','web');
var haslistener2=learn.emit('learning','web');
var haslistener3=learn.emit('learn','web');

//是否被监听过
console.log(haslistener1);
console.log(haslistener2);
console.log(haslistener3);

console.log(learn.listeners('learned').length);
console.log(learn.listeners('learning').length);
console.log(learn.listeners('learn').length);

//fun必须是写在外面的函数，而不是像上面直接写在on内，否则无法移除
//learn.removeListener('learned',fun[n]);
//learn.removeAllListeners('learned');


