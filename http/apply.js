function pet(w){
	this.w=w;
	this.s=function(){
		console.log(this.w);
	}
}

function dog(w){
	pet.call(this,w);
	//pet.apply(this,w);
}

var dog1=new dog('www');
dog1.s();