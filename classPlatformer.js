let bob;
let player;
class Platform
{
	constructor(x,y,w)
	{
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = 20;
	}
	show()
	{
		rect(this.x,this.y,this.width,this.height);
	}
}
class Hero{
	constuctor()
	{
		this.x = 50;
		this.y = 50;
		this.width = 10;
		this.height = 20;
		this.velocityx = 0;
		this.velocityy = 0;
	}
	show()
	{
		ellipse(this.x,this.y,this.width,this.height);
	}
	move()
	{
		if(keyIsDown(RIGHT_ARROW))
		{
			this.x += 5;
		}
		if(keyIsDown(LEFT_ARROW))
		{
			this.x -= 5;
		}
		if(keyIsDown(DOWN_ARROW))
		{
			this.y += 5;
		}
		if(keyIsDown(UP_ARROW))
		{
			this.y -= 5;
		}
	}
}
function setup()
{
	createCanvas(1600,900);
	let x = 100;
	let y = 100;
	let width = 200;
	platform1 = new Platform(x,y,width);
	player = new Hero();
}

function draw()
{
	player.show();
	platform1.show();
}