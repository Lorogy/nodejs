var student=require('./student.js');
var teacher=require('./teacher.js');

teacher.add('lorogy');

function add(teacherName,students) {
	 teacher.add(teacherName);

	 students.forEach(function(item,index){
	 	student.add(item);
	 });
}

exports.add=add;