var IMAGE_COUNT = 1500,
	arr = ["chrome", "ff", "s", "a", "ap", "wp", "bb"];

function main() {

	M.start();

	M.setCanvasSize(window.innerWidth, window.innerHeight);
	
	M.sprites.onAllImagesLoaded.addEventListener(function() {
		runPlatforms();
	});

	M.sprites.load({
		chrome: "http://puzzlingideas.com.ar/match/images/compatible_chrome.gif",
		ff: "http://puzzlingideas.com.ar/match/images/compatible_firefox.gif",
		s: "http://puzzlingideas.com.ar/match/images/compatible_safari.gif",
		wp: "http://puzzlingideas.com.ar/match/images/compatible_windowsphone.png",
		a: "http://puzzlingideas.com.ar/match/images/compatible_android.png",
		ap: "http://puzzlingideas.com.ar/match/images/compatible_apple.png",
		bb: "http://puzzlingideas.com.ar/match/images/compatible_blackberry.png",
	});

}

function MovingSprite(layerWidth, layerHeight) {
	M.renderers.Sprite.call(this, arr[M.random.integer(0, 6)]);
	this.setLocation(M.random.integer(0, layerWidth), M.random.integer(0, layerHeight));
	this.setSize(32, 32);
	this.speedX = 1 * M.random.sign();
	this.speedY = 1 * M.random.sign();
	this.layerWidth = layerWidth;
	this.layerHeight = layerHeight;
}

MovingSprite.prototype.onUpdate = function() {

	var x = this.getX(),
		y = this.getY();

	if ( x < 0 || x > this.layerWidth ) {
		this.speedX *= -1;
	}
	if ( y < 0 || y > this.layerHeight ) {
		this.speedY *= -1;
	}

	this.offset(this.speedX, this.speedY);

};

M.extend(MovingSprite, M.renderers.Sprite);

function runPlatforms() {

	var layer = new M.Layer(),
		layerWidth = layer.getWidth(),
		layerHeight = layer.getHeight();

	M.setDoubleBuffer(true);

	M.setDebug(true);

	layer.continousFade(4);

	for ( var i = 0; i < IMAGE_COUNT; i++ ) {
		layer.push(new MovingSprite(layerWidth, layerHeight));
	}

	var layer2 = new M.Layer(),
		matchText = new M.renderers.Text({
			text: "MATCH", 
			x: layer.getWidth() / 2, 
			y: layer.getHeight() / 2, 
			fillStyle: "orange", 
			size: 164,
			family: "Impact"
		});

	matchText.setShadow(0, 0, "white", 10);

	layer2.push(matchText);

	M.pushLayer(layer);
	M.pushLayer(layer2);

}