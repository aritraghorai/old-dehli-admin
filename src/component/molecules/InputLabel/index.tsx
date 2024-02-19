import { forwardRef, memo } from "react";
import { Box, Typography, styled } from "@mui/material";
import { TypographyVarient } from "@/utils/types";
import theme from "@/theme";
import TextField, { TextFieldProps } from "@/component/atoms/TextField";

const StyledContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
});

interface InputLabelProps extends TextFieldProps {
  label: string;
  labelColor?: string;
  labelVariant: TypographyVarient;
}

const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  ({ labelVariant, label, labelColor, ...textFieldProps }, ref) => {
    return (
      <StyledContainer>
        <Typography variant={labelVariant} color={labelColor}>
          {label}
        </Typography>
        <TextField {...textFieldProps} ref={ref} />
      </StyledContainer>
    );
  },
);

InputLabel.displayName = "InputLabel";

export default memo(InputLabel);
