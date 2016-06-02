var express = require('express');
var app = express();
var router = express.Router();
var seasonScrape = require('./scrapeSeason');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


router.get('/', function(req, res) {
	seasonScrape.get(2013, function(seasonData){
		console.log("in callback");
		res.render('index', { data: seasonData });
	});
	
	console.log("in router");
});

router.get('/cumulative', function(req, res) {
	seasonScrape.get(2013, function(seasonData){
		console.log("in callback");
		res.render('cumulative', { data: seasonData });
	});
	
	console.log("in router");
});

app.use('/', router);

app.listen(8082);
console.log('8082 is the magic port');