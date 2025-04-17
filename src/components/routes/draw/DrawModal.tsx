import { useState, useCallback, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import TierDraw from "@/components/routes/draw/TierDraw";
import { CONTENTS } from "@/consts";
import { PreferenceContext } from "@/contexts/PreferenceContext";

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
        <ModalHeader></ModalHeader>
        <ModalBody>
          <TierDraw drawState={drawState} updateDrawState={handleUpdateDrawState} />
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
