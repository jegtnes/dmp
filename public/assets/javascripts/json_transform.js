var fs = require('fs');

var trains = require('./trains (original).json');

var newName = [];

for(var i = 0; i < trains.length; i++) {
	var code = trains[i].code;
	var tks = trains[i].name.split(' ').concat(code);
	newName.push(
		{
			tokens: tks,
			value: trains[i].name
		}
	);
}
console.log(newName);

trains = JSON.stringify(newName);

console.log(trains);
fs.writeFile("./rail_stations.json", trains, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
