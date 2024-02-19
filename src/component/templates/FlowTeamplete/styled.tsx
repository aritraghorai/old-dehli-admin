import { Stack, styled } from "@mui/material";

export const SideBarStack = styled(Stack)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.stroke.STROKE_100}`,
  width: "fit-content",
  height: "100vh",
  position: "sticky",
  top: 0,
}));

export const HeaderStack = styled(Stack)(() => ({
  position: "sticky",
  top: 0,
  zIndex: 100,
}));
