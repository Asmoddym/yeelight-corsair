//
// ServerInterface.cpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\ServerInterface\ServerInterface.cpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 23:13:17
// Last modification at: 04 Sep 2020, 19:22:57
//

#include "ServerInterface.hpp"
#include "utils\cpp_utils\include\log.hpp"
#include <sstream>

yeelight_corsair::ServerInterface::ServerInterface() :
	_request("http://192.168.1.12:8080/api") {
}

yeelight_corsair::ServerInterface::~ServerInterface() {
}


/*
** PUBLIC
*/


int yeelight_corsair::ServerInterface::init() {
	LOG_D("Initializing ServerInterface...");
	LOG_D("OK");
	return 0;
}

int yeelight_corsair::ServerInterface::setNewColor(CorsairLedColor &color) {
	std::stringstream ss;
	std::string response;

	ss << color.r << "," << color.g << "," << color.b;
	const http::Response call_response = _request.send("POST", {{"action", "set_new_color"}, {"color", ss.str()}}, {"Content-Type: application/x-www-form-urlencoded"});
	response = std::string(call_response.body.begin(), call_response.body.end());

	if (response != "ok") {
		LOG_E("Error with the API: ", response);
		return 1;
	}

	return 0;
}


/*
** PRIVATE
*/

