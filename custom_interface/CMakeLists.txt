#
# CMakeLists.txt for custom_interface
# File path: G:\projects\NodeJS\yeelight-corsair\custom_interface\CMakeLists.txt
#
# Author              : Asmoddym
# Created at          : 03 Sep 2020, 22:09:57
# Last modification at: 03 Sep 2020, 23:25:15
#

cmake_minimum_required(VERSION 3.7.2)
project(YeelightCustomInterface)
set(CMAKE_CXX_STANDARD 17)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/bin)

set(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake_modules")

if (WIN32)
	cmake_policy(SET CMP0074 NEW)
	set(BOOST_ROOT "G:/projects/C++/libs/boost_1_73_0")
	set(BOOST_DLL_ROOT_DIR ${BOOST_ROOT}/lib64-msvc-14.2)
	set(Boost_USE_STATIC_LIBS ON)
	set(CMAKE_RUNTIME_OUTPUT_DIRECTORY $<1:${EXECUTABLE_OUTPUT_PATH}>)
	set(Boost_USE_STATIC_LIBS ON)
	set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS TRUE)
	set(BUILD_SHARED_LIBS TRUE)

	file(GLOB BOOST_DLL_FILES "${BOOST_DLL_ROOT_DIR}/*filesystem*.dll") #add another string argument for other files to glob
	file(GLOB CPP_UTILS_DLL_FILES "${CMAKE_CURRENT_SOURCE_DIR}/utils/cpp_utils/lib/*log*.dll")
	file(GLOB CUE_SDK_DLL_FILES "${CMAKE_CURRENT_SOURCE_DIR}/utils/cue_sdk/lib/*x64*.dll")

	add_custom_target(custom_interface_create_bin_directory ALL COMMAND ${CMAKE_COMMAND} -E make_directory ${EXECUTABLE_OUTPUT_PATH})
	add_custom_target(custom_interface_copy_dlls ALL COMMAND ${CMAKE_COMMAND} -E copy ${BOOST_DLL_FILES} ${CPP_UTILS_DLL_FILES} ${CUE_SDK_DLL_FILES} ${EXECUTABLE_OUTPUT_PATH})
	add_dependencies(custom_interface_copy_dlls custom_interface_create_bin_directory)
endif(WIN32)

if (UNIX)
	set(CMAKE_CXX_FLAGS "-W -Wall -Wextra")
endif(UNIX)

find_package(Boost 1.68 COMPONENTS filesystem REQUIRED) #date_time timer chrono

add_subdirectory(utils/cpp_utils)

link_directories(utils/cue_sdk/lib)
include_directories(. utils/cpp_utils utils/cue_sdk/include)

add_executable(custom_interface
	yeelight_corsair/main.cpp
	yeelight_corsair/Core/Core.cpp yeelight_corsair/Core/Core.hpp
	yeelight_corsair/CorsairError/CorsairError.cpp yeelight_corsair/CorsairError/CorsairError.hpp
	yeelight_corsair/ServerInterface/ServerInterface.cpp yeelight_corsair/ServerInterface/ServerInterface.hpp
)

add_dependencies(custom_interface cpp_utils_log custom_interface_copy_dlls)

target_link_libraries(custom_interface CUESDK.x64_2017)
