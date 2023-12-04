import React from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import orderData from '../../data/Data';
import jumlahPenjualanIcons from '../../assets/Sell.png'
import dummyDistributorNames from '../../data/DummyData';
import jumlahDistributorIcons from '../../assets/SellStock.png'
import BarChart from '../../components/Chart/BarChart';
import LineChart from '../../components/Chart/LineChart';
import BarChart2 from '../../components/Chart/BarChart2';


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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className='flex w-screen h-screen bg-[#E8EBF0] '>
            <Sidebar />

            <div className='w-10/12   mx-[20px] my-[27px] '>
                <div className='w-full h-[86px] bg-blue-500 rounded-t-lg mb-2'></div>
                <div className='flex grid-cols-2 gap-5'>
                    <div className='w-6/12'>
                        <div className='max-h-[240px] h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal  text-xl text-center mb-2'>Total penjualan produk per bulan</div>
                            <div className=' flex justify-center w-full mb-2'>
                                <BarChart />
                            </div>


                            <div>

                            </div>
                        </div>
                        <div className='h-[240px] border-full border-blue-400 border-2 rounded-lg mb-3 py-2 bg-white'>
                            <div className='font-normal text-xl text-center mb-2'>Total Stok Produk</div>
                            <div className='flex justify-center w-full mb-2'>
                                <LineChart />
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
                            <div className='flex justify-center  w-full mb-2'>
                                <BarChart2 />
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default AnalisisPage
