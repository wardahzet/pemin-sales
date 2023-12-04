import React, { useState, useEffect } from "react";

export default function DetailProduct() {
  const [namaProduk, setNamaProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    document.title = "Penjualan | MegaMinyak Energi";
  });

  const handleNamaProdukChange = (e) => {
    setNamaProduk(e.target.value);
  };

  const handleHargaProdukChange = (e) => {
    setHargaProduk(e.target.value);
  };

  const handleDeskripsiChange = (e) => {
    setDeskripsi(e.target.value);
  };

  const handleKembaliClick = () => {};

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
                <input
                  type="text"
                  value={namaProduk}
                  onChange={handleNamaProdukChange}
                  className="mt-2 text-[15px] w-[465px] h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Harga Produk :
                </label>
                <input
                  type="text"
                  value={hargaProduk}
                  onChange={handleHargaProdukChange}
                  className="mt-2 text-[15px] w-[465px] h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi :
              </label>
              <input
                type="text"
                value={deskripsi}
                onChange={handleDeskripsiChange}
                className="mt-2 text-[15px] w-[465px] h-[137px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={handleKembaliClick}
                className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
