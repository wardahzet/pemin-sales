import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getSalesData } from "../../services/Sales";
import { Link } from "react-router-dom";
import { Dropdown } from 'flowbite-react';

export default function ShowSales() {
  const [saleData, setSalesData] = useState([]); 
  useEffect(() => {
    document.title = "Sales | MegaMinyak Energi";
    getSalesData()
      .then((data) => {
        setSalesData(data.data);
      })
      .catch((err) => {
        console.error("Error setting product data:", err);
      });
  }, []);

  const arr = {};
  const jumlah = {}
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  saleData.forEach((sale) => {
    const date = new Date(sale.tanggal_pemesanan);
    const tahun = date.getFullYear();
    const bulan = monthNames[date.getMonth()];
    const produk = sale.product.nama_produk;
    const harga = sale.product.harga;
    const distributor = sale.distributor.nama_distributor;
    if (!arr[tahun]) {
      arr[tahun] = {};
      jumlah[`${tahun}`] = 0;
    }
    if (!arr[tahun][bulan]) {
      arr[tahun][bulan] = {};
      jumlah[`${tahun}-${bulan}`] = 0;
    }
    if (!arr[tahun][bulan][produk]) {
      arr[tahun][bulan][produk] = {};
      jumlah[`${tahun}-${bulan}-${produk}`] = 0;
    }
    if (!arr[tahun][bulan][produk][distributor]) {
      arr[tahun][bulan][produk][distributor] = 0;
      jumlah[`${tahun}`]++;
      jumlah[`${tahun}-${bulan}`]++;
      jumlah[`${tahun}-${bulan}-${produk}`]++;
    }
  
    arr[tahun][bulan][produk][distributor] += harga;
  });

  return (
    <div className="flex bg-[#E8EBF0]">
      <Sidebar />
      <div className="p-10 min-h-screen w-full">
        <div className="bg-[#6A93FF] p-5 items-center h-[86px] justify-between flex rounded-t-3xl">
          <h1 className="text-3xl font-semibold text-white">PENJUALAN</h1>
          <Link to='/sales/add'>
            <button className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold">
              Tambah
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-b-3xl border-2 border-[#6A93FF] mt-5 overflow-auto max-h-100">
          <table className="w-full">
            <thead>
              <tr className="text-gray-700 h-[75px]">
                <th className="border-r-2 border-b-2 border-[#6A93FF]">
                  Tahun
                </th>
                <th className="border-x-2 border-b-2 border-[#6A93FF]">
                  Bulan
                </th>
                <th className="border-x-2 border-b-2 border-[#6A93FF]">
                  Produk
                </th>
                <th className="border-x-2 border-b-2 border-[#6A93FF]">
                  Distributor
                </th>
                <th className="border-l-2 border-b-2 border-[#6A93FF]">
                  Penjualan
                </th>
              </tr>
            </thead>
            
            <tbody>
              {Object.keys(arr).map((tahun) => (
                Object.keys(arr[tahun]).map((bulan,indexbulan) => ( 
                  Object.keys(arr[tahun][bulan]).map((produk,indexproduk) => (  
                    Object.keys(arr[tahun][bulan][produk]).map((distributor,index) => (  
                      <>
                      <tr key={`${tahun}`}>     

                      {index === 0 && indexproduk === 0 && indexbulan === 0 ? (                              
                        <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]"
                          rowSpan={jumlah[`${tahun}`]}
                        >
                          {tahun}
                        </td>                            
                      ): null}

                      {indexproduk === 0 && index === 0 ? (
                        <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]"
                        rowSpan={jumlah[`${tahun}-${bulan}`]}
                        >
                        {bulan}                        
                        </td>                         
                      ): null}

                      {index === 0 ? (
                        <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]"
                        rowSpan={                          
                          jumlah[`${tahun}-${bulan}-${produk}`]
                        }
                        >
                        {produk}                        
                        </td>                           
                      ): null}
                    
                      <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                        {distributor}
                      </td>
                      <td className="border-l-2 h-[50px] border-t-2 border-[#6A93FF]">
                        {arr[tahun][bulan][produk][distributor]}
                      </td>   
                      </tr>               
                      </>
                    ))
                  ))
                ))    
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

