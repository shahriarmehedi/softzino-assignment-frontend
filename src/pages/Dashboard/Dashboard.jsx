import React from 'react';
import Sidebar from '../../components/other/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='relative left-[300px]'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;