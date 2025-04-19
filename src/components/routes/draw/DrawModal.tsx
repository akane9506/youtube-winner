import { useState, useCallback, useContext } from "react";
import {
  Modal,
  ModalContent,
  // ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";
import TierDraw from "@/components/routes/draw/TierDraw";
import { CONTENTS } from "@/consts";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import WinnerDraw from "./WinnerDraw";

type DrawModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const DrawModal = ({ isOpen, onOpenChange, onClose }: DrawModalProps) => {
  const { language } = useContext(PreferenceContext);
  const [drawState, setDrawState] = useState<number>(0);

  const handleUpdateDrawState = useCallback(
    (newState: number) => {
      setDrawState(newState);
    },
    [setDrawState]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody className="flex flex-col gap-4 items-center mt-4">
          <Tabs variant="solid" radius="full">
            <Tab key="drawmodal-tier" title={CONTENTS.modal[language].tabs[0]}>
              <TierDraw drawState={drawState} updateDrawState={handleUpdateDrawState} />
            </Tab>
            <Tab key="drawmodal-winners" title={CONTENTS.modal[language].tabs[1]}>
              <WinnerDraw />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {CONTENTS.modal[language].actions[0]}
          </Button>
          <Button
            variant="solid"
            color="danger"
            className="text-white"
            onPress={() => handleUpdateDrawState(1)}
          >
            {CONTENTS.modal[language].actions[1]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DrawModal;
