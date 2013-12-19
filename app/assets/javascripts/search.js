$(document).ready(function() {
  var arrival = $('#arr'),
  departure   = $('#dep'),
  arrHidden   = $('#arr-hidden'),
  depHidden   = $('#dep-hidden'),
  date        = $('#date'),
  time        = $('#time'),
  stationData = false;

  arrival.typeahead({
    name: 'stations',
    prefetch: {
      url: 'assets/javascripts/rail_stations.json',
      ttl: 0,
      filter: function(data){

        // Store all the retrieved JSON data to our own object for usage
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

  // If choosing a city with several rail stations, just show user the name of the city
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

    event.preventDefault();

    /* Show search confirmation to make wait seem shorter */

    $('#js-dep-conf').text(departure.val());
    $('#js-arr-conf').text(arrival.val());
    $('#js-date-conf').text(date.val());
    $('#js-time-conf').text(time.val());

    $('#patience').removeClass('visuallyhidden');
    $('#journeyForm').addClass('visuallyhidden');


    /* If there's a shortcode available for the train (set earlier)
      Replace the actual value of the field with the stored value */
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
