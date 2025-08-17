import { createBrowserRouter } from "react-router";
import App from "@/App";
import { MainLayout } from "@/common/layouts/MainLayout";
import Home from "@/pages/Home";
import { Cart } from "@/pages/Cart";
import { Services } from "@/pages/Services";
import { Feedback } from "@/pages/Feedback";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "cart", element: <Cart /> },
          { path: "services", element: <Services /> },
          { path: "feedback", element: <Feedback /> },
        ],
      },
    ],
  },
    {
    path: "not-found",
    Component: NotFound
  },
  {
    path: "*",
    Component: NotFound
  }
]);
