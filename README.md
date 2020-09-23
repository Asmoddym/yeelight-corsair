# yeelight-corsair

This project creates a communication between Yeelights and a Corsair RGB keyboard :D

This project is composed of 2 parts:  
  - custom_interface: a (really) simple interface which gets the current color of the A key (thanks to the Corsair SDK) and sends it to the server
  - server: a NodeJS server which creates a connection with the Yeelights connected to the network, waits for a call from the custom_interface, and sends the new color to the lights.
  
  
  Currently in development, I intent to create an Electron app to send more commands (for now it's just an endless poll, but as it works...) 
