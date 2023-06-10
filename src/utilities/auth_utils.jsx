import { redirect, createBrowserRouter } from "react-router-dom";

export const IsLoggedIn = () => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn")) ?? false;
  if (!isLoggedIn) {
    return redirect("/");
  }
  return false;
};

export const Redirect = () => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn")) ?? false;
  if (isLoggedIn) {
    return redirect("/dashboard");
  }
  return true;
};

export function routesWithGuard(routeConfig) {
  function renderRoutes(route) {
    return {
      path: route.path,
      element: <route.component />,
      action: route.action,
      children: route.routes ? route.routes.map(renderRoutes) : undefined,
      loader: async (args) => {
        if (!route.canActivate) {
          return route?.loader ? await route.loader(args) : null;
        }
        const shouldRedirect = await Promise.all(
          route.canActivate.map((cb) => cb(redirect))
        );
        if (shouldRedirect.find((r) => r instanceof Response)) {
          return shouldRedirect.find((r) => r instanceof Response);
        } else {
          return route.loader ? await route.loader(args) : null;
        }
      },
    };
  }

  const router = createBrowserRouter(routeConfig.map(renderRoutes));
  return router;
}
