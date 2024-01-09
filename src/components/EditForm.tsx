// components/EditForm.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Divider } from "@mui/material";
import { UserData } from "../App"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom";

interface EditFormProps {
  data: UserData;
  onSubmit: (updatedItem: UserData) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ data, onSubmit, onClose }) => {
  const [editedData, setEditedData] = useState<UserData>({ ...data });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(editedData);
    onClose();
    navigate("/");
    // You can navigate here if needed
  };
  const handleClose = () => {
    onClose();
    navigate("/"); // Navigate back one step in the history
  };

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h6">Edit Form</Typography>
      <Divider />
      <form>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
          />
        </div>
      </form>
      {/* Bottom buttons */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleClose}
          color="secondary"
          style={{ marginRight: "8px" }}
        >
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
