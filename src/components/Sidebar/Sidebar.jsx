import React from 'react'
import Logo from '../../assets/LOGO.png'
import { Link } from 'react-router-dom'
import ProdukIcon from '../../assets/box.png'
import AnalisisIcon from '../../assets/analisis.png'
import PenjualanIcon from '../../assets/selling.png'

function Sidebar() {
  return (
    <div className='ml-[20px]  my-[27px]   '>
      <div className='mb-2 h-[86px] w-[295px]'>
        <img src={Logo} alt='Logo' className='  h-[86px] rounded-t-xl border-solid border-2 border-[#6A94FF]' />
      </div>
      <div className='h-[500px] w-[291px] border-2 border-[#6A94FF] bg-white rounded-b-lg'>
        <div className='w-full  hover:bg-blue-200 flex items-center px-[22px] py-[25px]'>
          <Link to={`/product`} className='flex items-center'>
            <img src={ProdukIcon} alt='Produk Icon' className='mr-[20px]' />
            <p className='font-normal text-xl'>Produk</p>
          </Link>
        </div>
        <div className='w-full  hover:bg-blue-200 flex items-center px-[22px] py-[25px]'>
          <Link to={`/dashboard`} className='flex items-center'>
            <img src={AnalisisIcon} alt='Analisis Icon' className='mr-[20px]' />
            <p className='font-normal text-xl'>Analisis</p>
          </Link>
        </div>
        <div className=' w-full   hover:bg-blue-200 flex items-center px-[22px] py-[25px]'>
          <Link to={`/sales`} className='flex items-center'>
            <img src={PenjualanIcon} alt='Penjualan Icon' className='mr-[20px]' />
            <p className='font-normal text-xl'>Penjualan</p>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Sidebar
