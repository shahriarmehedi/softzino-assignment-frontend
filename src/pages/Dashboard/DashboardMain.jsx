import React, { useEffect, useState } from 'react';

const DashboardMain = () => {

    // fetch all products and user from server
    const [allProduct, setAllProduct] = useState([])
    const [allUser, setAllUser] = useState([])

    // get all products
    useEffect(() => {
        getAllProducts();
    }, [allProduct]);

    // get all users
    useEffect(() => {
        getAllUsers();
    }, [allUser]);

    // get all products
    const getAllProducts = () => {
        const url = 'https://softzino-backend.herokuapp.com/products';
        fetch(url)

            .then(response => response.json())
            .then(data => {
                setAllProduct(data);
            })
    }

    // get all users
    const getAllUsers = () => {
        const url = 'https://softzino-backend.herokuapp.com/users';
        fetch(url)

            .then(response => response.json())
            .then(data => {
                setAllUser(data);
            })
    }



    return (
        <div>
            <h3 className='text-3xl font-bold py-10 pl-10 text-left'>Dashboard</h3>
            <div className='flex ml-10'>
                <div className='bg-sky-500 text-white rounded-md px-10 py-10 mr-5'>
                    <h3 className='text-2xl font-bold text-left'>Total Products: {allProduct.length} </h3>
                </div>
                <div className='bg-green-500 text-white rounded-md px-10 py-10'>
                    <h3 className='text-2xl font-bold text-left'>Total Users: {allUser.length}  </h3>
                </div>

            </div>
        </div>
    );
};

export default DashboardMain;