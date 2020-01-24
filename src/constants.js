const Utils = require("./utils");

module.exports = {
	port: 54321,
	discover_delay: 2000,

	colors: {
		red: [255, 0, 0],
		green: [0, 255, 0],
		blue: [0, 0, 255],
		white: [255, 255, 255],
		random: function() { return [Utils.rand(255), Utils.rand(255), Utils.rand(255)] }
	}
};
