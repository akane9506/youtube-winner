import { useState } from "react";
import { User } from "@/models";
import TierSection from "./TierSection";

const INIT_NUM_WINNERS = 3;

const WinnerDraw = () => {
  const [winners, setWinners] = useState<(User | undefined)[]>(
    Array.from({ length: INIT_NUM_WINNERS }, () => undefined)
  );

  return (
    <TierSection tierName="Winners" winners={winners} updateWinnerNumberFn={setWinners} />
  );
};

export default WinnerDraw;
