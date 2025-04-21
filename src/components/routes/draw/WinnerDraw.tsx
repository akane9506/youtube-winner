import { useState, useContext, useCallback, useEffect } from "react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { User } from "@/models";
import { CONTENTS, DRAW_DELAY as DELAY } from "@/consts";
import TierSection from "@/components/routes/draw/TierSection";

const INIT_NUM_WINNERS = 3;
let timeout: NodeJS.Timeout | undefined = undefined;

type WinnerDrawProps = {
  drawState: number;
  updateDrawState: (newState: number) => void;
};

const WinnerDraw = ({ drawState, updateDrawState }: WinnerDrawProps) => {
  const { users } = useContext(SearchResultContext);
  const { language } = useContext(PreferenceContext);
  const [winners, setWinners] = useState<(User | undefined)[]>(
    Array.from({ length: INIT_NUM_WINNERS }, () => undefined)
  );

  const draw = useCallback(() => {
    if (timeout) clearTimeout(timeout);

    const indicies = Array.from({ length: users.length }, (_, i) => i);
    const shuffledIndicies = indicies.sort(() => Math.random() - 0.5);

    timeout = setTimeout(() => {
      updateDrawState(0);
      setWinners(() => {
        return shuffledIndicies.slice(0, winners.length).map((index) => users[index]);
      });
    }, DELAY);
  }, [users, updateDrawState, winners.length]);

  useEffect(() => {
    if (drawState === 1) {
      updateDrawState(2);
      draw();
    }
  }, [drawState, draw, updateDrawState]);

  return (
    <TierSection
      tierName={CONTENTS.modal[language].winners}
      winners={winners}
      updateWinnerNumberFn={setWinners}
    />
  );
};

export default WinnerDraw;
