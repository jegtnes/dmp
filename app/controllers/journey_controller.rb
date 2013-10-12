class JourneyController < ApplicationController
  require 'nokogiri'
  require 'open-uri'

  def index

    url = "http://ojp.nationalrail.co.uk/service/timesandfares/"
    url << params[:dep] + '/'
    url << params[:arr] + '/'
    url << params[:date]["day"] << params[:date]["month"] << params[:date][:year] + '/'
    url << params[:time]["hour"] << params[:time]["minute"]
    url << '/dep'

    doc = Nokogiri::HTML(open(url))
    @journeys = doc.css('.mtx').map do |i|
      { 'dep' => i.at_css('.dep').text,
        'arr' => i.at_css('.arr').text,
        'dur' => i.at_css('.dur').text,
        'chg' => i.at_css('.chg').text,
        'fare' => i.at_css('.opsingle').text,
         }
      end
  end
end
