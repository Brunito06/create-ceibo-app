import { createBrowserRouter, RouterProvider } from "react-router";

import { Layout } from "./components/layout";
import { AboutPage } from "./pages/about";
import { HomePage } from "./pages/home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
