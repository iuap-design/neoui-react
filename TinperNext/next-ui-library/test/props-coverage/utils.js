const fs = require('fs');
const path = require("path");
const readline = require('readline')
const ConsoleGrid = require("console-grid");


const debounce = (fn, delay = 500) => {
	let timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
			timer = null
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay)
	}
}
const getFirstLine = async (pathToFile) => {
	const readable = fs.createReadStream(pathToFile);
	const reader = readline.createInterface({input: readable});
	const line = await new Promise((resolve) => {
		reader.on('line', (line) => {
			reader.close();
			resolve(line);
		});
	});
	readable.close();
	return line;
}
module.exports = {debounce, getFirstLine};
