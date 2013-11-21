class JourneyController < ApplicationController
  def index
    date = params[:date]
    time = params[:time]
    journey_scraper = JourneyScraper.new(params[:dep], params[:arr], date, time)
    @journeys = JSON.parse journey_scraper.call
  end
end
