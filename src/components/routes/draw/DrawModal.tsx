import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import TierDraw from "@/components/routes/draw/TierDraw";

type DrawModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const DrawModal = ({ isOpen, onOpenChange, onClose }: DrawModalProps) => {
  const [drawState, setDrawState] = useState<number>(0);

  const handleUpdateDrawState = (newState: number) => {
    setDrawState(newState);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h1 className="mx-auto">Draw</h1>
        </ModalHeader>
        <ModalBody>
          <TierDraw drawState={drawState} updateDrawState={handleUpdateDrawState} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
            variant="solid"
            color="danger"
            className="text-white"
            onPress={() => handleUpdateDrawState(1)}
          >
            Draw
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DrawModal;
