import { useState, useContext, useEffect, useCallback } from "react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { User } from "@/models";
import TierSection from "@/components/routes/draw/TierSection";

const DELAY = 1000;

type TierDrawProps = {
  drawState: number;
  updateDrawState: (newState: number) => void;
};

const timeouts: (NodeJS.Timeout | undefined)[] = [undefined, undefined, undefined];

const TierDraw = ({ drawState, updateDrawState }: TierDrawProps) => {
  const { users } = useContext(SearchResultContext);

  const [goldWinners, setGoldWinners] = useState<(User | undefined)[]>([undefined]);
  const [silverWinners, setSilverWinners] = useState<(User | undefined)[]>([undefined]);
  const [bronzeWinners, setBronzeWinners] = useState<(User | undefined)[]>([undefined]);

  // sample the winners
  const sampling = useCallback(() => {
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });

    const indices = Array.from({ length: users.length }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    const setters = [setGoldWinners, setSilverWinners, setBronzeWinners];
    const starts = [0, goldWinners.length, goldWinners.length + silverWinners.length];
    const ends = [starts[1], starts[2], starts[2] + bronzeWinners.length];
    setters.forEach((stateSetter, i) => {
      timeouts[i] = setTimeout(
        () => {
          if (i === 2) updateDrawState(3);
          stateSetter(() => {
            return shuffledIndices.slice(starts[i], ends[i]).map((index) => users[index]);
          });
        },
        (i + 1) * DELAY
      );
    });
  }, [users, goldWinners, silverWinners, bronzeWinners, updateDrawState]);

  // start sampling when the draw state is 1
  useEffect(() => {
    if (drawState === 1) {
      updateDrawState(2);
      sampling();
    }
  }, [drawState, sampling, updateDrawState]);

  // update the total number of draws whenever the winners changes
  return (
    <div className="flex flex-col gap-4">
      <TierSection
        tierName="Gold"
        winners={goldWinners}
        updateWinnerNumberFn={setGoldWinners}
      />
      <TierSection
        tierName="Silver"
        winners={silverWinners}
        updateWinnerNumberFn={setSilverWinners}
      />
      <TierSection
        tierName="Bronze"
        winners={bronzeWinners}
        updateWinnerNumberFn={setBronzeWinners}
      />
    </div>
  );
};

export default TierDraw;
