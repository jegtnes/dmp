class JourneyScraper
  def initialize(departure, arrival, date, time)
    @dep = departure
    @arr = arrival
    @date = date
    @time = time
  end

  def call
    `/usr/local/bin/casperjs ../dmp-scraper/casper.js #{@dep} #{@arr} #{@date} #{@time} 2>&1 | grep -v "CoreText performance note"`
  end
end
