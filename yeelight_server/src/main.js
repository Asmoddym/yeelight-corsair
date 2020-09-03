const Server = require("./server.js");
const constants = require("./constants");
var server = new Server();

server.init();

server.launch().then(function() {
	this.all(function(light) {
		light.setRGB(constants.colors.green).after(2000, function() { this.reset() })
	})
	/*
	this.get("batterie").setRGB(constants.colors.white)
	this.get("batterie").onInterval("bla", function() {
			this.setTemperature(i);
			i += 200
		}
	}, 1000)
/*	this.get("batterie").onInterval("bla", function(count) {
		console.log(count)
	}, 500, 3).then(function() {
		server.get("batterie").setRGB([255, 255, 255])
	})
*/
//	this.get("batterie").setRGB(constants.colors.white).onInterval("bla", function(count) { this.setTemperature(count * 25) }, 2000, 4)

}.bind(server));
