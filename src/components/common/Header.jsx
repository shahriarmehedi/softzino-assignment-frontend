import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {

    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";
    const { user, logOut } = useAuth();

    return (
        <div className='h-[75px] bg-gray-900 text-white'>
            <div className='flex items-center justify-around pt-3'>
                <div>
                    <NavLink to="/">
                        <h3 className='text-2xl font-extralight'>SOFTZINO</h3>
                    </NavLink>
                </div>
                <div>

                    {
                        !user?.email &&
                        <NavLink to="/login">
                            <button className='bg-rose-500 px-5 py-3 rounded-md mr-5'>Login</button>
                        </NavLink>
                    }
                    {
                        user?.email && (
                            <div className="dropdown dropdown-end">
                                <img tabIndex="0" className="h-12 rounded-full relative top-1 cursor-pointer" src={reserveImg} alt="" />
                                <ul tabIndex="0" className="dropdown-content relative top-[60px] menu p-2 shadow bg-base-100 text-gray-800 rounded-box w-52">

                                    <NavLink to="/dashboard/main">
                                        <li>
                                            <button className=''>Dashboard</button>
                                        </li>
                                    </NavLink>
                                    <li>
                                        <button onClick={logOut} className=''>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Header;