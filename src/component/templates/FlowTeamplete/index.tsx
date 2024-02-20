import { Stack } from "@mui/material";
import { HeaderStack, SideBarStack } from "./styled";
import Header from "@/component/organisms/Header";
import SideNavBar from "@/component/organisms/SideNavbar";
import { useRecoilState } from "recoil";
import authAtom from "@/store/AuthState";

interface FlowTeamplateProps {
  children: React.ReactNode;
}

const FlowTemplate = ({ children }: FlowTeamplateProps) => {
  const [app, setApp] = useRecoilState(authAtom);
  const handleLogout = () => {
    setApp({ user: null, token: null, isAuthenticated: false });
    localStorage.clear();
  };
  return (
    <Stack alignItems="flex-start" direction="row">
      <SideBarStack>
        <SideNavBar />
      </SideBarStack>
      <Stack width="calc(100vw - 224px)">
        <HeaderStack>
          <Header
            username={app.user?.name ?? ""}
            email={app.user?.phoneNumber ?? ""}
            handleLogout={handleLogout}
          />
        </HeaderStack>
        <Stack>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default FlowTemplate;
