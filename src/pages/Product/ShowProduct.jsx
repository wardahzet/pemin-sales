import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getProductData } from "../../services/Product";

export default function ShowProduct() {
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.title = "Product | MegaMinyak Energi";
    getProductData()
      .then((data) => {
        setProductData(data.data);
      })
      .catch((error) => {
        console.error("Error setting product data:", error);
      });
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex bg-[#E8EBF0]">
      <Sidebar />
      <div className="bg-[#E8EBF0] p-10 min-h-screen w-full">
        <div className="bg-[#6A93FF] p-5 items-center h-[86px] flex rounded-t-3xl">
          <h1 className="text-3xl font-semibold text-white">PRODUK</h1>
        </div>
        <div className="bg-white rounded-b-3xl border-2 border-[#6A93FF] mt-5 overflow-auto max-h-100">
          <table className="w-full">
            <thead>
              <tr className="text-gray-700 h-[75px]">
                <th className="border-r-2 border-b-2 border-[#6A93FF]">
                  ID Produk
                </th>
                <th className="border-x-2 border-b-2 border-[#6A93FF]">
                  Nama Produk
                </th>
                <th className="border-x-2 border-b-2 border-[#6A93FF]">Qty*</th>
                <th className="border-l-2 border-b-2 border-[#6A93FF]">
                  Harga Produk**
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {productData.map((product) => (
                <tr key={product.id} onClick={() => handleRowClick(product)} style={{ cursor: 'pointer' }}>
                  <td className="border-r-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.id}
                  </td>
                  <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.nama_produk}
                  </td>
                  <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.stok}
                  </td>
                  <td className="border-l-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.harga + "000"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-7">
          <p className="text-sm font-medium text-gray-800">* per Kilo Liter</p>
          <p className="text-sm font-medium text-gray-800 mt-2">** Rupiah</p>
        </div>
      </div>
    </div>
  );
}
