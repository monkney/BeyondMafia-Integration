const Card = require("../../Card");

module.exports = class VillageCore extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Village": {
				actionName: "Village Vote",
				type: "Village",
				states: ["Day"],
				whileDead: true,
				passiveDead: true,
				action: {
					labels: ["kill", "lynch", "hidden"],
					priority: 0,
					power: 3,
					run: function () {
						if (this.dominates())
							this.target.kill("lynch", this.actor);
					}
				}
			},
			"Graveyard": {
				states: ["*"],
				flags: ["group", "speech", "liveJoin"],
				whileAlive: false,
				whileDead: true,
				passiveDead: false,
			}
		};
	}

}
