//
// Core.cpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\Core\Core.cpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 22:24:07
// Last modification at: 03 Sep 2020, 23:38:53
//

#include "Core.hpp"
#include "utils\cpp_utils\include\log.hpp"
#include "yeelight_corsair\CorsairError\CorsairError.hpp"
#include <windows.h>

yeelight_corsair::Core::Core() :
	_running(false) {
}

yeelight_corsair::Core::~Core() {
}


/*
** PUBLIC
*/


int yeelight_corsair::Core::init() {
	LOG_D("Initializing Core...");
	CorsairPerformProtocolHandshake();
	if (const auto error = CorsairGetLastError()) {
		LOG_E("Handshake failed: ", yeelight_corsair::CorsairError::toString(error));
		return 1;
	}
	if (_server.init()) {
		return 1;
	}
	LOG_D("OK");
	return 0;
}

int yeelight_corsair::Core::launch() {
	_running = true;
	_loop_thread = std::thread(&yeelight_corsair::Core::loop, this);

	getchar();

	_running = false;
	_loop_thread.join();
	return 0;
}


/*
** PRIVATE
*/


void yeelight_corsair::Core::loop() {
	CorsairLedColor led_color { CLK_A };

	while (_running) {
		if (retrieveCurrentColor(led_color)) {
			return ;
		}
		LOG_L("New color: ", led_color.r, ", ", led_color.g, ", ", led_color.b);
		if (_server.setNewColor(led_color)) {
			_running = false;
			return ;
		}

		Sleep(1000);
	}
}

int yeelight_corsair::Core::retrieveCurrentColor(CorsairLedColor &color) {
	if (!CorsairGetLedsColors(1, &color)) {
		_running = false;
		LOG_E("Unable to retrieve current color: ", yeelight_corsair::CorsairError::toString(CorsairGetLastError()));
		return 1;
	}
	return 0;
}
