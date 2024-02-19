import { Stack } from "@mui/material";
import { HeaderStack, SideBarStack } from "./styled";
import Header from "@/component/organisms/Header";
import SideNavBar from "@/component/organisms/SideNavbar";

interface FlowTeamplateProps {
  children: React.ReactNode;
}

const FlowTemplate = ({ children }: FlowTeamplateProps) => {
  return (
    <Stack alignItems="flex-start" direction="row">
      <SideBarStack>
        <SideNavBar />
      </SideBarStack>
      <Stack width="calc(100vw - 224px)">
        <HeaderStack>
          <Header username={""} email={""} />
        </HeaderStack>
        <Stack>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default FlowTemplate;
