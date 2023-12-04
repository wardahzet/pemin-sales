import React, { useState, useEffect } from "react";

export default function AddSales() {
  const [tanggal, setTanggal] = useState("");
  const [produk, setProduk] = useState("");
  const [jumlahProduk, setJumlahProduk] = useState("");
  const [distributor, setDistributor] = useState("");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    document.title = "Input Sales | MegaMinyak Energi";
  }, []);

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
  };

  const handleProdukChange = (e) => {
    setProduk(e.target.value);
  };

  const handleJumlahProdukChange = (e) => {
    setJumlahProduk(e.target.value);
  };

  const handleDistributorChange = (e) => {
    setDistributor(e.target.value);
  };

  const handleTambahClick = () => {
    setSalesData([
      ...salesData,
      {
        id: salesData.length + 1,
        produk: produk,
        jumlahProduk: jumlahProduk,
        distributor: distributor,
      },
    ]);
    setTanggal("");
    setProduk("");
    setJumlahProduk("");
    setDistributor("");
  };

  const handleKembaliClick = () => {};

  const handleHapusClick = (id) => {
    const updatedSalesData = salesData.filter((data) => data.id !== id);
    setSalesData(updatedSalesData);
  };

  const handleResetClick = () => {
    setSalesData([]);
  };

  const handleSimpanClick = () => {};

  return (
    <div className="bg-[#E8EBF0] p-10 min-h-screen w-full">
      <div className="bg-[#6A93FF] p-5 items-center h-[86px] flex rounded-t-3xl">
        <h1 className="text-3xl font-semibold text-white">FORM PENJUALAN</h1>
      </div>
      <div className="bg-white px-5 py-7 rounded-b-3xl mt-5">
        <div className="grid grid-cols-2 gap-20">
          <div className="flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal:
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={handleTanggalChange}
                className="mt-2 text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Cari ID / Nama Produk:
              </label>
              <select
                value={produk}
                onChange={handleProdukChange}
                className="mt-2 text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              >
                <option>--Pilih--</option>
                <option value="produk1">00918274 - Produk 1</option>
                <option value="produk2">00918275 - Produk 2</option>
              </select>
            </div>
          </div>
          <div className="flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jumlah Produk:
              </label>
              <input
                type="number"
                value={jumlahProduk}
                onChange={handleJumlahProdukChange}
                className="mt-2 text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Distributor:
              </label>
              <select
                value={distributor}
                onChange={handleDistributorChange}
                className="mt-2 text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              >
                <option>--Pilih--</option>
                <option value="distributor1">Distributor 1</option>
                <option value="distributor2">Distributor 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleTambahClick}
            className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
          >
            Tambah
          </button>
        </div>

        <div className="mt-10">
          <table className="w-full border-collapse border-2 border-[#6A93FF]">
            <thead>
              <tr className="text-gray-700">
                <th className="border-2 border-[#6A93FF]">ID Produk</th>
                <th className="border-2 border-[#6A93FF]">Nama Produk</th>
                <th className="border-2 border-[#6A93FF]">Jumlah Produk</th>
                <th className="border-2 border-[#6A93FF]">Nama Distributor</th>
                <th className="border-2 border-[#6A93FF]">Action</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data) => (
                <tr key={data.id}>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.id}
                  </td>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.produk}
                  </td>
                  <td className="border-2 text-center  border-[#6A93FF]">
                    {data.jumlahProduk}
                  </td>
                  <td className="border-2 text-center  border-[#6A93FF]">
                    {data.distributor}
                  </td>
                  <td className="border-2 text-center  border-[#6A93FF] p-2">
                    <button
                      onClick={() => handleHapusClick(data.id)}
                      className="
                    bg-red-500 text-white px-2 py-1 text-[12px] rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end mt-8">
          <label className="text-sm text-center font-medium text-gray-700">
            Total Harga :
          </label>
          <input
            type="number"
            className="mt-2 ml-3 text-[15px] w-1/6 h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleKembaliClick}
            className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
          >
            Kembali
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleResetClick}
              className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
            >
              Hapus
            </button>
            <button
              onClick={handleSimpanClick}
              className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
