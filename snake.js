window.onload=function() {
	canv=document.getElementById("game");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown", keyPush);	
	document.getElementById('score').innerHTML = score;
}

let isPaused = false;
setInterval(function() {
	if(!isPaused) {
		game()
	}
}, 1000/15);

score=0;
px=py=10;
gs=25
tc=20;
ax=ay=Math.floor(Math.random() * 20) + 0;
xv=yv=0;
trail = [];
tail = 5;

function resetGame(){
	tail = 5;
	score = 0;
	document.getElementById('score').innerHTML = score;
}

function game(){
	px+=xv;
	py+=yv;

	if(px < 0){
		px = tc-1;
	}
	if(px > tc-1){
		px = 0;
	}
	if(py < 0){
		py = tc-1;
	}
	if(py > tc-1){
		py = 0;
	}

	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	ctx.fillStyle="lime";
	for(var i = 0; i < trail.length; i++){
		ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2,gs-2);
		if(trail[i].x == px && trail[i].y==py){
			resetGame();
		}
	}

	trail.push({x:px, y:py});
	while(trail.length>tail){
		trail.shift();
	}

	if(px == ax && py==ay){
		score++;
		tail++;
		document.getElementById('score').innerHTML = score;
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
	};

	ctx.fillStyle="red";
	ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}

function keyPush(evt) {
	switch(evt.keyCode) {
		//when left arrow is pushed
		case 37:
			//coordinates equivalent to left arrow.  x is -1 (left)
			xv=-1; yv=0;
			break;
		//when up arrow is pushed
		case 38:
			xv=0; yv=-1;
			break;
		//when right arrow is pushed
		case 39:
			xv=1; yv=0;
			break;
		//when down arrow is pushed
		case 40:
			xv=0; yv=1;
			break;
		//'p' is pressed for pause
		case 32:
			isPaused = !isPaused;
			break;
		//'r' is pressed for restart
		case 82:
			resetGame();
			break;
	}
}