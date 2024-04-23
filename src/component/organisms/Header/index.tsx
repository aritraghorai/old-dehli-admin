import { Stack, styled } from "@mui/material";
import theme from "@/theme";
import Logout from "@/component/molecules/Logout";

interface HeaderProps {
  username: string;
  email: string;
  handleLogout: () => void;
}

const Container = styled(Stack)({
  padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
  alignItems: "center",
  justifyContent: "flex-end",
  borderBottom: `1px solid ${theme.palette.stroke.STROKE_100}`,
  gap: theme.spacing(2),
  background: theme.palette.structural.STRUCTURAL_WHITE,
});

const Header = ({ username, email, handleLogout }: HeaderProps) => {
  return (
    <Container direction="row">
      {/* <Icon src={} alt="BellIcon" /> */}
      <Logout username={username} email={email} handleLogout={handleLogout} />
    </Container>
  );
};

export default Header;
