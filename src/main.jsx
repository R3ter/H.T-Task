import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeScript } from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import theme from "./theme";
import "./index.css";
import EditMap from "./pages/EditMap/EditMap";
import ClientPage from "./pages/ClientPage/ClientPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "client",
    element: <ClientPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </>
);
