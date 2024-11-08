import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-72 h-full hidden sm:block">
        <div className="flex flex-col h-full bg-white shadow-lg">
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="text-5xl font-bold text-[#b7c2ff] cursor-default">Logo</div>
            <div className="w-24 h-24 p-5 rounded-full border-4 border-gray-400 transition duration-200 hover:border-gray-700 hover:opacity-90"></div>
            <div className="text-center text-xl text-black font-sans">John Doe</div>
          </div>
          <div className="flex flex-col items-center w-full pt-16 text-2xl font-medium text-gray-700">
            <Link
              to="/Customers"
              className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
            >
              Customers
            </Link>
            <Link
              to="/Categories"
              className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full h-full overflow-y-auto'>
       <Outlet />
      </div>
    </div>
  );
}
