import React, { useState, useEffect } from "react";
import { getProductDetail } from "../../services/Product";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function DetailProduct() {
  const [produk, setProduk] = useState([]);
  let { id } = useParams();
  
  useEffect(() => {
    document.title = "Produk | MegaMinyak Energi";
    getProductDetail(id)
      .then((data) => {
        setProduk(data.data);
      })
      .catch((err) => {
        console.error("Error setting product data:", err);
      });
  }, [id]);
  return (
    <>
      <div className="bg-[#E8EBF0] p-10 h-screen w-full">
        <div className="bg-[#6A93FF] p-5 items-center h-[86px] flex rounded-t-3xl">
          <h1 className="text-3xl font-semibold text-white">DETAIL PRODUK</h1>
        </div>
        <div className="bg-white px-5 py-7 rounded-b-3xl mt-5">
          <div className="grid grid-cols-2">
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Produk :
                </label>
                <div className="mt-2 text-[15px] w-[465px] h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md">
                  {produk.nama_produk}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Harga Produk :
                </label>
                <div className="mt-2 text-[15px] w-[465px] h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md">
                  {produk.harga}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi :
              </label>
              <div className="mt-2 text-[15px] w-[465px] h-[137px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md">
                {produk.keterangan}
              </div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <Link to={`/product`}>
                <button
                  className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
                >
                  Kembali
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
