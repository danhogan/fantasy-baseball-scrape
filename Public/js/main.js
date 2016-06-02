//TODO: consolidate main.js and cumulative.js, keep it DRY
//TODO: fix the many hard-coded numbers

jQuery(function($){
//********


var displayData = function contortData(category, year){
	var result = [[],[],[],[],[],[],[],[],[],[]];

	//loop through matchups/weeks
	for(var i = 0; i < 23; i++){

		//loop through teams
		for(var x = 0; x < 10; x++){
			var teamNow;

			//playoff team names include playoff seed in front
			if(matchupData[i][x].Name.substring(0,1) == "#"){
				teamNow = matchupData[i][x].Name.substring(matchupData[i][x].Name.indexOf(" ") + 1);
			} else {
				teamNow = matchupData[i][x].Name;
			}

			//match all data for a category with the right team
			for(var t = 0; t < 10; t++){
				if(teamNow == teamNames[year][t]){
					if(category == "AVG" || category == "ERA" || category == "WHIP"){
						result[t].push([i, parseFloat(matchupData[i][x][category])]);
					} else {
						result[t].push([i, parseInt(matchupData[i][x][category])])
					}
				}
			}
		}
	}

	var final = [];

	//format data to object-array for graph
	for(var r = 0; r < 10; r++){
		final.push({
			data: result[r],
			label: teamNames[year][r].split(" (")[0]
		})
	}

	return final;
}

var yearIndex = 0;

drawMultiLine(displayData("R", yearIndex), "runsMultiLine", "Runs", yearIndex);
drawMultiLine(displayData("HR", yearIndex), "homerunsMultiLine", "Home Runs", yearIndex);
drawMultiLine(displayData("RBI", yearIndex), "rbiMultiLine", "RBIs", yearIndex);
drawMultiLine(displayData("SB", yearIndex), "stolenbasesMultiLine", "Stolen Bases", yearIndex);
drawMultiLine(displayData("AVG", yearIndex), "avgMultiLine", "AVG", yearIndex);

drawMultiLine(displayData("W", yearIndex), "winsMultiLine", "Wins", yearIndex);
drawMultiLine(displayData("K", yearIndex), "strikeoutsMultiLine", "Strikeouts", yearIndex);
drawMultiLine(displayData("SV", yearIndex), "savesMultiLine", "Saves", yearIndex);
drawMultiLine(displayData("ERA", yearIndex), "eraMultiLine", "ERA", yearIndex);
drawMultiLine(displayData("WHIP", yearIndex), "whipMultiLine", "WHIP", yearIndex);


//********
});