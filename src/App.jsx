import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/routers";
import "./App.css";
import { AuthProvider } from "./pages/context";

function App() {
  const routes = routers();
  return (
    <AuthProvider>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={routes} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
