const Lookup = require("node-yeelight-wifi").Lookup;

var lights = [];

let look = new Lookup();
look.on("detected", light => {
    console.log("new light");

    lights.push(light)

    //socket connect and disconnect events
    light.on("connected",() =>{ console.log("connected"); });
    light.on("disconnected",() => { console.log("disconnected"); });

    //if the color or power state has changed
    light.on("stateUpdate",(light) => { console.log(light.rgb); });

    //if something went wrong
    light.on("failed",(error) => { console.log(error); });
});

setInterval(() => {
    for (var light of lights) {
	light.setRGB([rand(), rand(), rand()]).then(() => { console.log("ok") }).catch((error => { console.log("failed", error)}));
    }
}, 100);


function rand() {
    return Math.ceil(Math.random() * 255)
}
