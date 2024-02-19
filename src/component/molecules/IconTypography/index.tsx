import { memo } from "react";
import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { TypographyVarient } from "@/utils/types";
import Icon from "@/component/atoms/Icon";

const SyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

interface IconTypographyProps {
  labelColor?: TypographyProps["color"];
  label: string;
  variant: TypographyVarient;
  iconSrc: string;
  gap?: BoxProps["gap"];
}

const IconTypography = memo(
  ({ label, labelColor, variant, iconSrc, gap }: IconTypographyProps) => {
    return (
      <SyledContainer gap={gap}>
        <Icon src={iconSrc} alt={label} />
        <Typography color={labelColor} variant={variant}>
          {label}
        </Typography>
      </SyledContainer>
    );
  },
);
IconTypography.displayName = "IconTypography";
export default IconTypography;
