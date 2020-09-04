const api_calls = require('./calls');

class API {
	init(yeelight_server) {
		console.log("Initializing API...")
		this.yeelight_server = yeelight_server
	}

	processRequest(body) {
		switch (body.action) {
			case "set_new_color":
				this.yeelight_server.addEvent(api_calls.set_new_color, {color: body.color});
				break;
			default:
				console.error("Unknown action ", body.action)
				return 1;
		}
		return 0;
	}
};

module.exports = API
