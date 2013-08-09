var Game = new Object();

(function(M, Sprite, Game) {

	function Character() {
		Sprite.call(this, "character");
		this.hasFocus = true;
		this.keyDownMappings = {
			"right": "punch"
		};
		this.keyUpMappings = {
			"right": "stopPunchAnimation"
		};
	}

	Character.prototype.stopPunchAnimation = function() {
		this.play("idle", true);
	};
	Character.prototype.punch = function() {
		this.play("punch", true);
	};

	M.extend(Character, Sprite);

	Game.Character = Character;

})(M, M.renderers.Sprite, Game);

function main() {

	M.start();

	M.sprites.onAllImagesLoaded.addEventListener(function() { 
		var myLayer = new M.Layer();
		var character = new Game.Character();

		myLayer.clearColor = "#666666";
	
		character.setX(myLayer.getWidth()/2);
		character.setBottom(myLayer.getHeight());


		myLayer.push(character);

		M.removeScene();

		M.pushLayer(myLayer);
	});

	M.sprites.load({"character":
		{
			"source":"Perso_.png",
			"frames":{"width":134,"height":142},
			"animations":{
				"idle":{
					"duration":"100",
					"loop":true,
					"frames":["0","1","2","3","4","5","6","7","8"]
				},
				"punch":{
					"duration":"50",
					"loop":false,
					"frames":["9","10","11","12"]
				}
			}
		}
	});
}
