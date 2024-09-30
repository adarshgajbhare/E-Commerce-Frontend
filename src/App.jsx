import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import React from "react";
import Home from "./component/Home";
import Admin from "./component/Admin";
import "../src/index.css"
import ProductItem from "./component/ProductItem"

const App = () => {
  console.log("ffhjk fdhjkfsdhjk dfhj dfhjkdfhjadfhjkl")
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/product/:id",
      element: <ProductItem />,
    },
  ]);

  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
