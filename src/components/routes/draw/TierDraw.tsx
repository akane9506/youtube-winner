import { useState } from "react";
import { User } from "@/models";
import TierSection from "./TierSection";

const TierDraw = () => {
  const [goldWinners, setGoldWinners] = useState<(User | undefined)[]>([undefined]);
  const [silverWinners, setSilverWinners] = useState<(User | undefined)[]>([undefined]);
  const [bronzeWinners, setBronzeWinners] = useState<(User | undefined)[]>([undefined]);
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
