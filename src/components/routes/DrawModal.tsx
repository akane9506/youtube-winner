import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

type DrawModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const DrawModal = ({ isOpen, onOpenChange, onClose }: DrawModalProps) => {
  console.log(isOpen);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Draw</ModalHeader>
        <ModalBody>
          <p>Draw content goes here...</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onPress={onClose}>
            Close
          </Button>
          <Button onPress={onClose}>Draw</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DrawModal;
