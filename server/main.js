const YeelightServer = require("./yeelight_server/server.js");
const yeelight_constants = require("./yeelight_server/constants");
const API = require('./api/api.js')

var yeelight_server = new YeelightServer();
let api = new API(yeelight_server);

api.init(yeelight_server)
yeelight_server.init();

const http = require('http')
const { parse } = require('querystring');

http.createServer(function (req, res) {
	yeelight_server.http_server_response = res;
	if (req.url == "/api" && req.method == "POST") {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			body = parse(body);
			res.writeHead(200, {'Content-Type': 'text/html'});
			api.processRequest(body)
		});
	}
}).listen(8080);

yeelight_server.launch().then(function() {
	yeelight_server.all(function(light) {
		light.setBrightness(100)
	})

	yeelight_server.loop_interval_id = setInterval(function() {
		const event = yeelight_server.pollEvent()
		if (event != null) {
			let ret = yeelight_server.processEvent(event);
			yeelight_server.http_server_response.end(ret != null ? "Error: " + ret : "ok");
		}
	}, 300)
})

/*
yeelight_server.launch().then(function() {
	this.all(function(light) {
		light.setRGB(constants.colors.green).after(2000, function() { this.reset() })
	})
	*/
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
		yeelight_server.get("batterie").setRGB([255, 255, 255])
	})
	*/
//	this.get("batterie").setRGB(constants.colors.white).onInterval("bla", function(count) { this.setTemperature(count * 25) }, 2000, 4)
/*
}.bind(yeelight_server));
*/
