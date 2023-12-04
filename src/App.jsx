import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AddSales from "./pages/Sales/AddSales";
import ShowProduct from "./pages/Product/ShowProduct";
import DetailProduct from "./pages/Product/DetailProduct";
import ShowSales from "./pages/Sales/ShowSales";
import AnalisisPage from "./pages/Dashboard/AnalisisPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/sales/add" element={<AddSales />} />,
      <Route path="/product" element={<ShowProduct />} />,
      <Route path="/product/details" element={<DetailProduct />} />
      <Route path="/sales" element={<ShowSales />} />

      {/* ini punya al */}
      <Route path="/dashboard" element={<AnalisisPage />} /> 
    </>
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