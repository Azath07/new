// components/CreateForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("username is required"),
  phone: yup.string().required("phone is required"),
  website: yup.string().required("website is required"),
});

interface CreateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newItem: UserData) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ open, onClose, onSubmit }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const createItem = useMutation<void, Error, FormData>(
    (data) => {
      // Your API request to create a new item
      console.log("Creating item:", data);
      // Simulate API request success after 1 second
      return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the data to update the UI
        queryClient.invalidateQueries("items");
        onClose(); // Close the dialog after submission
        reset(); // Reset the form fields
      },
    }
  );

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    const temporaryId = Math.floor(Math.random() * 1000);
    // Mutate the data using your API request
    const newItem: UserData = {
      id: temporaryId,
      name: data.name,
      email: data.email,
      username: data.username,
      phone: data.phone,
      website: data.website,
    };

    // Mutate the data using the onSubmit callback
    createItem.mutate(data);

    // Pass the new item data (UserData) to the parent component
    onSubmit(newItem);

    // Additional logic as needed
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              disabled={createItem.isLoading}
            >
              {createItem.isLoading ? "Submitting..." : "Submit"}
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
