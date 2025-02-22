import clsx from 'clsx'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Aside() {
  const [open, setOpen] = useState(false)
  const { admin } = useAuth()

  return (
    <>
        <button onClick={() => setOpen(!open)} className='fixed z-50 left-5 top-2 lg:hidden'>
            hamb
        </button>
        <div className={clsx(
            'w-full h-full bg-gray-500/50 fixed left-0 top-0 z-50 lg:relative lg:w-72',
             open ? 'block' : 'hidden lg:block'
        )}>
            <div className={"w-72 h-full"}>
                <div className="flex flex-col h-full px-2 bg-white shadow-lg">
                <div className='w-full flex justify-end lg:hidden'>
                    <button onClick={() => {
                        setOpen(!open)
                    }}>X</button>
                </div>
                <div className="flex flex-col items-center gap-4 p-4">
                    <div className="text-5xl font-bold text-[#b7c2ff] cursor-default">Logo</div>
                    <div className="w-24 h-24 p-5 rounded-full border-4 border-gray-400 transition duration-200 hover:border-gray-700 hover:opacity-90"></div>
                    <div className="text-center text-xl text-black font-sans">{admin.name} {admin.lastname}</div>
                </div>
                <div className="flex flex-col items-center w-full pt-16 text-2xl font-medium text-gray-700">
                    <Link
                        to="/customers"
                        className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
                        >
                        Customers
                    </Link>
                    <Link
                        to="/categories"
                        className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
                        >
                        Categories
                    </Link>
                    <Link
                        to="/sales"
                        className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
                        >
                        Sales
                    </Link>
                    <Link
                        to="/profile"
                        className="cursor-pointer w-full py-2 text-center transition duration-200 hover:bg-gray-100 focus:bg-[#d1d7ff] focus:outline focus:outline-gray-700 rounded focus:text-white active:bg-[#b7c2ff] active:text-white"
                        >
                        Profiles
                    </Link>

                </div>
                </div>
            </div>
        </div>
    </>
  )
}
