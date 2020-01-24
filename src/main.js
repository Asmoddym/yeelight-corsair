const Server = require("./server.js");
const constants = require("./constants");
var server = new Server();

server.init();

server.launch().then(function() {
	this.all(light => { light.setBrightness(100).setRGB(constants.colors.white)})
	this.get("batterie").onInterval("bla", function(count) {
		console.log(count)
	}, 500, 3).then(function() {
		server.get("salon").setRGB(constants.colors.green)
	})
}.bind(server));

/*server.afterDiscover = function() {
	this.forAllLights(light => {
		light.setBrightness(100).onInterval("test_" + light.name, function() { this.setRGB(constants.colors.random())}, 1000, 5)
	})
	this.get("batterie").setBrightness(100).onInterval("test", function(count) {
		if (count == 5) {
			this.clearInterval("test")
			this.setPower(false)
		}
		this.setRGB(constants.colors.random(), 100)
	}, 1000)
}
*/
