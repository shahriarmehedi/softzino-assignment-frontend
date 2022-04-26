import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IoMdArrowRoundBack } from 'react-icons/io';
const Sidebar = () => {

    const { logOut } = useAuth();
    return (
        <div className='fixed w-[300px] bg-gray-800 h-full text-white'>
            <NavLink to="/">
                <div className='flex items-center justify-center hover:text-rose-500'>
                    <div className='relative top-5 text-xl pr-2'>
                        <IoMdArrowRoundBack />
                    </div>
                    <h3 className='pt-10 text-xl  transition duration-150'>Back to home</h3>
                </div>
            </NavLink>
            <div>
                <button onClick={logOut} className='bg-gray-700 hover:bg-rose-500 transition duration-150 py-3 cursor-pointer px-10 rounded-md mt-10'>Logout</button>
            </div>
            <ul className='pt-10'>
                <NavLink to="/dashboard/main">
                    <li className='bg-gray-700 hover:bg-rose-500 transition duration-150 py-4 cursor-pointer mb-1'>Dashboard</li>
                </NavLink>

                <NavLink to="/dashboard/users">
                    <li className='bg-gray-700 hover:bg-rose-500 transition duration-150 py-4 cursor-pointer mb-1'>Users</li>
                </NavLink>

                <NavLink to="/dashboard/products">
                    <li className='bg-gray-700 hover:bg-rose-500 transition duration-150 py-4 cursor-pointer'>Products</li>
                </NavLink>

            </ul>



        </div>
    );
};

export default Sidebar;