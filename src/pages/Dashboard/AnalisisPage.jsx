import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import jumlahPenjualanIcons from '../../assets/Sell.png'
import jumlahDistributorIcons from '../../assets/SellStock.png'
import BarChart from '../../components/Chart/LineChart';
import BarChart2 from '../../components/Chart/BarChart2';
import LineChart from '../../components/Chart/BarChart';


function AnalisisPage() {
    const distributorData = [
        { id: 1, nama_distributor: 'Shell' },
        { id: 2, nama_distributor: 'Petamina' },
        { id: 3, nama_distributor: 'Petronas' },

    ];
    const dummyProductData = [
        { id: 1, nama_produk: 'Gasoline', stok: 10, harga: 100.0, keterangan: 'Deskripsi Produk A' },
        { id: 2, nama_produk: 'Petrolium', stok: 20, harga: 150.0, keterangan: 'Deskripsi Produk B' },
        { id: 3, nama_produk: 'Kerosin', stok: 15, harga: 120.0, keterangan: 'Deskripsi Produk C' },

    ];
    const dummySalesData = [
        { id: 1, tanggal_pemesanan: '2023-10-01', jumlah: 5, distributor_id: 1, product_id: 1 },
        { id: 2, tanggal_pemesanan: '2023-10-02', jumlah: 10, distributor_id: 2, product_id: 2 },
        { id: 3, tanggal_pemesanan: '2023-10-03', jumlah: 8, distributor_id: 3, product_id: 3 },
        { id: 4, tanggal_pemesanan: '2023-12-11', jumlah: 3, distributor_id: 1, product_id: 1 },
        { id: 5, tanggal_pemesanan: '2023-12-12', jumlah: 15, distributor_id: 2, product_id: 1 },
        { id: 6, tanggal_pemesanan: '2024-12-14', jumlah: 7, distributor_id: 3, product_id: 1 },
        { id: 7, tanggal_pemesanan: '2023-12-01', jumlah: 5, distributor_id: 1, product_id: 2 },
        { id: 8, tanggal_pemesanan: '2023-12-02', jumlah: 10, distributor_id: 2, product_id: 2 },
        { id: 9, tanggal_pemesanan: '2023-12-03', jumlah: 8, distributor_id: 3, product_id: 2 },
        { id: 10, tanggal_pemesanan: '2023-12-04', jumlah: 3, distributor_id: 1, product_id: 3 },
        { id: 11, tanggal_pemesanan: '2023-12-11', jumlah: 15, distributor_id: 2, product_id: 1 },
        { id: 12, tanggal_pemesanan: '2023-12-12', jumlah: 10, distributor_id: 2, product_id: 3 },
        { id: 13, tanggal_pemesanan: '2023-12-13', jumlah: 12, distributor_id: 3, product_id: 1 },
        { id: 14, tanggal_pemesanan: '2023-12-14', jumlah: 12, distributor_id: 3, product_id: 3 },
        { id: 15, tanggal_pemesanan: '2024-01-01', jumlah: 7, distributor_id: 3, product_id: 2 },
        { id: 15, tanggal_pemesanan: '2024-01-02', jumlah: 12, distributor_id: 1, product_id: 2 },

    ];
    const totalSales = dummySalesData.reduce((acc, sale) => acc + sale.jumlah, 0);
    const distributorIdsFromSales = dummySalesData.map(sale => sale.distributor_id);
    const uniqueDistributorIds = Array.from(new Set(distributorIdsFromSales));
    const totalDistributors = uniqueDistributorIds.length;


    const totalSalesPerMonthAndProduct = dummySalesData.reduce((acc, sale) => {
        const saleDate = new Date(sale.tanggal_pemesanan);
        const monthYearKey = `${saleDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} ${saleDate.getFullYear()}`;
        acc[monthYearKey] = acc[monthYearKey] || {};
        const product = dummyProductData.find(product => product.id === sale.product_id);
        if (!acc[monthYearKey][sale.product_id]) {
            acc[monthYearKey][sale.product_id] = {
                product_name: product ? product.nama_produk : 'Unknown Product',
                total_quantity: 0,
            };
        }
        acc[monthYearKey][sale.product_id].total_quantity += sale.jumlah;

        return acc;
    }, {});


    const totalStockPerProduct = {};
    dummySalesData.forEach(sale => {
        const productId = sale.product_id;
        const product = dummyProductData.find(product => product.id === productId);

        if (product) {
            const productName = product.nama_produk;
            const productStock = product.stok;

            totalStockPerProduct[productName] = (totalStockPerProduct[productName] || 0) + productStock;
        }
    });

    console.log('Total Stock Per Product:', totalStockPerProduct);


    const distributionForCurrentMonth = [];
    const currentMonthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });

    dummySalesData.forEach(sale => {
        const productId = sale.product_id;
        const product = dummyProductData.find(product => product.id === productId);
        const distributorId = sale.distributor_id;
        const distributor = distributorData.find(distributor => distributor.id === distributorId);

        if (product && distributor) {
            const monthYearKey = new Date(sale.tanggal_pemesanan).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });
            if (monthYearKey === currentMonthYear) {
                const productName = product.nama_produk;
                const distributorName = distributor.nama_distributor;
                const quantity = sale.jumlah;

                distributionForCurrentMonth.push({ distributorName, productName, quantity });
            }
        }
    });

    console.log(`Distribution for ${currentMonthYear}:`, distributionForCurrentMonth);



    return (
        <div className='flex w-screen h-screen bg-[#E8EBF0] '>
         
                <Sidebar />

            <div className='w-10/12   mx-[20px] my-[27px] '>
                <div className='w-full h-[86px] bg-blue-500 rounded-t-lg mb-2 text-white font-medium text-[30px] px-5 flex items-center '>Analisis</div>
                <div className='flex grid-cols-2 gap-5'>
                    <div className='w-6/12'>
                        <div className='max-h-[240px] h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal  text-xl text-center mb-2'>Total penjualan produk per bulan</div>
                            <div className='  w-full mb-2'>
                                <BarChart totalSalesPerMonthAndProduct={totalSalesPerMonthAndProduct} />
                            </div>
                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal text-xl text-center mb-2'>Total Stok Produk</div>
                            <div className=' w-full mb-2'>
                                <LineChart totalStockPerProduct={totalStockPerProduct} />

                            </div>
                        </div>
                    </div>
                    <div className='w-6/12'>
                        <div className='max-h-[240px]'>
                            <div className='h-[110px] border-full border-blue-400  bg-white border-2 rounded-lg mb-4 flex justify-center items-center'>
                                <div className='font-bold text-[32px] mr-[42px]'>{totalSales}</div>
                                <div className='font-normal text-xl mr-[42px]'>Jumlah Penjualan</div>
                                <img src={jumlahPenjualanIcons} alt="" />
                            </div>
                            <div className='h-[110px] border-full border-blue-400 border-2 rounded-lg mb-4 flex justify-center items-center bg-white'>
                                <div className='font-bold text-[32px] mr-[42px]'>{totalDistributors}</div>
                                <div className='font-normal text-xl mr-[42px]'>Jumlah Distributor</div>
                                <img src={jumlahDistributorIcons} alt="" />
                            </div>
                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal text-xl text-center mb-2'>Distribusi produk ke distributor per bulan</div>
                            <div className=' w-full mb-2'>
                                <BarChart2 data={distributionForCurrentMonth} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalisisPage
