$(document).ready(function() {
  $('#arr').typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0
    }
  });
  $('#dep').typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0
    }
  });
  $('#date').pickadate({
    format: 'dd/mm/yyyy'
  });
  $('#time').pickatime();

  $('#dep').bind('typeahead:selected', function(obj, datum, name) {
    document.getElementById('dep-hidden').value = datum.code;
  });

  $('#arr').bind('typeahead:selected', function(obj, datum, name) {
    document.getElementById('arr-hidden').value = datum.code;
  });
});
