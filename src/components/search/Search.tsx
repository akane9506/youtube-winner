import { useCallback, useState } from "react";
import { Input } from "@heroui/input";
import { Button, Chip } from "@heroui/react";
import { useContext } from "react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { CONTENTS } from "@/consts";
import { getComments } from "@/api/comments";

const Search = () => {
  const { language } = useContext(PreferenceContext);
  const [videoId, setVideoId] = useState<string>("");
  // TODO: button searching state

  const fetchComments = useCallback(async (requestId: string) => {
    try {
      const data = await getComments(requestId);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }, []);

  const handleConfirmSearch = () => {
    // TODO: convert following alerts into warning messages on the input field
    if (videoId.length < 11) {
      alert("Please enter a valid video id");
      return;
    }

    let requestId = undefined;

    // TODO: implement local search limit

    if (videoId.startsWith("https://")) {
      const params = new URL(videoId).searchParams;
      requestId = params.get("v");
      if (!requestId) {
        alert("Please enter a valid video id"); // this should notify user to check if &v= in the url
        return;
      }
    } else {
      requestId = videoId;
    }

    fetchComments(requestId);
  };

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
        className="mb-10 max-w-[720px]"
        value={videoId}
        onValueChange={(value) => setVideoId(value)}
      />
      <Button
        color="secondary"
        variant="shadow"
        className="text-default-50"
        onPress={handleConfirmSearch}
      >
        {CONTENTS.search[language].button}
      </Button>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Search;
