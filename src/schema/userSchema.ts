// src/schemas/userSchema.ts
import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  // Add other fields as needed
});

export default userSchema;
