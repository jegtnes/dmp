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
  $('#date').kalendae({
    format: "DD/MM/YYYY"
  });
  $('#time').pickatime()
});
