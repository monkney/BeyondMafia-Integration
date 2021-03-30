const Effect = require("../Effect");
const Random = require("../../../../Random");

module.exports = class Insanity extends Effect {

	constructor() {
		super("Insanity");
	}

	speak(message) {
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var originalLength = message.content.length;

		message.content = "";
		message.parseForReview = this.parseSpeechForReview;
		message.modified = true;

		for (let i = 0; i < originalLength; i++) {
			let isSpace = Random.randFloat();

			if (isSpace < 0.2)
				message.content += " ";
			else
				message.content += chars[Random.randInt(0, chars.length - 1)];
		}
	}

	parseSpeechForReview(message) {
		message.content = message.versions["*"].content;
		return message;
	}

};