function main() {

	var canvas = M.dom("canvas"),
		layer = M.createGameLayer(),
		emitter = new M.effects.visual.RadialParticleEmitter(100, null, 0.5, 0.5, 2, 2, 0.001, 0.05);

	M.start();

	layer.push(emitter);

	M.pushGameObject({
		onLoop: function() {
			if ( M.mouse.clicked() || M.touch.ended() ) {
				emitter.create(M.mouse.x || M.touch.x, M.mouse.y || M.touch.y);
			}
		}
	});

}