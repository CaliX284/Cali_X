import { useState } from "react";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import PayRemainingForm from "./PayRemainingForm";
import { MdOutlinePayment } from "react-icons/md";

function HasRemaining({ member }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} design="delete" size="small">
        <MdOutlinePayment />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PayRemainingForm member={member} />
      </Modal>
    </>
  );
}

export default HasRemaining;
