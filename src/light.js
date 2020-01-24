class Light {
	constructor() {
	}

	init(server, socket, data) {
		this.socket = socket;
		this.server = server;
		this.data = data;
		this.current_command = null;
		this.intervals = [];
		console.log("  - Yeelight <" + this.data.name + "> active!");
	}

	get name() {
		return this.data.name;
	}

	setRGB(rgb, duration = 0) {
		let color = (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
		let params = {
			id: 1,
			method: 'set_rgb',
			params: [color, (duration == 0 ? 'sudden' : 'smooth'), duration]
		};
		this.logAction("RGB", rgb, duration)
		this.current_command = "set_rgb"
		this.socket.write(JSON.stringify(params) + '\r\n');
		return this;
	}

	setBrightness(brightness, duration = 0) {
		let params = {
			id: 1,
			method: 'set_bright',
			params: [brightness, (duration == 0 ? 'sudden' : 'smooth'), duration]
		};
		this.logAction("brightness", brightness, duration)
		this.current_command = "set_bright"
		this.socket.write(JSON.stringify(params) + '\r\n');
		return this;
	}

	setPower(power, duration = 200) {
		let params = {
			id: 1,
			method: 'set_power',
			params: [power ? "on" : "off", duration == 0 ? "sudden" : "smooth", duration]
		};
		this.logAction("power", power, duration)
		this.current_command = "set_power"
		this.socket.write(JSON.stringify(params) + '\r\n');
		return this;
	}

	setName(name) {
		let params = {
			id: 1,
			method: "set_name",
			params: [name]
		}
		this.logAction("name", name)
		this.current_command = "set_name"
		this.socket.write(JSON.stringify(params) + '\r\n');
		return this;
	}

	getProp(props) {
		let params = {
			id: 1,
			method: "get_prop",
			params: props
		}
		this.logAction("get_prop", props)
		this.current_command = "get_prop"
		this.socket.write(JSON.stringify(params) + '\r\n');
		return this;
	}

	logAction(action, value, duration = -1) {
		console.log(`<${this.data.name}>  - Sending command ${action} with parameters "${value}"${duration == -1 ? "" : ` (duration: ${duration})`}`)
	}

	send(text) {
		this.socket.write(text + "\r\n");
	}

	response(data) {
		console.log("raw= " + data)
		switch (this.current_command) {
			case "set_rgb":
				break;
			case "set_bright":
				break;
			case "set_power":
				break;
			case "set_name":
				break;
			case "get_prop":
				console.log(data)
				break;
			default:
				console.error("Unknown current command <" + this.current_command + ">")
				break;
		}
	}

	after(timeout, fn) {
		setTimeout(fn.bind(this), timeout);
		return this;
	}

	onInterval(name, fn, timeout, limit = -1) {
		let test = null
		let promise = new Promise(function(resolve, reject) { test = resolve; }.bind(this));
		let interval = setInterval(function() {
			fn.bind(this)(this.intervals[name].count);
			if (this.intervals[name].limit == this.intervals[name].count) {
				this.clearInterval(name);
			} else {
				this.intervals[name].count++;
			}
		}.bind(this), timeout);

		this.intervals[name] = {
			interval: interval,
			test: test,
			promise: promise,
			count: 1,
			limit: limit
		};
		console.log("Created interval <" + name + "> for light <" + this.name + ">");
		return promise;
	}

	clearInterval(name) {
		if (this.intervals[name]) {
			clearInterval(this.intervals[name].interval);
			this.intervals[name].test('ok');
			this.intervals.splice(this.intervals.indexOf(name), 1);
			console.log("Cleared interval <" + name + ">");
		} else {
			console.error("Unknown interval <" + name + ">");
		}
		return this;
	}
};

module.exports = Light;
