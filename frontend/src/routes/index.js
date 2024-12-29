import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      // {
      //   path: "product-category",
      //   element: <CategoryProduct />,
      // },
      // {
      //   path: "product/:id",
      //   element: <ProductDetails />,
      // },
      // {
      //   path: "cart",
      //   element: <Cart />,
      // },
      // {
      //   path: "search",
      //   element: <SearchProduct />,
      // },
      // {
      //   path: "admin-panel",
      //   element: <AdminPanel />,
      //   children: [
      //     {
      //       path: "all-users",
      //       element: <AllUsers />,
      //     },
      //     {
      //       path: "all-products",
      //       element: <AllProducts />,
      //     },
      //   ],
      // },
    ],
  },
]);
export default router;
