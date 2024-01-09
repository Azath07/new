// components/ViewForm.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";

interface ViewFormProps {
  data?: UserData;
  onClose: () => void;
}

const ViewForm: React.FC<ViewFormProps> = ({ data, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to another page if data is not available
    if (!data) {
      navigate("/"); // Replace "/" with the desired path
    }
  }, [data, navigate]);

  const handleClose = () => {
    onClose();
    navigate("/"); // Navigate back one step in the history
  };

  // Render the ViewForm content
  return (
    <div>
      <h2>View Details</h2>
      {data ? (
        <>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default ViewForm;
