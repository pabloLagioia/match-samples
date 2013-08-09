function main() {

	if ( M.browser.supportedAudioFormat ) {
	
		M.dom("#result").innerHTML = M.browser.getBrowserAudioSupportedFormats();
		M.dom("#result1").innerHTML = M.browser.getBrowserPreferredAudioFormat();
		
		M.sounds.onAllSoundsLoaded.addEventListener(function() {
			M.dom("#loading").style.setProperty("visibility", "hidden")
			M.dom("#playOptions").style.setProperty("visibility", "visible");
			console.debug("hola");
		});

		M.sounds.load("helloWav", "http://www.eventsounds.com/wav/hello4.wav");
		M.sounds.load("helloMp3", "http://www.sounddogs.com/voices-vocals/31/mp3/272677_SOUNDDOGS__gr.mp3");
		M.sounds.load("helloOgg", "http://www.lunerouge.org/sons/humain/LRApplauses%201%20by%20Lionel%20Allorge.ogg");

		M.dom("#wav").onclick = function() {
			M.dom("#status").innerHTML = "playing wav";
			M.sounds.helloWav.play();
		}

		M.dom("#mp3").onclick = function() {
			M.dom("#status").innerHTML = "playing mp3";
			M.sounds.helloMp3.play();
		}

		M.dom("#ogg").onclick = function() {
			M.dom("#status").innerHTML = "playing ogg";
			M.sounds.helloOgg.play();
		}
	} else {
	
		M.dom("#result").innerHTML = "Your browser does not support HTML5 Audio";
	
	}


}