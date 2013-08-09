function main() {

	M.start();

    var max = 200,
        width = 640,
        height = 480,
        minSize = 10,
        maxSize = 25,
        gameLayer = M.createGameLayer();

    var prevFocus = null;

    for ( var i = 0; i < max; i++ ) {

        var obj;

        if ( M.random.bool() ) {
            obj = new M.renderers.Circle();
            obj.setRadius(M.random.integer(minSize, maxSize));
        } else {
            obj = new M.renderers.Rectangle();
            obj.setWidth(M.random.integer(minSize, maxSize));
            obj.setHeight(M.random.integer(minSize, maxSize));
        }

        obj.doInitCoords = true;

        obj.setLocation( M.random.integer(0, width), M.random.integer(0, height) );
        obj.setFillStyle( M.random.color() );

        obj.onMouseIn = function() {
            this.setStrokeStyle("red");
            this.setStrokeWidth(2);
        }
        obj.onMouseOut = function() {
            this.setStrokeStyle(null);
        }
        obj.onMouseWheel = function(m) {
            if ( m.wheelDeltaY > 0 ) {
                this.setY(this.getY() - 1);
            } else {
                this.setY(this.getY() + 1);
            }
        }

        obj.keyDownMappings = {
            "right": "moveRight", "left": "moveLeft"
        }

        obj.moveRight = function() {
            this.setX(this.getX() + 1);
        }
        obj.moveLeft = function() {
            this.setX(this.getX() - 1);
        }
        obj.onMouseDown = function(m) {
            this.setX(m.x);
            this.setY(m.y);
        }
        obj.onClick = function() {
            this.hasFocus = true;
            if ( prevFocus && prevFocus != this ) prevFocus.hasFocus = false;
            prevFocus = this;
        }

        gameLayer.push(obj);

    }

    M.onAfterLoop = function() {

        if ( ! this.label ) this.label = M.dom("#fps");
        this.label.innerHTML = M.getFps();

    }

}