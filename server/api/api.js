class API {
	init(yeelight_server) {
		console.log("Initializing API...")
		this.yeelight_server = yeelight_server
	}

	processRequest(body) {
		console.log("Processing request: ", body)
		this.yeelight_server.addEvent(function(server) { console.log("ok") })
	}
};

module.exports = API
