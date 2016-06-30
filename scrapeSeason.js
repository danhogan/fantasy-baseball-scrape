var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var leagueId = 109780; //change this to the leagueId in the url of your league's homepage

module.exports = {
	get: function(seasonYear, callbackToMain){
		var weekArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]; //21 matchups/weeks + 2 playoff matchups

		async.map(weekArray, function(weekNumber, callback){
			request('http://games.espn.go.com/flb/scoreboard?leagueId=' + leagueId + '&seasonId=' + seasonYear + '&matchupPeriodId=' + weekNumber, function (error, response, html) {
			  	if (!error && response.statusCode == 200) {
			    	processHTML(html, function(data){
				    	console.log("finished week number " + weekNumber);
			    		callback(null, data);
			    	});
			  	} else {
			  		console.log(response);
			  		console.log(error);
			  	}
			});
		}, function(err, season){
			if(err){
				console.log(err);
			} else {
				callbackToMain(season);
			}
		});
	}
}

function processHTML(html, thisCallback){
	var $ = cheerio.load(html);
		    	
	var x = 0;
	var weekStats = [];
	
	$('.linescoreTeamRow td').each(function(i, element){
  		var line = $(this).text();

  		if(i % 15 == 0){
  			if(i > 0){
  				x++;
  			}

  			weekStats[x] = {};
		}
  		
  		var z = x*15
  		
  		switch(i){
	      	case 0 + z:
	      		weekStats[x].Name = line;
	      		break;
	      	case 2 + z:
	      		weekStats[x].R = line;
	      		break;
	      	case 3 + z:
	      		weekStats[x].HR = line;
	      		break;
	      	case 4 + z:
	      		weekStats[x].RBI = line;
	      		break;
	      	case 5 + z:
	      		weekStats[x].SB = line;
	      		break;
	      	case 6 + z:
	      		weekStats[x].AVG = line;
	      		break;
	      	case 8 + z:
	      		weekStats[x].K = line;
	      		break;
	      	case 9 + z:
	      		weekStats[x].W = line;
	      		break;
	      	case 10 + z:
	      		weekStats[x].SV = line;
	      		break;
	      	case 11 + z:
	      		weekStats[x].ERA = line;
	      		break;
	      	case 12 + z:
	      		weekStats[x].WHIP = line;
	      		break;
	      	case 14 + z:
	      		weekStats[x].Record = line;
	      		break;

	      	default:
	      		break;
		}
	});

	thisCallback(weekStats);
}