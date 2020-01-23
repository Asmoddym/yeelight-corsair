const Light = require("./light");
const Lookup = require("node-yeelight-wifi").Lookup;

const net = require("net");
const ip = require('ip');

class Server {
	init() {
		console.log("Initializing server...");
	}

	launch() {
		console.log("Launching server...");

		this.tcp_server_started = false;
		this.lights = [];
		this.server = this.initServer();
		this.yeelight_lookup = this.initLookup();
		this.sockets = [];
		this.lights_ids = [];
	}

	initLookup() {
    let look = new Lookup();
    look.on("detected", light => {
			console.log("New yeelight detected (id: " + light.id + ", name: <" + light.name + ">)");
			if (!light.power) {
		    light.setPower(true);
			}
			this.connectLight(light);
    });
    return look;
	}

	initServer() {
		let _this = this;
		var server = net.createServer(function(socket) {
			socket.setEncoding("utf8");
			let remote_address = _this.getRemoteAddressFromSocket(socket);
			console.log("Found new socket, remote address: " + remote_address);

	    socket.on('close', () => {
	    	console.log("REMOVE LIGHT !!!")
	    });
	    socket.on('data', (data) => { console.log(">>> ", data) })
			let light = new Light();
			light.init(socket, remote_address)
			_this.lights.push(light)
		});

		server.on('error', (e) => {
	    console.error(e.code);
		});

		server.listen(54321, () => {
			console.log("Server bound")
		});
		return server;
	}

	getRemoteAddressFromSocket(socket) {
		let parts = socket.remoteAddress.split(":");
		return parts[parts.length - 1];
	}

	connectLight(yeelight) {
		yeelight.sendCommand("set_music", [1, this.findIpInNetwork(yeelight.host), 54321]).then(() => {
			console.log("Light connected to server");
		}).catch(e => {
			console.log(e);
		});
	}

	findIpInNetwork(remoteIp) {
		const os = require('os');
		const ifaces = os.networkInterfaces();

		let cidrs = [];
		let host = null;

		Object.keys(ifaces).forEach(function (ifname) {
			ifaces[ifname].forEach(function (iface) {
				if ('IPv4' !== iface.family || iface.internal !== false) return;
				cidrs.push(iface.cidr);
			});
		});

		cidrs.forEach(cidr => {
			if (ip.cidrSubnet(cidr).contains(remoteIp)) {
				host = cidr.split('/')[0];
			}
		});

		if (!host) throw "Can't find shared network";

		return host;
	}

	forAllLights(fn) {
		this.lights.forEach(fn)
	}

	forLight(name, fn) {
		this.lights.filter
	}
}

module.exports = Server;
