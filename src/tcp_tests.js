var startYeelight = function() {

    const Lookup = require("node-yeelight-wifi").Lookup;
    const ip = require('ip');

    var controls = [];
    var currentDominant = null;
    var lastUpdate = new Date().getTime();

    var ok = false;

    console.log('Looking for Yeelight...');
    let look = new Lookup();
    look.on("detected", light => {
			ok = true;
			console.log("New yeelight detected: id=" + light.id + " name=" + light.name);
			if (!light.power) {
		    light.setPower(true);
			}

			connectToTcpServer(light);
    });

    var bla = true

    var interval = setInterval(() => {
	if (controls.length == 2) {
	    if (!ok) {
		look.lookup();
	    }
	    else {
		for (var i in controls) {
		    controls[i].setRGB([rand(), rand(), rand()], 0)
		}
		//	    clearInterval(interval);
	    }
	}
    }, 1000);

    let tcpServerStarted = false;

    var connectToTcpServer = function(light) {
	return new Promise((resolve, reject) => {
	    if (!tcpServerStarted) {
		tcpServerStarted = true;
		var net = require('net');

		var server = net.createServer(function(socket) {
		    console.log('Light connected to TCP server');
		    let control = {
			setRGB: function(rgb, duration) {
			    let color = (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
			    let params = {
				id: 1,
				method: 'set_rgb',
				params: [color, (duration == 0 ? 'sudden' : 'smooth'), duration]
			    };
			    socket.write(JSON.stringify(params) + '\r\n');
			},
			setBright: function(bright, duration) {
			    let params = {
				id: 1,
				method: 'set_bright',
				params: [bright, (duration == 0 ? 'sudden' : 'smooth'), duration]
			    };
			    socket.write(JSON.stringify(params) + '\r\n');
			},
			setPower: function(power) {
			    let params = {
				id: 1,
				method: 'set_power',
				params: [power, "smooth", 200]
			    };
			    socket.write(JSON.stringify(params) + '\r\n');
			}
		    };
		    control.setBright(100, 0)
		    controls.push(control);

		    socket.on('close', () => {
			let index = controls.indexOf(control);
			if (~index) controls.splice(index, 1);
		    });
		});

		server.on('error', (e) => {
		    console.error(e.code);
		});

		server.listen(54321);
	    }
	    let host = findIpInNetwork(light.host);

	    light.sendCommand("set_music", [1, host, 54321]).then(() => { console.log("ok !") }).catch(e  => {
		console.error(e);
	    });
	});
    };

    var findIpInNetwork = function(remoteIp) {
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
    };
};

startYeelight();


function rand() {
    return Math.ceil(Math.random() * 255)
}




class Light {

    function connect() {
    }
}
