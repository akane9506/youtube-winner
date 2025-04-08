import { useContext, useState } from "react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { DateRangePicker, Checkbox, Input, type RangeValue, Button } from "@heroui/react";
import { parseDate, type CalendarDate } from "@internationalized/date";
import { CONTENTS } from "@/consts";

const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

type CommentFiltersProps = {
  min: number;
  max: number;
  updateDateRange: (newDateRange: number[]) => void;
  excludeDuplicates: boolean;
  toggleExcludeDuplicates: (newValue: boolean) => void;
  updateKeywords: (newValue: string) => void;
};

const CommentFilters = ({
  min,
  max,
  updateDateRange,
  excludeDuplicates,
  toggleExcludeDuplicates,
  updateKeywords,
}: CommentFiltersProps) => {
  const { language } = useContext(PreferenceContext);
  const { videoInfo } = useContext(SearchResultContext);

  // this token controls the reset of the date range picker and input field
  const [resetToken, setResetToken] = useState<number>(0);

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

  const handleResetFilters = () => {
    updateDateRange([min, max]);
    updateKeywords("");
    toggleExcludeDuplicates(true);
    setResetToken((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-5 items-center px-6 pt-4">
      <div className="flex flex-col items-center gap-2 mb-3 max-w-xs">
        <h2 className="font-semibold text-start w-full">Video Info</h2>
        <img src={videoInfo?.imageUrl} alt="Video Thumbnail" className="rounded-lg" />
        <h1 className="text-xs">{videoInfo?.title}</h1>
      </div>
      <div className="flex flex-col gap-3 items-center w-full">
        <h2 className="font-semibold text-start w-full">Filters</h2>
        <DateRangePicker
          key={"date-range" + resetToken}
          aria-label="Date Range Picker"
          label={CONTENTS.filters[language][0]}
          labelPlacement="inside"
          variant="faded"
          minValue={parseDate(minDateString)}
          maxValue={parseDate(maxDateString)}
          defaultValue={{
            start: parseDate(minDateString),
            end: parseDate(maxDateString),
          }}
          onChange={handleDateRangeChange}
        />
        <Input
          key={"input" + resetToken}
          classNames={{
            label: "text-default-foreground/50 font-normal",
          }}
          label={CONTENTS.filters[language][1]}
          labelPlacement="inside"
          onValueChange={updateKeywords}
        />
        <Checkbox
          isSelected={excludeDuplicates}
          size="md"
          onValueChange={toggleExcludeDuplicates}
          color="secondary"
        >
          {CONTENTS.filters[language][2]}
        </Checkbox>
      </div>
      <Button
        key={resetToken}
        color="primary"
        variant="flat"
        onPress={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default CommentFilters;
