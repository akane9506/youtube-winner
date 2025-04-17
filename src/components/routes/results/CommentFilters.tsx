import { useContext, useState } from "react";
import { RotateCcw } from "lucide-react";
import { parseDate, type CalendarDate } from "@internationalized/date";
import DrawModal from "@/components/routes/draw/DrawModal";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { DateRangePicker, Checkbox, Input, type RangeValue, Button } from "@heroui/react";
import { CONTENTS } from "@/consts";
import { createPortal } from "react-dom";
import { useDisclosure } from "@heroui/react";

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

  // Modal controllers
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
      <div className="flex flex-col items-center gap-2 mb-3">
        <h2 className="font-semibold text-start w-full">
          {CONTENTS.sidebar[language][0]}
        </h2>
        <img
          src={videoInfo?.imageUrl}
          alt="Video Thumbnail"
          className="rounded-lg w-full"
        />
        <h1 className="text-sm font-medium">{videoInfo?.title}</h1>
      </div>
      <div className="flex flex-col gap-3 items-center w-full">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-semibold text-start w-full">
            {CONTENTS.sidebar[language][1]}
          </h2>
          <Button
            key={resetToken}
            color="primary"
            variant="light"
            className="h-5 min-w-4 px-2"
            onPress={handleResetFilters}
          >
            <RotateCcw className="h-4 text-secondary" />
          </Button>
        </div>
        {/* TODO: Change the iner wrapper style for adaptive purposes */}
        <DateRangePicker
          classNames={{ innerWrapper: "", inputWrapper: "justify-start" }}
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
          size="sm"
          onValueChange={toggleExcludeDuplicates}
          color="secondary"
        >
          {CONTENTS.filters[language][2]}
        </Checkbox>
      </div>
      <div className="w-full mt-10">
        <Button
          variant="shadow"
          color="danger"
          className="w-full h-12 text-white text-medium font-semibold tracking-wide"
          onPress={onOpen}
        >
          {CONTENTS.filters[language][3]}
        </Button>
      </div>
      {isOpen &&
        createPortal(
          <DrawModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />,
          document.getElementById("root") as HTMLElement
        )}
    </div>
  );
};

export default CommentFilters;
