import {
  InputProps,
  TextField as MuiTextField,
  TextFieldVariants,
} from "@mui/material";
import React from "react";

export interface TextFieldProps {
  id?: string;
  variant?: TextFieldVariants;
  required?: boolean;
  customInputProps?: InputProps;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  type?: string;
  starticon?: React.JSX.Element;
  endicon?: React.JSX.Element;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const TextField = (props: TextFieldProps) => {
  return (
    <MuiTextField
      id={props.id}
      variant={props.variant}
      error={props.error}
      helperText={props.helperText}
      InputProps={{
        startAdornment: props.starticon,
        endAdornment: props.endicon,
        ...props.customInputProps,
      }}
      type={props.type}
      data-testid="TextField"
      {...props}
    />
  );
};
export default TextField;
