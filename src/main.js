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
