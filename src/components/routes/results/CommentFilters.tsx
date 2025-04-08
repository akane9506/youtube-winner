import { useContext } from "react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { DateRangePicker, type RangeValue } from "@heroui/react";
import { parseDate, type CalendarDate } from "@internationalized/date";
import { CONTENTS } from "@/consts";

const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

type CommentFiltersProps = {
  min: number;
  max: number;
  updateDateRange: (newDateRange: number[]) => void;
};

const CommentFilters = ({ min, max, updateDateRange }: CommentFiltersProps) => {
  const { language } = useContext(PreferenceContext);

  const minDate = new Date(min);
  const maxDate = new Date(max);

  const minDateString = getDateString(minDate);
  const maxDateString = getDateString(maxDate);

  // update the date range state
  const handleDateRangeChange = (value: RangeValue<CalendarDate> | null) => {
    if (!value) {
      console.log("No date range selected");
      return;
    }
    const startDate = value.start;
    const endDate = value.end;
    const startTime = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day
    ).getTime();
    // should add 23:59 to the end date to include the whole day
    const endTime = new Date(
      endDate.year,
      endDate.month - 1,
      endDate.day,
      23,
      59
    ).getTime();
    updateDateRange([startTime, endTime]);
  };

  return (
    <div className="flex flex-col items-center">
      <DateRangePicker
        aria-label="Date Range Picker"
        label={CONTENTS.filters[language][0]}
        className="max-w-xs"
        labelPlacement="inside"
        minValue={parseDate(minDateString)}
        maxValue={parseDate(maxDateString)}
        defaultValue={{ start: parseDate(minDateString), end: parseDate(maxDateString) }}
        onChange={handleDateRangeChange}
      />
    </div>
  );
};

export default CommentFilters;
