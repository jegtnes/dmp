class JourneyController < ApplicationController
  def index
    date = format_date(params[:date])
    time = format_time(params[:time])
    journey_scraper = JourneyScraper.new(params[:dep], params[:arr], date, time)
    @journeys = JSON.parse journey_scraper.call
  end
end
