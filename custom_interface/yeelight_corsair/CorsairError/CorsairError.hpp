//
// CorsairError.hpp for custom_interface
// File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\yeelight_corsair\CorsairError\CorsairError.hpp
//
// Author              : Asmoddym
// Created at          : 03 Sep 2020, 22:41:26
// Last modification at: 03 Sep 2020, 22:47:34
//

#ifndef CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORSAIRERROR_HPP_
# define CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORSAIRERROR_HPP_

# include "utils\cue_sdk\include\cue_sdk.hpp"

namespace yeelight_corsair {
	class CorsairError {
	private:
	public:
		CorsairError();
		virtual ~CorsairError();

		static inline const char *toString(::CorsairError error) {
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

#endif /* !CUSTOM_INTERFACE_YEELIGHT_CORSAIR_CORSAIRERROR_HPP_ */
