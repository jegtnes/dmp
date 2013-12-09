module JourneyHelper
  def journey_rating_class(length, index)
    best_journey_index = (length * 0.33).round
    good_journey_index = best_journey_index + (length * 0.33).round

      if index.between?(0, best_journey_index)
        class_name = "journey--better"
      elsif index.between?(best_journey_index, good_journey_index)
        class_name = "journey--good"
      else
        class_name = "journey--bad"
      end
  end
end
