class SearchController < ApplicationController
  def index
    @currentTimePadded = Time.now.hour.to_s.rjust(2, '0') + Time.now.min.to_s.rjust(2, '0')
  end
end
