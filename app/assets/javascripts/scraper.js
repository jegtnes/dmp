var casper = require('casper').create({
	pageSettings: {
		loadImages: false
	}
});

var debug = false;

if (casper.cli.args.length < 4) {
	console.log('Please provide four parameters: Departure, arrival, date, and time');
	casper.exit();
}

else {
	url = "http://ojp.nationalrail.co.uk/service/timesandfares/";
	url += casper.cli.raw.get(0) + '/'; //departure
	url += casper.cli.raw.get(1) + '/'; //arrival
	url += casper.cli.raw.get(2) + '/'; //date
	url += casper.cli.raw.get(3) + '/'; //time
	url += "dep";

	if (casper.cli.get(4) === true) {
		debug = true;
	}
}

var loadTime = Date.now(),
results = [];

function fetchJourneys() {
	results = casper.evaluate(function() {
		function fuzzyTimestampToMinutes(timestamp) {
			var hours = /([0-9]{1,3})h/.exec(timestamp);
			var minutes = /([0-9]{1,2})m/.exec(timestamp);
			return hours[1] * 60 + minutes[1];
		}

		function lengthRating(length) {
			return length*2;
		}

		function priceRating(price) {
			return price;
		}

		function changeRating(changes) {
			return changes+0.75;
		}

		function journeyRating(length, changes, price) {
			length = fuzzyTimestampToMinutes(length);
			price = price.replace(/[£.]/g, '')/100;
			return Math.round(lengthRating(length) * priceRating(price) * changeRating(changes));
		}

		var journeys = [];
		$('.mtx').each(function(){
			var length = $(this).find('.dur').text().trim();
			var changes = $(this).find('.chg').text().trim();
			var price = $(this).find('.opsingle > .label-text').text().trim();
			var rating = journeyRating(length, changes, price);

			journeys.push({
				dep: $(this).find('.dep').text().trim(),
				arr: $(this).find('.arr').text().trim(),
				dur: length,
				durRating: lengthRating(length),
				chg: changes,
				chgRating: changeRating(changes),
				fare: price,
				fareRating: priceRating(price),
				rtg: rating
			});
		});
		return journeys;
	});
}
casper.start(url, function() {
	loadTime = Date.now()-loadTime;
	if (debug === true) console.log("Loading time: " + loadTime + " ms");
	parseTime = Date.now();
});

casper.thenEvaluate(function(){
	laterTrains = $('span.ctf-later a');
	laterTrains.trigger("click");
});

casper.waitFor(function check() {
	return this.evaluate(function() {
		return $('.mtx').length > 5;
	});
}, function then() {    // step to execute when check() is ok
	fetchJourneys();
}, function timeout() { // step to execute if check has failed
	this.echo("Not able to get more train times").exit();
}, 5000);

casper.then(function() {
	console.log(JSON.stringify(results, undefined, 4));
	parseTime = Date.now()-parseTime;
	if (debug === true) console.log("Parsing time: " + parseTime + " ms");
});

var externalUrls = [
	"fbcdn.net",
	"facebook.com",
	"atdmt.com",
	"adServer",
	"quantserve",
	"ads.",
	"ad.",
	"analytics",
	"ga.js",
	"foresee-trigger.js",
	"autonomy/optimost",
	"survey",
	".css"
];

casper.on('resource.requested', function(requestData, request) {
	if (externalUrls.some(function (item) {
		rx = new RegExp(item);
		return rx.test(requestData['url']);
	})) {
			request.abort();
	}
});

casper.on('remote.message', function(message) {
	if (debug === true) console.log(message);
});

casper.on('page.error', function (msg, trace){
	this.echo('Error: ' + msg, 'ERROR');
});

casper.run();
