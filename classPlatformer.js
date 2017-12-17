let bg;
let marioImages = [];
let marioImagesL = [];
let platforms = [];
let coins = [];
let player;
let score = 0;
let gravity = .5;

function preload()
{
	bg = loadImage("https://vignette.wikia.nocookie.net/nintendo/images/2/2c/Super_Mario_Bros_3_%28Title_Screen%29.png/revision/latest?cb=20120107012312&path-prefix=en");
	plat = loadImage("https://cdn.glitch.com/b6660e28-e32a-4119-bc13-1e0c5f4850b1%2Fplatform.png?1513274817371");
	marioImages[0] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2Fmario1.png?1513275452076");
	marioImagesL[0] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2Fmario1L.png?1513275457282");
	marioImages[1] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2FmarioJ.png?1513275481401");
	marioImagesL[1] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2FmarioJL.png?1513275484720");
	marioImages[2] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2Fmario3.png?1513275473943");
	marioImagesL[2] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2Fmario3L.png?1513275477547");
	marioImages[3] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2FmarioJ.png?1513275481401");
	marioImagesL[3] = loadImage("https://cdn.glitch.com/7df22413-2962-42d5-be3d-39cd5e8db245%2FmarioJL.png?1513275484720");
	coin = loadImage("https://cdn.glitch.com/330aa154-ae81-48db-bdc8-263ede3941c1%2Fcoin.png?1513548530867");
}

class Coin
{
	constructor(i)
	{
		this.i = i;
		this.width = 20;
		this.height = 30;
		this.x = platforms[i].x + random(platforms[i].width);
		this.y = platforms[i].y + (this.height + 10);
	}
	show()
	{
		image(coin,this.x,this.y,this.width,this.height);
	}
}

class Platform
{
	constructor(x,y,w)
	{
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = 50;
	}
	show()
	{
		image(plat,this.x,this.y,this.width,this.height);
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
		this.width = 25;
		this.height = 40;
		this.velocityx = 0;
		this.velocityy = 0;
		this.playerState = "Air";
		this.terminalVelocityY = 20;
		this.terminalVelocityX = 10;
		this.faceState = "Right";
		this.marioImage = marioImages[0];
		this.i;
	}
	show()
	{
		if(this.faceState == "Right")
			this.marioImage = marioImages[this.i];

		else if(this.faceState == "Left")
			this.marioImage = marioImagesL[this.i];

		image(this.marioImage,this.x-this.width/2,this.y-this.height/2 - 5,20,35);
	}

	touchingPlat()
	{
		for(let i = 0; i < platforms.length; i++)
		{
			if(platforms[i].contains(this.x,this.y + 10) == true)
			{
				this.y = platforms[i].y - 8;
				return true;
			}
		}
	}
	move()
	{
		if(keyIsDown(RIGHT_ARROW))
		{
			this.faceState = "Right";
			if(this.velocityx < this.terminalVelocityX)
			this.velocityx += gravity;
		}
		else if(keyIsDown(LEFT_ARROW))
		{
			this.faceState = "Left";
			if(this.velocityx > this.terminalVelocityX * -1)
			this.velocityx -= gravity;
		}
		else
		{
			this.i = 0;
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

		if(player.y > height)
		{
			score --;
			player.y = 0;
		}
		if(this.x < 5)
		{
			this.x = 5;
		}

		if(this.touchingPlat())
		{
			this.i = 0;
			this.velocityy = 0;
			this.playerState = "Ground";
		}
		else
		{
			this.i = 1;
			this.velocityy += gravity;
			if(this.velocityy > this.terminalVelocityY)
				this.velocityy = this.terminalVelocityY;

			this.playerState = "Air";
		}

		if(keyIsDown(UP_ARROW) && this.playerState == "Ground")
		{
			this.velocityy = -17;
		}
		this.y += this.velocityy;

		if(this.x > (3/8) * width)
		{
			for(let i = 0; i < platforms.length; i++)
			{
				platforms[i].x -= player.velocityx;
				if(platforms[i].x + width < player.x - (width * (3/8)))
				{
					platforms[i].x = random(windowWidth * 2) + this.x + (windowWidth * (5/8));
				}
			}
			this.x -= this.velocityx;
		}
	}
}
function setup()
{
	createCanvas(windowWidth - 20,windowHeight - 20);
	for(let i = 0; i < 10; i++)
	{
		platforms.push(new Platform(random(windowWidth * 2),i * (windowHeight/10) + 100,random(200,400)));
		coins.push(new Coin(i));
	}
	player = new Hero();
}

function draw()
{
	background("Black");
	text(score,10,10);
	player.move();
	player.show();
	for(let i = 0; i < platforms.length; i++)
	{
		platforms[i].show();
		coins[i].show();
	}
}