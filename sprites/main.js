var Game = new Object();

(function(M, Sprite, Game) {

	function Ground() {
		Sprite.call(this, "blocks1");
		this.setFrameIndex(M.random.integer(19, 23)); //Randomize Terrain tile
	}

	M.extend(Ground, Sprite);


	function Block() {
		Sprite.call(this, "blocks1");
		this.setFrameIndex(M.random.integer(26, 30)); //Randomize Block tile
	}

	M.extend(Block, Sprite);


	function Cloud(index) {
		Sprite.call(this, "clouds");
		this.setFrameIndex(index || M.random.integer(0, 2)); //Randomize Cloud
		this.speed = -60;
	}

	Cloud.prototype.onUpdate = function() {
		if ( this.getRight() < 0 ) {
			this.setX(M.frontBuffer.canvas.width + this.getWidth());
		}
		this.offsetX(M.getSpeed(this.speed));
	};

	M.extend(Cloud, Sprite);


	function PalmTree() {
		Sprite.call(this, "palmTree");
	}

	M.extend(PalmTree, Sprite);

	
	function GroundDetail() {
		Sprite.call(this, "blocks2");
		if ( M.random.bool() ) {
			this.setFrameIndex(63);
		} else {
			this.setFrameIndex(81);
		}
	}

	M.extend(GroundDetail, Sprite);

	
	function Apple() {
		Sprite.call(this, "apple");
		this.speed = 30;
		this.timeCounter = new M.TimeCounter(500);
	}

	Apple.prototype.onUpdate = function() {
		this.offsetY(M.getSpeed(this.speed));
		if ( this.timeCounter.elapsed() ) {
			this.speed *= -1;
		}
	};

	M.extend(Apple, Sprite);


	function Player() {
		Sprite.call(this, "player");
		this.setFrameIndex(7);
		this.hasFocus = true;
		this.keyDownMappings = {
			"left": "moveLeftKeyboard",
			"right": "moveRightKeyboard",
			"up": "jump"
		};
		this.keyUpMappings = {
			"left": "stopRunning",
			"right": "stopRunning"
		}
		this.speed = 100;
	}

	Player.prototype.onUpdate = function(p) {
		if ( p.touch.events.start ) {
			if ( p.touch.x > this.getX() ) {
				this.moveRight();
			} else if ( p.touch.x < this.getX() ) {
				this.moveLeft();
			}
		} else if ( !this.usingKeyboard ) {
			this.stopRunning();
		}
	};

	Player.prototype.stopRunning = function() {
		this.stop();
		this.setFrameIndex(7);
		this.usingKeyboard = false;
	};

	Player.prototype.moveLeftKeyboard = function() {
		this.moveLeft();
		this.usingKeyboard = true;
	};

	Player.prototype.moveRightKeyboard = function() {
		this.moveRight();
		this.usingKeyboard = true;
	};
	
	Player.prototype.moveLeft = function() {
		this.offsetX(M.getSpeed(-this.speed));
		this.play("run", true);
		this.setScaleX(-1);
	};

	Player.prototype.moveRight = function() {
		this.offsetX(M.getSpeed(this.speed));
		this.play("run", true);
		this.setScaleX(1);
	};

	Player.prototype.jump = function() {
	};

	M.extend(Player, Sprite);


	Game.Ground = Ground;
	Game.Block = Block;
	Game.Cloud = Cloud;
	Game.PalmTree = PalmTree;
	Game.GroundDetail = GroundDetail;
	Game.Apple = Apple;
	Game.Player = Player;

})(M, M.renderers.Sprite, Game);

function main() {

	M.start();

	loading();

	M.sprites.onAllImagesLoaded.addEventListener(function() {
		level1();
	});

	M.sprites.load({
		blocks2: {
			source: "blocks2.png",
			frames: {
				width: 32,
				height: 32,
				padding: 2
			}
		},
		blocks1: {
			source: "blocks1.png",
			frames: {
				width: 32,
				height: 32,
				padding: 2
			}
		},
		clouds: {
			source: "clouds.png",
			frames: {
				width: 96,
				height: 32,
				padding: 2
			}
		},
		palmTree: "palmTree.png",
		apple: "apple.png",
		player: {
			source: "character.png",
			frames: {
				width: 42,
				height: 60,
				padding: 1
			},
			animations: {
				run: {
					duration: 70,
					frames: [0, 1, 2, 3, 4, 5, 6]
				}
			}
		}
	});

	function loading() {

		console.log("Loading");

		M.removeScene();

		var loading = new M.Layer(),
			text = new M.renderers.Text();

		loading.clearColor = "black";

		text.setFillStyle("white");
		text.setSize(20);
		text.setText("Loading");

		text.setLocation(loading.getCenter().x, loading.getCenter().y);

		loading.push(text);

		M.pushLayer(loading);

	}

	function level1() {

		console.log("Level 1");

		var groundLayer = new M.Layer(),
			gameLayer = new M.Layer(),
			groundCount = groundLayer.getWidth() / M.sprites.blocks2.frames[0].width;

		groundLayer.clearColor = "#87ceeb";

		for ( var i = 0; i < groundCount; i++ ) {
			var ground = new Game.Ground(),
				block = new Game.Block(),
				x = i * ground.getWidth(),
				y = groundLayer.getHeight() - ground.getHeight() / 2
			ground.setLeft(x);
			ground.setY(y  - ground.getHeight());
			block.setLeft(x);
			block.setY(y);
			groundLayer.push(ground);
			groundLayer.push(block);
		}

		var cloud;

		for ( var i = 0; i < 3; i++ ) {
			cloud = new Game.Cloud(i);
			cloud.setLocation(M.random.integer(cloud.getWidth(), groundLayer.getWidth()), M.random.integer(cloud.getHeight(), 100));
			gameLayer.push(cloud);
		}

		var groundTop = groundLayer.getHeight() - M.sprites.blocks2.frames[0].height * 2;

		for ( var i = 0; i < 2; i++ ) {
			var palmTree = new Game.PalmTree();
			palmTree.setX(M.random.integer(0, groundLayer.getWidth()));
			palmTree.setBottom(groundTop);
			groundLayer.push(palmTree);
		}

		for ( var i = 0; i < 3; i++ ) {
			var groundDetail = new Game.GroundDetail();
			groundDetail.setX(M.random.integer(0, groundLayer.getWidth()));
			groundDetail.setBottom(groundTop);
			groundLayer.push(groundDetail);
		}

		var apple = new Game.Apple();
		apple.setX(gameLayer.getWidth() - apple.getWidth() - 10);
		apple.setBottom(groundTop - 5);
		gameLayer.push(apple);

		var player = new Game.Player();
		player.setX(20);
		player.setBottom(groundTop);

		gameLayer.push(player);


		M.removeScene();

		M.pushLayer(groundLayer);
		M.pushLayer(gameLayer);

	}

}