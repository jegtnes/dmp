module JourneyHelper
  def rate_journeys(journeys)
    best_journeys = (journeys.length / 3.33333333333).to_i
    good_journeys = best_journeys + (journeys.length / 3.33333333333).to_i
    bad_journeys = journeys.length - good_journeys - best_journeys
    html = ""

    journeys.each_with_index do |journey, index|
      if index.between?(0, best_journeys)
        html << "<tr class='journey--better'>"

      elsif index.between?(best_journeys, good_journeys)
        html << "<tr class='journey--good'>"

      else
        html << "<tr class='journey--bad'>"
      end

      html << "
        <td class='rating'>#{journey['rtg']}</td>
        <td class='dep'>#{journey['dep']}</td>
        <td class='arr'>#{journey['arr']}</td>
        <td class='dur'>#{journey['dur']}</td>
        <td class='chg'>#{journey['chg']}</td>
        <td class='fare'>#{journey['fare']}</td>
      </tr>"
    end

    html.html_safe
  end
end
