# Journey controller. Largely deals with interfacing with the scrapers
class JourneyController < ApplicationController
  def index
    date = format_date(params[:date])
    time = format_time(params[:time])
    dep = params[:dep]
    arr = params[:arr]
    journey_scraper = JourneyScraper.new(dep, arr, date, time)
    # TODO: This is fugly
    @journeys = (JSON.parse journey_scraper.call('/usr/local/bin/casperjs app/assets/javascripts/scraper.js'))
    .sort { | a, b | a['rtg'] <=> b['rtg'] }
    @departure_station = get_station_name_from_code(dep)
    @arrival_station = get_station_name_from_code(arr)
  end
end
