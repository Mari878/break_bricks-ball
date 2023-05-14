let canvas = document.getElementById('game'),
	ctx = canvas.getContext('2d'),
	ballRadius = 9,
	x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) +3),
	y = canvas.height -40,
	dx = 2,
	dy = -2;

let paddleHeight = 12,
	paddleWidth = 72;


// pocetna pozicija
let paddleX = (canvas.width - paddleWidth) /2;




// cigle
let rowCount = 5,
	columCount = 9,
	brickWidth = 54,
	brichHeight = 18,
	brickPadding =12,
	topOffset = 40,
	leftOFfset = 33,
	score = 0;

// cigle array

let bricks = [];
for(let c = 0; c < columnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < rowCount; r++){
		bricks[c][r] = {x: 0, y: 0, status: 1};
	}
}

// kontrola misa
document.addEventListener("mousemove", 
	mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth /2;
	}
}

function drawPaddle(){
	ctx.beginPath();
	ctx.roundRect(paddleX, canvas.height- paddleHeight, paddleWidth, paddleHeight, 30);
	ctx.fillStyle = '#333';
	ctx.fill();
	ctx.closePath();

}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#333';
	ctx.fill();
	ctx.closePath();
}

function drawBricks(){
	for(let c = 0; c<columCount; c++){
		for(let r = 0 ; r<rowCount; r++){
			if(bricks[c][r].status === 1 ){
				let brickX = (c * (brickWidth + brickPadding)) + leftOFfset;
				let brickY = (r *(brickHeight + brickPadding)) + topOffset;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.roundRect(brickX, brickY,brickWidth, brickHeight, 30);
				ctx.filStyle = '#333'
				ctx.fill();
				ctx.closePath();
			}
		}
	}

}

// rezultat
function trackScore(){
	ctx.font ='bold 16px sans-serif'
	ctx.fillStyle = '#333';
	ctx.fillText('Score : ' + score, 8, 24);

}

function hitDetection(){
	for (let c = 0; c< columnCount; c++){
		for(let r = 0; r< rowCount; r++){
			let b = bricks[c][r];
			if(b.status === 1){
				if (x>b.x && x <b.x + brickWidth && y >b.y && y <b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score === rowCount * columnCountl) {
						alert('Pobedio si!');
						document.location.reload();
					}
				}
			}
		}
	}
}


// main function
function init(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	trackScore();
	drawBricks();
	drawBall();
	drawPaddle();
	hitDetection();


	// levi i desni zid polja

if(x+ dx > canvas.width - ballRadius || x+dx <ballRadius){
	dx = -dx;
}


// gornji zid

if(y + dy <ballRadius){
	dy = -dy;

} else if(y + dy >canvas.height - ballRadius){
	if(x > paddleX &&x <paddleX + paddleWidth){
		dy= +dy;
	} else{
		alert('Igra je gotova!');
		document.location.reload();
	}
}

// prostor poda
if(y +dy > canvas.height - ballRadius || y + dy <ballRadius){
	dy = -dy;

}

// pomeranje loptice
x += dx;
y += dy;

}

setInterval(init,10);











