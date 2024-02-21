import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashBoardPage from "./pages/DashBoardPage";
import LoginPage from "./pages/Login";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "./store/AuthState";
import CategoryPage from "./pages/CategoryPage";
import { useQuery } from "@tanstack/react-query";
import { ME } from "./axios/api";
import { Suspense, lazy, useEffect } from "react";
import ShopsPage from "./pages/ShopsPage";
import ProductOptionPage from "./pages/ConfigPage";
import ProductTagPage from "./pages/ProductTagPages";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

const AuthenticateRoutes = () => {
  const { isAuthenticated } = useRecoilValue(authAtom);
  const location = useLocation();
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ previous: location.pathname }} />;
};
const UnAuthenticateRoutes = () => {
  const { isAuthenticated } = useRecoilValue(authAtom);
  const location = useLocation();

  const previousLocation = location.state?.pathname || "/dashboard";
  if (isAuthenticated) {
    return <Navigate to={previousLocation} />;
  }
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticateRoutes />,
    children: [
      {
        path: "dashboard",
        element: <DashBoardPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: "shops",
        element: <ShopsPage />,
      },
      {
        path: "product-options",
        element: <ProductOptionPage />,
      },
      {
        path: "product-tag",
        element: <ProductTagPage />,
      },
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
  {
    path: "/",
    element: <UnAuthenticateRoutes />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
      {
        path: "",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

const App = () => {
  const set = useSetRecoilState(authAtom);

  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: ME,
    retry: false,
  });
  useEffect(() => {
    if (data) {
      set({ isAuthenticated: true, user: data.user, token: data.token });
    }
  }, [data, set]);
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
