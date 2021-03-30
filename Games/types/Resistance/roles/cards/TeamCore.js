const Card = require("../../Card");

module.exports = class TeamCore extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Group": {
				states: ["Team Selection", "Team Approval", "Mission"],
				flags: ["group", "speech"]
			},
			"Approve Team": {
				states: ["Team Approval"],
				flags: ["group", "voting", "mustAct", "includeNo"],
				inputType: "boolean",
				action: {
					run: function () {
						var teamApproved = this.target == "Yes";
						this.game.teamApproved = teamApproved;

						if (teamApproved)
							this.game.queueAlert("Team approved, beginning the mission.");
						else {
							this.game.teamFails++;
							this.game.currentTeamFail = true;
							this.game.queueAlert("Team was rejected by the group.");

							if (this.game.teamFails < this.game.teamFailLimit)
								return;

							this.game.queueAlert(`Mission ${this.game.mission} failed due to lack of a team.`);
							this.game.mission++;
							this.game.missionFails++;
						}
					}
				}
			},
			"Mission Success": {
				states: ["Mission"],
				flags: ["voting", "mustAct"],
				inputType: "boolean",
				disabled: true,
				action: {
					run: function () {
						var missionSuccess = this.target == "Yes";

						if (!missionSuccess)
							this.game.currentMissionFails++;
					}
				}
			}
		};
	}

}