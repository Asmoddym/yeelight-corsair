//
// ServerInterface.cpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\ServerInterface\ServerInterface.cpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 23:13:17
// Last modification at: 03 Sep 2020, 23:32:35
//

#include "ServerInterface.hpp"

yeelight_corsair::ServerInterface::ServerInterface() {
}

yeelight_corsair::ServerInterface::~ServerInterface() {
}


/*
** PUBLIC
*/


int yeelight_corsair::ServerInterface::init() {
	LOG_D("Initializing ServerInterface...");
	_request = http::Request("192.168.1.22/yeelight_corsair/api");
	LOG_D("OK");
	return 0;
}

int yeelight_corsair::ServerInterface::setNewColor(CorsairLedColor &color) {
	const http::Response = request.send("GET", "a=1&b=2");

	return 0;
}


/*
** PRIVATE
*/

