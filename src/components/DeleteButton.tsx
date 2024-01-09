// components/DeleteButton.tsx
import React from "react";
import { Button } from "@mui/material";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Delete</Button>;
};

export default DeleteButton;
