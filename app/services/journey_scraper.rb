# A helper class to run the Casper.js journey scraper.
class JourneyScraper
  def initialize(departure, arrival, date, time)
    @dep = departure
    @arr = arrival
    @date = date
    @time = time
  end

  # Runs the command, hopefully getting results
  def call(command)
    `#{command} #{@dep} #{@arr} #{@date} #{@time} 2>&1 | grep -v "CoreText performance note"`
  end

  # Checks for errors and parses the data into the format we'd like it in
  def parse(data)
    data = JSON.parse data
    if !data.first['error']
      data.sort { |a, b| a['rtg'] <=> b['rtg'] }
    else
      nil
    end
  end
end
