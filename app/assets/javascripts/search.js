$(document).ready(function() {
  var arrival = $('#arr'),
  departure = $('#dep'),
  arrHidden = $('#arr-hidden'),
  depHidden = $('#dep-hidden'),
  date = $('#date'),
  time = $('#time');

  arrival.typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0
    }
  });
  departure.typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0
    }
  });
  date.pickadate({
    format: 'dd/mm/yyyy'
  });
  time.pickatime();

  departure.bind('typeahead:selected', function(obj, datum, name) {
    depHidden.val(datum.code);
  });

  arrival.bind('typeahead:selected', function(obj, datum, name) {
    depHidden.val(datum.code);
  });

  $('#journeyForm').on('submit', function(event) {
    if (depHidden.val() !== "") {
      departure.val(depHidden.val());
      depHidden.remove();
    }

    if (depHidden.val() !== "") {
      arrival.val(depHidden.val());
      depHidden.remove();
    }
  });
});
