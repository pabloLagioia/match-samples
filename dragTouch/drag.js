function main() {

	var max = 50,
		canvas = M.dom("canvas"),
		width = canvas.width,
		height = canvas.height,
		minSize = 10,
		maxSize = 25,
		rectangles = M.createGameLayer(),
		prevFocus = null;

	function TestObj() {
		M.renderers.Rectangle.apply(this);
		this.setFillStyle(M.color.random());
		this.setSize(50, 50);
		this.setLocation(M.random.integer(this._halfWidth, width - this._halfWidth), M.random.integer(this._halfHeight, height - this._halfHeight));
	}

	TestObj.prototype.onDrag = function(p) {
		this.setLocation(p.x, p.y);
	};

	M.extend(TestObj, M.renderers.Rectangle);


	rectangles.push(new TestObj());
	rectangles.push(new TestObj());

	M.start();

}