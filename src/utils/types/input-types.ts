import { UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
  label?: string;
  type: string;
  id: string;
  autoComplete?: string;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
};
