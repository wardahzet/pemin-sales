
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import AddSales from "./pages/Sales/AddSales";

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/sales/add" element={<AddSales />} />
  )
);


function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );

}

export default App;
