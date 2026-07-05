import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SignupForm from "./SignupForm";

function AddNewUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>انشاء حساب جديد +</Button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <SignupForm />
      </Modal>
    </>
  );
}

export default AddNewUser;
