import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./components/Welcome.jsx";
import BookEditor from "./components/BookEditor.jsx";
import BookReader from "./components/BookReader.jsx";
import Layout from "./layouts/Layout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "ebook-generator",
        element: <BookEditor />,
      },
      {
        path: "ebook-reader",
        element: <BookReader />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
