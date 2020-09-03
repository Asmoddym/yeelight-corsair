//
// ServerInterface.hpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\ServerInterface\ServerInterface.hpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 23:13:17
// Last modification at: 03 Sep 2020, 23:30:19
//

#ifndef CUSTOM_INTERFACE_YEELIGHT_CORSAIR_SERVERINTERFACE_HPP_
# define CUSTOM_INTERFACE_YEELIGHT_CORSAIR_SERVERINTERFACE_HPP_

#include "utils\http_request\http_request.hpp"
# include "utils\cue_sdk\include\cue_sdk.hpp"

namespace yeelight_corsair {
	class ServerInterface {
	private:
		http::Request _request;

	public:
		ServerInterface();
		virtual ~ServerInterface();

		int init();

		int setNewColor(CorsairLedColor &color);
	};
}

#endif /* !CUSTOM_INTERFACE_YEELIGHT_CORSAIR_SERVERINTERFACE_HPP_ */
