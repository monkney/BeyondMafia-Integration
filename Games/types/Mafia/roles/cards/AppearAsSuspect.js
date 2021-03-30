const Card = require("../../Card");

module.exports = class AppearAsSuspect extends Card {

	constructor(role) {
		super(role);

		this.appearance = {
			self: "Villager",
			reveal: "real",
			lynch: "Mafioso",
			death: "real",
			investigate: "Mafioso"
		};
	}

}