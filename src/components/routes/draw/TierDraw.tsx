import { useState, useContext, useEffect, useCallback } from "react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { User } from "@/models";
import TierSection from "@/components/routes/draw/TierSection";

type TierDrawProps = {
  drawState: number;
  updateDrawState: (newState: number) => void;
};

const TierDraw = ({ drawState, updateDrawState }: TierDrawProps) => {
  const { users } = useContext(SearchResultContext);

  const [goldWinners, setGoldWinners] = useState<(User | undefined)[]>([undefined]);
  const [silverWinners, setSilverWinners] = useState<(User | undefined)[]>([undefined]);
  const [bronzeWinners, setBronzeWinners] = useState<(User | undefined)[]>([undefined]);

  const sampling = useCallback(() => {
    const indices = Array.from({ length: users.length }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);
    console.log(shuffledIndices);
  }, [users]);

  useEffect(() => {
    if (drawState === 1) {
      sampling();
      updateDrawState(0);
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
