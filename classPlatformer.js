let bg;
let mario1;

function preload()
{
	bg = loadImage("https://vignette.wikia.nocookie.net/nintendo/images/2/2c/Super_Mario_Bros_3_%28Title_Screen%29.png/revision/latest?cb=20120107012312&path-prefix=en");
	mario1 = loadImage("https://vignette.wikia.nocookie.net/mario/images/e/e4/Mario_Sprite.jpg/revision/latest?cb=20130828225140");
}
let platforms = [];
let player;
let score = 0;
let gravity = .5;

class Platform
{
	constructor(x,y,w)
	{
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = 100;
	}
	show()
	{
		fill("Red");
		rect(this.x,this.y,this.width,this.height);
	}
	contains(givenX,givenY)
	{
		return givenX > this.x && givenX < this.x + this.width && givenY > this.y && givenY < this.y + this.height;
	}
}
class Hero{
	constructor()
	{
		this.x = 75;
		this.y = 70;
		this.width = 10;
		this.height = 20;
		this.velocityx = 0;
		this.velocityy = 0;
		this.playerState = "Air";
		this.terminalVelocity = 20;
	}
	show()
	{
		ellipse(this.x,this.y,this.width,this.height);
		image(mario1,this.x-7,this.y-10,13,20);
	}
	
	touchingPlat()
	{
		for(let i = 0; i < platforms.length; i++)
		{
			if(platforms[i].contains(this.x,this.y + 10) == true)
			{
				this.y = platforms[i].y - 10;
				return true;
			}
		}
	}
	move()
	{
		if(keyIsDown(RIGHT_ARROW))
		{
			if(this.velocityx < this.terminalVelocity/2)
			this.velocityx += gravity;
		}
		else if(keyIsDown(LEFT_ARROW))
		{
			if(this.velocityx > (this.terminalVelocity * -1)/2)
			this.velocityx -= gravity;
		}
		else
		{
			if(this.velocityx < 0)
				this.velocityx += gravity;
		
			else if(this.velocityx > 0)
			{
				this.velocityx -= gravity;
			
			}
			if(this.velocityx < 1 && this.velocityx > -1)
			{
				this.velocityx = 0;
			}
		}
		this.x += this.velocityx;
		
		if(this.touchingPlat())
		{
			this.velocityy = 0;
			this.playerState = "Ground";
		}
		else
		{
			this.velocityy += gravity;
			if(this.velocityy > this.terminalVelocity)
				this.velocityy = this.terminalVelocity;
			
			this.playerState = "Air";
		}
		
		if(keyIsDown(UP_ARROW) && this.playerState == "Ground")
		{
			this.velocityy = -17;
		}
		this.y += this.velocityy;
		ivefallenandicantgetup();
	}
}

function sideScrolling()
{
	if(player.x > (3/8) * width)
	{
		for(let i = 0; i < platforms.length; i++)
		{
			platforms[i].x -= player.velocityx;
			if(platforms[i].x + width < player.x - (width * (3/8)))
			{
				platforms[i].x = random(width * 2) + player.x + (width * (5/8));
				platforms[i].y = random(height);
			}
		}
		player.x -= player.velocityx;
	}
}
function ivefallenandicantgetup()
{
	if(player.y > height)
	{
		score --;
		player.y = 0;
	}
}
function setup()
{
	createCanvas(1600,900);
	for(let i = 0; i < 10; i++)
	{
		platforms.push(new Platform(random(width * 2),random(height),random(200,400)));
	}
	player = new Hero();
}

function draw()
{
	background(bg);
	text(score,10,10);
	player.move();
	sideScrolling();
	player.show();
	for(let i = 0; i < platforms.length; i++)
	{
		platforms[i].show();
	}
}