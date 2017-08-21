var _class=require('./class.js');
exports.add=function (_classes) {
	_classes.forEach(function(item,index){
		var classitem=item;
		var teacherName=item.teacherName;
		var students=item.students;
	    _class.add(teacherName,students);
	});
}
