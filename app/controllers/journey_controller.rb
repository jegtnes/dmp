# Journey controller. Largely deals with interfacing with the scrapers
class JourneyController < ApplicationController
  def index
    date = format_date(params[:date])
    time = format_time(params[:time])
    dep = params[:dep]
    arr = params[:arr]
    journey_scraper = JourneyScraper.new(dep, arr, date, time)
    @cmd = journey_scraper.call("#{ENV['CASPER_PATH']} #{ENV['SCRAPER_PATH']}")
    @journeys = journey_scraper.parse(@cmd)
    @departure_station = get_station_name_from_code(dep)
    @arrival_station = get_station_name_from_code(arr)
  end
end
