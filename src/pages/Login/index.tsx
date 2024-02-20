import { Login } from "@/axios/api";
import Button from "@/component/atoms/Button";
import InputLabel from "@/component/molecules/InputLabel";
import AuthTemplate from "@/component/templates/AuthTemplate";
import authAtom from "@/store/AuthState";
import { TOKEN, USER } from "@/utils/constant";
import { LoginFormBody, User } from "@/utils/types";
import { Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const set = useSetRecoilState(authAtom);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormBody) => Login(data),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
      localStorage.setItem(USER, JSON.stringify(data.data.user));
      set({
        token: data.token as string,
        user: data.data.user as User,
        isAuthenticated: true,
      });
      Toast.success("Login Successful!");
      queryClient.invalidateQueries();
    },
    onError: () => {
      Toast.error("Invalid Credentials!");
    },
  });
  const [formState, setFormState] = useState<LoginFormBody>({
    phoneNumber: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <AuthTemplate>
      <Stack
        gap={4}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formState);
          setFormState({ phoneNumber: "", password: "" });
        }}
      >
        <Typography variant="h4" textAlign="center">
          Login Page
        </Typography>
        <InputLabel
          label="Phone No"
          name="phoneNumber"
          value={formState.phoneNumber}
          labelVariant="body2"
          onChange={handleFormChange}
        />
        <InputLabel
          label="Password"
          name="password"
          value={formState.password}
          labelVariant="body2"
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          disabled={formState.password === "" || formState.phoneNumber === ""}
        >
          Login
        </Button>
      </Stack>
    </AuthTemplate>
  );
};

export default LoginPage;
