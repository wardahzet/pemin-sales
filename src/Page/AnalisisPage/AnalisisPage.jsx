import React from 'react'

import Sidebar from '../../Component/Sidebar/Sidebar'
import orderData from '../../Data';
import jumlahPenjualanIcons from '../../assets/Sell.png'
import dummyDistributorNames from '../../DummyData';
import jumlahDistributorIcons from '../../assets/SellStock.png'


function AnalisisPage() {
    const orderCountPerYear = orderData.reduce((result, order) => {
        const year = order.tanggal_pemesanan.substring(0, 4);
        result[year] = (result[year] || 0) + 1;
        return result;
    }, {});
    const totalSales = orderData.reduce((total, order) => {
        return total + order.jumlah;
    }, 0);
    console.log(totalSales)
    const totalDistributors = dummyDistributorNames.length;
    console.log(totalDistributors)



    return (
        <div className='flex w-screen h-screen bg-[#E8EBF0] '>
            <Sidebar />

            <div className='w-10/12 bg-yellow-50  mx-[20px] my-[27px] '>
                <div className='w-full h-[86px] bg-blue-500 rounded-t-lg mb-2'></div>
                <div className='flex grid-cols-2 gap-5'>
                    <div className='w-6/12'>
                        <div className='max-h-[240px] h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2'>
                            <div className='font-normal text-xl text-center mb-2'>Total penjualan produk per bulan</div>
                            <div>

                            </div>
                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 '>
                            <div className='font-normal text-xl text-center mb-2'>Total Stok Produk</div>
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
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2'>
                            <div className='font-normal text-xl text-center mb-2'>Distribusi produk ke distributor per bulan</div>
                           
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default AnalisisPage
