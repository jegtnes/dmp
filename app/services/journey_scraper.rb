# A helper class to run the Casper.js journey scraper.
class JourneyScraper
  def initialize(departure, arrival, date, time)
    @dep = departure
    @arr = arrival
    @date = date
    @time = time
  end

  def call(command)
    `#{command} #{@dep} #{@arr} #{@date} #{@time} 2>&1 | grep -v "CoreText performance note"`
  end

  def parse(data)
    JSON.parse(data).sort { |a, b| a['rtg'] <=> b['rtg'] }
  end
end
