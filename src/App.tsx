import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
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
import UsersPage from "./pages/UserPage";
import { ROLES, TOKEN, USER } from "./utils/constant";
import { User } from "./utils/types";
import toast from "react-hot-toast";
import OrderPage from "./pages/OrderPage";
import PinCodePage from "./pages/PincodePage";
import ZonesPage from "./pages/ZonesPage";
import ProductTypePage from "./pages/ProductTypePage";
import TimeSlotPage from "./pages/TimeSlotPage";
import StatusPage from "./pages/StatusPage";
import PromotionPage from "./pages/PromotionPage";

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
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "pin-codes",
        element: <PinCodePage />,
      },
      {
        path: "zones",
        element: <ZonesPage />,
      },
      {
        path: "time-slots",
        element: <TimeSlotPage />,
      },
      {
        path: "product-type",
        element: <ProductTypePage />,
      },
      {
        path: "status",
        element: <StatusPage />,
      },
      {
        path: "promotions",
        element: <PromotionPage />,
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

  const { data, error } = useQuery({
    queryKey: ["auth"],
    queryFn: ME,
    retry: false,
  });
  useEffect(() => {
    if (data) {
      if (
        data.user.role.some(
          (r) => r.name === ROLES.ADMIN || r.name === ROLES.SUPER_ADMIN,
        )
      ) {
        set({ isAuthenticated: true, user: data.user, token: data.token });
        localStorage.setItem(TOKEN, data.token);
        localStorage.setItem(USER, JSON.stringify(data.user as User));
      } else {
        toast.error("You are not authorized to access this page");
        set({ isAuthenticated: false, user: null, token: null });
        localStorage.clear();
      }
    }
  }, [data, set]);

  useEffect(() => {
    if (error) {
      set({ isAuthenticated: false, user: null, token: null });
      localStorage.clear();
    }
  }, [error, set]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
