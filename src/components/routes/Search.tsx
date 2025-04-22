import { useState, useContext } from "react";
import { Button, Chip, Input } from "@heroui/react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { CONTENTS } from "@/consts";

const Search = () => {
  const { language } = useContext(PreferenceContext);
  const { startSearch, isLoading } = useContext(SearchResultContext);

  const [videoId, setVideoId] = useState<string>("");

  return (
    <div className="flex flex-col px-20 items-center justify-center flex-1">
      <h2 className="text-xl font-semibold">{CONTENTS.search[language].title}</h2>
      <div className="mt-12 mb-4">
        <p className="mb-3">{CONTENTS.search[language].instruction}</p>
        {Array.from({ length: 2 }, (_, i) => (
          <div
            className="flex items-center my-2"
            key={CONTENTS.search[language].examples[i]}
          >
            <p className="w-6">{i + 1}. </p>
            <p className="mr-2">{CONTENTS.search[language].examples[i]}</p>
            <Chip color="secondary" variant="flat">
              {CONTENTS.search[language].exampleInputs[i]}
            </Chip>
          </div>
        ))}
      </div>
      <Input
        size="lg"
        label={CONTENTS.search[language].inputLabel}
        labelPlacement="outside"
        color="secondary"
        className="mb-5 max-w-[720px]"
        value={videoId}
        onValueChange={(value) => setVideoId(value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            startSearch(videoId);
          }
        }}
      />
      <Button
        color="secondary"
        variant="shadow"
        className="text-default-50"
        isLoading={isLoading}
        onPress={() => {
          startSearch(videoId);
        }}
        isDisabled={videoId.length < 11}
      >
        {isLoading
          ? CONTENTS.search[language].buttonLoading
          : CONTENTS.search[language].button}
      </Button>
    </div>
  );
};

export default Search;
