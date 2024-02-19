import {
  StyledContainer,
  StyledElements,
  StyledLogo,
  StyledNavItem,
} from "./styles";
import { Stack, Typography } from "@mui/material";
import theme from "@/theme";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export const navItems = [
  { id: 1, label: "Products", iconSrc: HomeIcon, path: "/products" },
  { id: 1, label: "Category", iconSrc: HomeIcon, path: "/category" },
];

const SideNavBar = () => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledElements>
        <StyledLogo>
          <HomeIcon />
        </StyledLogo>
        {navItems.map((item) => (
          <Stack key={item.id} width={"100%"}>
            <Stack px={4}>
              <StyledNavItem onClick={() => navigate(item.path)}>
                <Stack direction="row" gap={theme.spacing(2)}>
                  <HomeIcon />
                  <Typography variant="body1">{item.label}</Typography>
                </Stack>
              </StyledNavItem>
            </Stack>
          </Stack>
        ))}
      </StyledElements>
    </StyledContainer>
  );
};
export default SideNavBar;
