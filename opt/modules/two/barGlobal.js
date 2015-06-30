if (typeof(window) != "undefined") {
	window.bar = 1;
}
else if (typeof(process) != "undefined") {
	process.bar = 1;
}