import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ShowSales() {
  const dummySalesData = [
    {
      id: 1,
      tahun: 2023,
      bulan: "Maret",
      produk: "Produk A",
      distributor: "Distributor X",
      penjualan: 50,
    },
    {
      id: 2,
      tahun: 2023,
      bulan: "Maret",
      produk: "Produk B",
      distributor: "Distributor Y",
      penjualan: 25,
    },
    {
      id: 3,
      tahun: 2024,
      bulan: "Januari",
      produk: "Produk B",
      distributor: "Distributor Y",
      penjualan: 25,
    },
  ];

  const [salesData, setSalesData] = useState(dummySalesData);

  useEffect(() => {
    document.title = "Sales | MegaMinyak Energi";
  }, []);

  const rowsByYearMonth = {};

  dummySalesData.forEach((sale) => {
    const key = `${sale.tahun}-${sale.bulan}`;

    if (!rowsByYearMonth[key]) {
      rowsByYearMonth[key] = [sale];
    } else {
      rowsByYearMonth[key].push(sale);
    }
  });

  return (
    <div className="flex bg-[#E8EBF0]">
      <Sidebar />
      <div className="p-10 min-h-screen w-full">
        <div className="bg-[#6A93FF] p-5 items-center h-[86px] justify-between flex rounded-t-3xl">
          <h1 className="text-3xl font-semibold text-white">PENJUALAN</h1>
          <button className="bg-[#FFD56A] w-[140px] text-black px-4 py-2 text-sm font-semibold">
            Tambah
          </button>
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
            <tbody className="text-center">
              {Object.keys(rowsByYearMonth).map((yearMonth) => (
                <React.Fragment key={yearMonth}>
                  {rowsByYearMonth[yearMonth].map((sale, index) => (
                    <tr key={`${sale.id}-${yearMonth}-${index}`}>
                      {index === 0 ? (
                        <>
                          <td
                            className="border-r-2 h-[50px] border-t-2 border-[#6A93FF]"
                            rowSpan={rowsByYearMonth[yearMonth].length}
                          >
                            {sale.tahun}
                          </td>
                          <td
                            className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]"
                            rowSpan={rowsByYearMonth[yearMonth].length}
                          >
                            {sale.bulan}
                          </td>
                        </>
                      ) : null}
                      <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                        {sale.produk}
                      </td>
                      <td className="border-x-2 h-[50px] border-t-2 border-[#6A93FF]">
                        {sale.distributor}
                      </td>
                      <td className="border-l-2 h-[50px] border-t-2 border-[#6A93FF]">
                        {sale.penjualan}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
