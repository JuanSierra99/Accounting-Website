import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import LandingPage from "./components/pages/LandingPage";
import Invoices from "./components/pages/Invoices";
import Bills from "./components/pages/Bills";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/Invoices",
      element: <Invoices />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/Bills",
      element: <Bills />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      // errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
