function main() {

	M.sprites.onAllImagesLoaded.addEventListener(onBallLoaded);

	M.sprites.load({
		ball: "ball.png"
	});

}

function onBallLoaded() {

	var x, y, z,
		text = new M.renderers.Text();

	text.setText("");
	text.setSize(20);
	text.setFamily("Monospace");

	var canvas = M.dom("canvas"),
		layer = M.createGameLayer(),
		ball = new M.renderers.Sprite("ball");

	text.setLocation(canvas.width / 2, 20);

	ball.setLocation(canvas.width / 2, canvas.height / 2);

	ball.speed = {x: 0, y: 0};

	ball.rotationSpeed = 0;

	ball.setRotation(0);

	ball.onAccelerationIncludingGravity = function(x, y, z) {

		text.setText("x: " + Math.round(x) + ", y: " + Math.round(y));

		this.speed.x += x / 10;
		this.speed.y += -y / 10;

		if ( this.getBottom() + this.speed.y < canvas.height && this.getTop() + this.speed.y > 0 ) {
			this.offsetY(this.speed.y);
		} else {
			this.speed.y *= -0.5;
		}
		
		if ( this.getRight() + this.speed.x < canvas.width && this.getLeft() + this.speed.x > 0 ) {
			this.offsetX(this.speed.x);
		} else {
			this.speed.x *= -0.5;
		}

	}

	ball.onDeviceRotation = function(z, x, y) {

		var newRotation = y / 50;

		if ( this.getRotation() + newRotation < 2 ) {
			this.rotationSpeed += newRotation;
		}

		this.offsetRotation(-this.rotationSpeed);

	}

	layer.push(ball);
	layer.push(text);

	M.start(canvas);

}