import React, { useState } from "react";
import { Toast } from "react-bootstrap";

interface IToastProps {
  message: string;
  variant: "success" | "error" | "info";
}

const ToastNotification: React.FC<IToastProps> = ({ message, variant }) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      bg={variant}
      className="my-toast"
      delay={2000}
      autohide
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
