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
  { id: 2, label: "Category", iconSrc: HomeIcon, path: "/category" },
  { id: 3, label: "Shops", iconSrc: HomeIcon, path: "/shops" },
  {
    id: 4,
    label: "Product Options",
    iconSrc: HomeIcon,
    path: "/product-options",
  },
  { id: 5, label: "Product Tag", iconSrc: HomeIcon, path: "/product-tag" },
  { id: 6, label: "Users", iconSrc: HomeIcon, path: "/users" },
  { id: 7, label: "Orders", iconSrc: HomeIcon, path: "/orders" },
  { id: 8, label: "Pin Codes", iconSrc: HomeIcon, path: "/pin-codes" },
  { id: 9, label: "Zones", iconSrc: HomeIcon, path: "/zones" },
  { id: 10, label: "Product Type", iconSrc: HomeIcon, path: "/product-type" },
  { id: 11, label: "Time Slots", iconSrc: HomeIcon, path: "/time-slots" },
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
