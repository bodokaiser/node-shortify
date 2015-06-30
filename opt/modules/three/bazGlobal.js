if (typeof(window) != "undefined") {
	window.baz = 1;
}
else if (typeof(process) != "undefined") {
	process.baz = 1;
}