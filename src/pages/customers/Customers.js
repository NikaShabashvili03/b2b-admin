import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCustomers } from '../../redux/slices/customers'

function Customers() {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.customers)

  const isLoading = status === 'loading'
  const customers = data

  useEffect(() => { 
    dispatch(fetchCustomers())
  }, [dispatch])

    if (isLoading) {  
        return <div>Loading...</div>
    }
  return (
    <div className="w-full py-8 px-4">
        <div className="flex items-center justify-between pb-6">
            <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">View accounts of registered users</span>
            </div>
            <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
                <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>

                CSV
                </button>
            </div>
            </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">Full Name / Company</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Created at</th>
                    <th className="px-5 py-3">Sales</th>
                </tr>
                </thead>
                <tbody className="text-gray-500">
                {customers.map((customer) => ( 
                <tr key={customer.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-full w-full rounded-full" src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png" alt="" />
                            </div>
                            <div className="ml-3">
                            <p className="whitespace-no-wrap">{customer.firstname} {customer.lastname} / {customer.company}</p>
                            </div>
                        </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{customer.phone}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{new Date(customer.createdAt).getDate()}/{new Date(customer.createdAt).getMonth()+1}/{new Date(customer.createdAt).getFullYear()}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <Link to={`/customers/customersact`} className="rounded-md bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Sales</Link>
                    </td>
                </tr>
                 ))}

                </tbody>
            </table>
            </div>
            <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
            <div className="mt-2 flex justify-center items-center sm:mt-0">
                <button className="mr-2 h-8 w-12 rounded-lg border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
                <button className="h-8 w-12 rounded-lg border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
            </div>
            </div>
        </div>
        </div>
  )
}

export default Customers
