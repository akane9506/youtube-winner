import { useState, useContext } from "react";
// import { Input } from "@heroui/input";
import { Button, Checkbox, Chip, Input } from "@heroui/react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { CONTENTS } from "@/consts";

const Search = () => {
  const { language } = useContext(PreferenceContext);
  const { startSearch, isLoading } = useContext(SearchResultContext);

  const [videoId, setVideoId] = useState<string>("");
  const [searchScope, setSearchScope] = useState<boolean[]>([true, false]);

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
      />
      <div className="flex gap-4 mb-10">
        <Checkbox
          isSelected={searchScope[0]}
          color="secondary"
          onValueChange={(isSelected) => {
            setSearchScope((prev) => [isSelected, prev[1]]);
          }}
        >
          <p className="text-secondary">{CONTENTS.search[language].options[0]}</p>
        </Checkbox>
        <Checkbox
          isSelected={searchScope[1]}
          color="secondary"
          onValueChange={(isSelected) => {
            setSearchScope((prev) => [prev[0], isSelected]);
          }}
        >
          <p className="text-secondary">{CONTENTS.search[language].options[1]}</p>
        </Checkbox>
      </div>
      <Button
        color="secondary"
        variant="shadow"
        className="text-default-50"
        isLoading={isLoading}
        onPress={() => {
          startSearch(videoId);
        }}
        isDisabled={searchScope[0] === false && searchScope[1] === false}
      >
        {isLoading
          ? CONTENTS.search[language].buttonLoading
          : CONTENTS.search[language].button}
      </Button>
    </div>
  );
};

export default Search;
