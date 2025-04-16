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
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h1 className="mx-auto">Draw</h1>
        </ModalHeader>
        <ModalBody>
          <TierDraw />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
          <Button variant="solid" color="danger" className="text-white" onPress={onClose}>
            Draw
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DrawModal;
