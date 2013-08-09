function main() {

	M.start();

	function setDontCollide() {
		a.setLocation(50, 50);
		a.setSize(50, 50);
		a.setFillStyle("red");

		b.setLocation(101, 100);
		b.setSize(50, 50);
		b.setFillStyle("green");
	}

	function setCollide() {
		a.setLocation(100, 80);
		a.setSize(50, 50);
		a.setFillStyle("red");

		b.setLocation(100, 100);
		b.setSize(50, 50);
		b.setFillStyle("green");
	}
	
	M.dom("#separated").onclick = setDontCollide;
	M.dom("#onTop").onclick = setCollide;
	
	function testSquare() {
		collisions.setMode("Square");
	}	
	function testRadial() {
		collisions.setMode("Radial");
	}	
	function testSimple() {
		collisions.setMode("Simple");
	}	
	function testPolygon() {
		collisions.setMode("Polygon");
	}	
	function testPixelPerfect() {
		collisions.setMode("PixelPerfect");
	}

	M.dom("#square").onclick = testSquare;
	M.dom("#radial").onclick = testRadial;
	M.dom("#simple").onclick = testSimple;
	M.dom("#polygon").onclick = testPolygon;
	M.dom("#pixel").onclick = testPixelPerfect;

	var a = new M.renderers.Rectangle,
		b = new M.renderers.Rectangle,
		square = M.collisions.Square,
		radial = M.collisions.Radial,
		simple = M.collisions.Simple,
		polygon = M.collisions.Polygon,
		pixel = M.collisions.PixelPerfect,
		layer = M.createGameLayer(),
		collisions = new M.collisions.CollisionHandler();
		// collisions = new M.collisions.AllvsAllCollisionHandler();

	layer.push(a);
	layer.push(b);

	a.onUpdate = function() {
		M.dom("#result").innerHTML = false;
	};
	a.onMouseWheel = function() {
		this.offsetRotation(0.25);
	};
	a.onMouseDown = function(m) {
	};
	a.onDrag = function(m) {
		this.setLocation(m.x, m.y);
	};
	a.onCollision = function() {
		M.dom("#result").innerHTML = true
	};

	b.onUpdate = function() {
		M.dom("#result").innerHTML = false;
	};
	b.onMouseWheel = function() {
		this.offsetRotation(0.25);
	};
	b.onMouseDown = function(m) {
	};
	b.onDrag = function(m) {
		this.setLocation(m.x, m.y);
		
	};
	b.onCollision = function() {
		M.dom("#result").innerHTML = true;
	};

	collisions.colliders.push(a);
	collisions.collidables.push(b);

	// collisions.push(a);
	// collisions.push(b);

	M.pushGameObject(collisions);

	setDontCollide();

}