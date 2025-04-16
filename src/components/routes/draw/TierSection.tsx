import { ChangeEvent } from "react";
import { Skeleton } from "@heroui/react";
import { User } from "@/models";

type TierSectionProps = {
  tierName: string;
  winners: (User | undefined)[];
  updateWinnerNumberFn: React.Dispatch<React.SetStateAction<(User | undefined)[]>>;
};

const MAX_TIER_WINNERS = 20;

const TierSection = ({ tierName, winners, updateWinnerNumberFn }: TierSectionProps) => {
  const handleUpdateWinnerNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value)), MAX_TIER_WINNERS);
    updateWinnerNumberFn(Array.from({ length: value }, () => undefined));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 justify-center">
        <h2>{tierName}</h2>
        <input
          type="number"
          className="bg-background rounded-md w-10 text-center focus-visible:outline-none"
          value={winners.length.toString()}
          min={0}
          max={MAX_TIER_WINNERS}
          onChange={handleUpdateWinnerNumber}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {winners.map((winner, index) =>
          winner === undefined ? (
            <Skeleton key={`placeholder-${index}`} className="rounded-full w-8 h-8" />
          ) : (
            <div key={winner.displayName}>{winner.displayName}</div>
          )
        )}
      </div>
    </div>
  );
};

export default TierSection;
