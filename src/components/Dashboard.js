import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Aside from './Aside/Aside';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <Aside/>
      <div className='w-full h-full overflow-y-auto'>
       <Outlet />
      </div>
    </div>
  );
}
