class JourneyController < ApplicationController
  def index
    journey_scraper = JourneyScraper.new('BRI', 'BPW', '121213', '1000')
    @journey = journey_scraper.call
  end
end
