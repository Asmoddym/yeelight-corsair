//
// Source.cpp for yeelight-corsair
// File path: G:\projects\NodeJS\yeelight-corsair\windows\icue_custom_interface\icue_custom_interface\Source.cpp
//
// Author              : Asmoddym
// Created at          : 31 Aug 2020, 20:51:03
// Last modification at: 31 Aug 2020, 21:05:32
//

#define CORSAIR_LIGHTING_SDK_DISABLE_DEPRECATION_WARNINGS

#ifdef __APPLE__
#include <CUESDK/CUESDK.h>
#else
#include <CUESDK.h>
#endif

#include <windows.h>
#include <iostream>
#include <atomic>
#include <thread>
#include <string>
#include <cmath>

namespace yeelight_corsair {
	class Error {
	public:
		static inline const char *toString(CorsairError error) {
			switch (error) {
				case CE_Success:
				return "CE_Success";
				case CE_ServerNotFound:
				return "CE_ServerNotFound";
				case CE_NoControl:
				return "CE_NoControl";
				case CE_ProtocolHandshakeMissing:
				return "CE_ProtocolHandshakeMissing";
				case CE_IncompatibleProtocol:
				return "CE_IncompatibleProtocol";
				case CE_InvalidArguments:
				return "CE_InvalidArguments";
				default:
				return "unknown error";
			}
		}
	};
}

namespace yeelight_corsair {
	class Core {
	private:
		CorsairLedColor _current_color;
		bool _running;

	public:
		Core() : _current_color { CLK_A }, _running { false } {}
		virtual ~Core() = default;

		int init() {
			CorsairPerformProtocolHandshake();
			if (const auto error = CorsairGetLastError()) {
				std::cout << "Handshake failed: " << yeelight_corsair::Error::toString(error) << "\nPress any key to quit." << std::endl;
				getchar();
				return 1;
			}
			return 0;
		}

		void retrieveCurrentColor() {
			CorsairGetLedsColors(1, &_current_color);
		}

		int run() {
			_running = true;
			while (_running) {
				retrieveCurrentColor();
				std::cout << _current_color.r << ", " << _current_color.g << ", " << _current_color.b << std::endl;
				Sleep(100);
			}
			return 0;
		}
	};
}

int main() {
	yeelight_corsair::Core core;

	if (core.init()) {
		return 1;
	}

	return core.run();
}
