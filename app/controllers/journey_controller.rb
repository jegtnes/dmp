class JourneyController < ApplicationController
  def index
    date = params[:date][:day] + params[:date][:month] + params[:date][:year]
    time = params[:time][:hour] + params[:time][:minute]
    journey_scraper = JourneyScraper.new(params[:dep], params[:arr], date, time)
    @journeys = JSON.parse journey_scraper.call
  end
end
