const Light = require("./light");
const Lookup = require("node-yeelight-wifi").Lookup;

const net = require("net");
const ip = require('ip');

const constants = require("./constants");

class Server {
	init() {
		console.log("Initializing server...");
	}

	launch() {
		this.discovery_interval = setInterval(function() { console.log(".") }, 200);
		this.tcp_server_started = false;
		this.sockets = [];
		this.afterDiscover = null;
		this.lights_ids = [];
		this.lights = [];
		return new Promise(function(resolve, reject) {
			console.log("Beginning discovery period (" + constants.discover_delay + " ms)...");
			this.server = this.initServer();
			this.yeelight_lookup = this.initLookup();
			this.processAfterDiscover(resolve);
		}.bind(this))
	}

	processAfterDiscover(resolve) {
		setTimeout(function() {
			resolve()
			clearInterval(this.discovery_interval);
			console.log("\nDiscovery ended!\n");
			console.log("Lights found: ");
			this.lights.forEach(light => {
				console.log(`  - <${light.data.name}> (IP: ${light.data.addr})`)
			})
			console.log("\n");
			if (this.afterDiscover) {
				this.afterDiscover();
			}
		}.bind(this), constants.discover_delay)
	}

	initLookup() {
    let look = new Lookup();
    look.on("detected", light => {
    	let addr = this.getRemoteAddressFromSocket(light.socket);0
			console.log("  - New Yeelight detected on IP " + addr + " (id: " + light.id + ", name: <" + light.name + ">)");
			this.lights_ids.push({id: light.id, name: light.name, addr: addr});
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
			let addr = _this.getRemoteAddressFromSocket(socket);
			console.log("  - Found new socket, remote address: " + addr);

	    socket.on('close', () => {
	    	console.log("REMOVE LIGHT !!!")
	    });
			let light = new Light();
			let light_data = _this.lights_ids.filter(item => { return item.addr == addr });
			if (light_data.length == 0) {
				console.error("Unknown light data for IP " + addr);
			} else {
				light.init(_this, socket, light_data[0]);
				_this.lights.push(light)
			}
		});

		server.on('error', (e) => {
	    console.error(e.code);
		});

		server.listen(constants.port, () => {
			console.log("Server bound")
		});
		return server;
	}

	getRemoteAddressFromSocket(socket) {
		let parts = socket.remoteAddress.split(":");
		return parts[parts.length - 1];
	}

	connectLight(yeelight) {
		yeelight.socket.setEncoding("utf8");
		yeelight.sendCommand("set_music", [1, this.findIpInNetwork(yeelight.host), constants.port]).then(() => {
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
				if ('IPv4' !== iface.family || iface.internal !== false) {
					return;
				}
				cidrs.push(iface.cidr);
			});
		});

		cidrs.forEach(cidr => {
			if (ip.cidrSubnet(cidr).contains(remoteIp)) {
				host = cidr.split('/')[0];
			}
		});

		if (!host) {
			throw "Can't find shared network";
		}

		return host;
	}

	all(fn = null) {
		this.lights.forEach(fn);
	}

	get(name) {
		let light = this.lights.filter(item => { return item.data.name == name })[0];
		if (typeof light == 'undefined') {
			throw "Unable to get light " + name;
		}
		return light;
	}
}

module.exports = Server;
