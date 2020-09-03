//
// Core.hpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\Core\Core.hpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 22:24:07
// Last modification at: 03 Sep 2020, 23:29:36
//

#ifndef CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORE_HPP_
# define CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORE_HPP_

# include "yeelight_corsair\ServerInterface\ServerInterface.hpp"
# include <thread>
# include "utils\cue_sdk\include\cue_sdk.hpp"

namespace yeelight_corsair {
	class Core {
	private:
		bool _running;
		std::thread _loop_thread;
		ServerInterface _server;

	public:
		Core();
		virtual ~Core();

		int init();
		int launch();

	private:
		void run();
		int retrieveCurrentColor(CorsairLedColor &color);
		void loop();
	};
}

#endif /* !CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORE_HPP_ */
