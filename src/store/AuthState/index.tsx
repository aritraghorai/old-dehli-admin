import { AuthState } from "@/utils/types";
import { atom } from "recoil";

const authAtom = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
});

export default authAtom;
