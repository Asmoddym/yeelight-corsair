class Light {
	constructor() {
	}

	init(socket, remote_address) {
		this.name =
		this.socket = socket;
		this.remote_address = remote_address;
		this.current_command = null
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
	}

	logAction(action, value, duration = -1) {
		console.log(`Light ${this.remote_address}: Sending command ${action} with parameters "${value}"${duration == -1 ? "" : ` (duration: ${duration})`}`)
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
};

module.exports = Light;
