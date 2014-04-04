# A helper method to assign an appropriate rating to a certain journey based
# on the other alternatives available.
# Params:
# * length: The amount of
module JourneyHelper
  def journey_rating_class(length, index)
    best_journey = (length * 0.33).round
    good_journey = best_journey + (length * 0.33).round

    if index.between?(0, best_journey - 1)
      class_name = "journey--better #{best_journey} #{best_journey - 1}"
    elsif index.between?(best_journey - 1, good_journey - 1)
      class_name = "journey--good #{good_journey} #{good_journey - 1}"
    else
      class_name = 'journey--bad'
    end
    class_name
  end
end
