import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AddSales() {
  const [tanggal, setTanggal] = useState("");
  const [produk, setProduk] = useState("");
  const [jumlahProduk, setJumlahProduk] = useState("");
  const [distributor, setDistributor] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [distributorOptions, setDistributorOptions] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [selectedDistributorId, setSelectedDistributorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    document.title = "Input Sales | MegaMinyak Energi";
    fetchProductOptions();
    fetchDistributorOptions();
  }, []);

  useEffect(() => {
    calculateTotalHarga();
  }, [summaryData, productOptions]);

  const calculateTotalHarga = () => {
    let total = 0;
    for (const data of summaryData) {
      const selectedProduct = productOptions.find(
        (product) => product.id === data.id_produk
      );
      if (selectedProduct) {
        const totalPriceForRow =
          selectedProduct.harga * parseInt(data.jumlahProduk, 10);
        total += totalPriceForRow;
      }
    }
    setTotalHarga(total);
  };

  const fetchProductOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/pemin/product");
      const result = await response.json();
      // console.log("Product Options Response:", result);
      if (result.status === "success" && Array.isArray(result.data)) {
        setProductOptions(result.data);
      } else {
        console.error(
          "Invalid product options format. Expected an array, received:",
          result
        );
        setProductOptions([]);
      }
    } catch (error) {
      console.error("Error fetching product options:", error);
      setProductOptions([]);
    }
  };

  const fetchDistributorOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/pemin/distributor"
      );
      const result = await response.json();
      // console.log("Distributor Options Response:", result);
      if (result.status === "success" && Array.isArray(result.data)) {
        setDistributorOptions(result.data);
      } else {
        console.error(
          "Invalid distributor options format. Expected an array, received:",
          result
        );
        setDistributorOptions([]);
      }
    } catch (error) {
      console.error("Error fetching distributor options:", error);
      setDistributorOptions([]);
    }
  };

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
    setSelectedDate(e.target.value);
  };

  const handleProdukChange = (e) => {
    setProduk(e.target.value);
  };

  const handleJumlahProdukChange = (e) => {
    setJumlahProduk(e.target.value);
  };

  const handleDistributorChange = (e) => {
    const selectedDistributorName = e.target.value;
    setDistributor(selectedDistributorName);

    const selectedDistributor = distributorOptions.find(
      (d) => d.nama_distributor === selectedDistributorName
    );

    if (selectedDistributor) {
      setSelectedDistributorId(selectedDistributor.id);
    }
  };

  const handleTambahClick = () => {
    try {
      const selectedProduct = productOptions.find(
        (product) => product.nama_produk === produk
      );

      if (selectedProduct) {
        const selectedDistributor = distributorOptions.find(
          (d) => d.nama_distributor === distributor
        );

        if (selectedDistributor) {
          const summaryItem = {
            id_produk: selectedProduct.id,
            nama_produk: produk,
            jumlahProduk: jumlahProduk,
            nama_distributor: distributor,
            id_distributor: selectedDistributor.id,
          };

          setSalesData([
            ...salesData,
            {
              id_produk: selectedProduct.id,
              produk: produk,
              jumlahProduk: jumlahProduk,
              distributor: distributor,
            },
          ]);

          setSummaryData([...summaryData, summaryItem]);
          setTanggal("");
          setProduk("");
          setJumlahProduk("");
          setDistributor("");
          setSelectedDistributorId("");
        } else {
          console.error("Selected distributor not found");
        }
      } else {
        console.error("Selected product not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setSummaryData([]);
    setSalesData([]);
  };

  const handleHapus = (rowData) => {
    const updatedSummaryData = summaryData.filter(
      (item) => item !== rowData
    );
    const updatedSalesData = salesData.filter(
      (item) => item !== rowData
    );
    setSummaryData(updatedSummaryData);
    setSalesData(updatedSalesData);
  };

  const handleSimpan = async () => {
    try {
      const postDataArray = summaryData.map((data) => ({
        tanggal_pemesanan: selectedDate,
        jumlah: parseInt(data.jumlahProduk, 10),
        distributor_id: data.id_distributor,
        product_id: data.id_produk,
      }));
      console.log("Data to be sent:", postDataArray);
      for (const postData of postDataArray) {
        const response = await fetch("http://localhost:8000/api/pemin/sale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        const result = await response.json();
        if (result.status !== "success") {
          console.error("Failed to save data for a row:", result.error);
          return;
        }
        console.log("Data saved successfully for a row:", postData);
      }
      alert("Data Penjualan Berhasil Tersimpan!");
      setSelectedDate("");
      setProduk("");
      setJumlahProduk("");
      setDistributor("");
      setSalesData([]);
      setSummaryData([]);
      setSelectedDistributorId("");
    } catch (error) {
      console.error("Error saving data:", error.message);
      alert("Error saving data: " + error.message);
    }
  };

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
                value={selectedDate}
                onChange={handleTanggalChange}
                className="mt-2 text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Cari ID / Nama Produk:
              </label>
              <select
                value={produk}
                onChange={handleProdukChange}
                className="mt-2 text-[15px] w-full h-[40px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              >
                <option>--Pilih--</option>
                {productOptions.map((product) => (
                  <option key={product.id} value={product.nama_produk}>
                    {product.id} - {product.nama_produk}
                  </option>
                ))}
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
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Distributor:
              </label>
              <select
                value={distributor}
                onChange={handleDistributorChange}
                className="mt-2 h-[40px] text-[15px] w-full h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
              >
                <option>--Pilih--</option>
                {distributorOptions.map((distributor) => (
                  <option
                    key={distributor.id}
                    value={distributor.nama_distributor}
                  >
                    {distributor.nama_distributor}
                  </option>
                ))}
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
              {summaryData.map((data) => (
                <tr key={data.id_produk}>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.id_produk}
                  </td>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.nama_produk}
                  </td>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.jumlahProduk}
                  </td>
                  <td className="border-2 text-center border-[#6A93FF]">
                    {data.nama_distributor}
                  </td>
                  <td className="border-2 text-center  border-[#6A93FF] p-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 text-[12px] rounded-md"
                      onClick={() => handleHapus(data)}
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
            value={totalHarga + "000"}
            className="mt-2 ml-3 text-[15px] w-1/6 h-[35px] px-3 font-[15px] border-2 border-[#6A93FF] rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div className="flex items-center justify-between mt-10">
          <Link to="/sales">
            <button className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold">
              Kembali
            </button>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold"
            >
              Hapus
            </button>
            <button
              onClick={handleSimpan}
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