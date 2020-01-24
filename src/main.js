const Server = require("./server.js");
const constants = require("./constants");
var server = new Server();

server.init();

server.launch();

server.afterDiscover = function() {
	this.forAllLights(light => {
		light.setBrightness(100).onInterval("test_" + light.name, function() { this.setRGB(constants.colors.random())}, 1000, 5)
	})
/*	this.get("batterie").setBrightness(100).onInterval("test", function(count) {
		if (count == 5) {
			this.clearInterval("test")
			this.setPower(false)
		}
		this.setRGB(constants.colors.random(), 100)
	}, 1000)
*/}
