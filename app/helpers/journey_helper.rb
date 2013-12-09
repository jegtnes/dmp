module JourneyHelper
  def journey_rating_class(length, index)
    best_journey_index = (length * 0.33).round
    good_journey_index = best_journey_index + (length * 0.33).round

      if index.between?(0, best_journey_index-1)
        class_name = "journey--better #{best_journey_index} #{best_journey_index-1}"
      elsif index.between?(best_journey_index-1, good_journey_index-1)
        class_name = "journey--good #{good_journey_index} #{good_journey_index-1}"
      else
        class_name = "journey--bad"
      end
  end
end
