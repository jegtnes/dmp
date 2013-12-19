$(document).ready(function() {
  var arrival = $('#arr'),
  departure = $('#dep'),
  arrHidden = $('#arr-hidden'),
  depHidden = $('#dep-hidden'),
  date = $('#date'),
  time = $('#time');
  var stationData;

  arrival.typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0,
      filter: function(data){
        stationData = data;
        console.log(stationData);
        return data;
      }
    },
  });
  departure.typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0
    }
  });
  date.pickadate({
    format: 'dd/mm/yyyy',
    formatSubmit: 'ddmmyyyy',
    min: true,
    max: 80
  });
  time.pickatime();

  departure.bind('typeahead:selected', function(obj, datum, name) {
    depHidden.val(datum.code);
    if (datum.value.match(/\(all stations\)/)) {
      departure.val(datum.code);
    }
  });

  departure.bind('typeahead:autocompleted', function(obj, datum, name) {
    depHidden.val(datum.code);
    if (datum.value.match(/\(all stations\)/)) {
      departure.val(datum.code);
    }
  });

  arrival.bind('typeahead:selected', function(obj, datum, name) {
    arrHidden.val(datum.code);
    if (datum.value.match(/\(all stations\)/)) {
      arrival.val(datum.code);
    }
  });

  arrival.bind('typeahead:autocompleted', function(obj, datum, name) {
    arrHidden.val(datum.code);
    if (datum.value.match(/\(all stations\)/)) {
      arrival.val(datum.code);
    }
  });

  $('#journeyForm').on('submit', function(event) {

    if (depHidden.val() !== "") {
      departure.val(depHidden.val());
      depHidden.remove();
    }

    if (arrHidden.val() !== "") {
      arrival.val(arrHidden.val());
      arrHidden.remove();
    }
  });
});
