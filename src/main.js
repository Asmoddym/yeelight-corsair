const Server = require("./server.js");

var server = new Server();

server.init();

server.launch();

//setTimeout(() => { server.lights.forEach(light => { light.setPower(true)}) }, 2000)
setInterval(() => { server.lights.forEach(light => { console.log("test"); light.send("{\"id\":1,\"method\":\"get_prop\",\"params\":[\"\"]}")})}, 1000)

