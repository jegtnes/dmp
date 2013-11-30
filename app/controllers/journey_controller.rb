class JourneyController < ApplicationController
  def index
    date = format_date(params[:date])
    time = format_time(params[:time])
    dep = params[:dep]
    arr = params[:arr]
    journey_scraper = JourneyScraper.new(params[:dep], params[:arr], date, time)
    @journeys = JSON.parse journey_scraper.call
    @departure_station = get_station_name_from_code(dep)
    @arrival_station = get_station_name_from_code(arr)
  end
end
