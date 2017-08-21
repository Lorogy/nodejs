var pet={
	w:'...',
	s:function(){
		console.log(this.w);
	}
}

var dog={
	w:'www'
}

pet.s.call(dog)