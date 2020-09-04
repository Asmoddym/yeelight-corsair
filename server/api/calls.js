module.exports = {
	set_new_color: function(server, params) {
		console.log("Setting new color: ", params);
		split = params.color.split(",")
		if (split.length != 3) {
			return "Badly formated color";
		}
		color = [parseInt(split[0]), parseInt(split[1]), parseInt(split[2])];
		if (typeof server.current_color == 'undefined' || server.current_color.toString() != color.toString()) {
			server.current_color = color;
			server.all(function(light) {
				light.setRGB(color, 500)
			})
		}

		return null
	}
}
