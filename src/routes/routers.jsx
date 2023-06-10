import AuthContainer from "../containers/auth";
import MainContainer from "../containers/main";
import { IsLoggedIn, Redirect, routesWithGuard } from "../utilities/auth_utils";
import { lazy } from "react";

const Login = lazy(async () => await import("../pages/login"));
const Dashboard = lazy(async () => await import("../pages/layout/dashboard"));
const Todo = lazy(async () => await import("../pages/layout/todoForm"));

const newRoutes = () =>
  routesWithGuard([
    {
      path: "",
      component: () => <AuthContainer />,
      canActivate: [Redirect],
      routes: [
        {
          path: "/",
          component: () => <Login />,
        },
      ],
    },
    {
      path: "",
      component: () => <MainContainer />,
      canActivate: [IsLoggedIn],
      routes: [
        {
          path: "/dashboard",
          component: () => <Dashboard />,
        },
        {
          path: "/todo",
          component: () => <Todo />,
        },
        {
          path: "/todo/:id",
          component: () => <Todo />,
        },
      ],
    },
  ]);

export default newRoutes;
