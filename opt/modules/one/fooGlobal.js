if (typeof(window) != "undefined") {
	console.log("type of window: ", typeof(window));
	window.foo = 1;
}
else if (typeof(process) != "undefined") {
	process.foo = 1;
}