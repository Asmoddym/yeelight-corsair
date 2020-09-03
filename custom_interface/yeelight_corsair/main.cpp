//
// main.cpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\main.cpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 23:24:47
// Last modification at: 03 Sep 2020, 23:29:25
//

#include "yeelight_corsair\Core\Core.hpp"
#include "utils\cpp_utils\include\log.hpp"

int main() {
	yeelight_corsair::Core core;
	int ret;

	if (core.init()) {
		getchar();
		return 1;
	}
	ret = core.launch();
	LOG_L("=== Return code: ", ret, " ===");
	getchar();
	return ret;
}
