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
    $('#dep-hidden').val(datum.code);
  });

  $('#arr').bind('typeahead:selected', function(obj, datum, name) {
    $('#arr-hidden').val(datum.code);
  });

  $('#journeyForm').on('submit', function(event) {
    if ($('#dep-hidden').val() != "") {
      $('#dep').val($('#dep-hidden').val());
      $('#dep-hidden').remove();
    }

    if ($('#arr-hidden').val() != "") {
      $('#arr').val($('#arr-hidden').val());
      $('#arr-hidden').remove();
    }
  });
});
