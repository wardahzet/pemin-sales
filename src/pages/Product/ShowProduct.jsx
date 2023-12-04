import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ShowProduct() {
  const dummyProductData = [
    { id: 1, nama: "Produk A", qty: 10, harga: 1000 },
    { id: 2, nama: "Produk B", qty: 5, harga: 1500 },
    { id: 1, nama: "Produk A", qty: 10, harga: 1000 },
    { id: 2, nama: "Produk B", qty: 5, harga: 1500 },
    { id: 1, nama: "Produk A", qty: 10, harga: 1000 },
  ];

  const [productData, setProductData] = useState(dummyProductData);

  useEffect(() => {
    document.title = "Product | MegaMinyak Energi";
  }, []);

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
                <tr key={product.id}>
                  <td className="border-r-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.id}
                  </td>
                  <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.nama}
                  </td>
                  <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.qty}
                  </td>
                  <td className="border-l-2 h-[50px] border-t-2 border-[#6A93FF]">
                    {product.harga}
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
