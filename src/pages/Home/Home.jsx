import React from 'react';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';

const Home = () => {
    return (
        <>
            <Header />
            <div className='h-[500px]'>
                <h3 className='py-20 text-4xl font-extralight'>Homepage</h3>
            </div>


            <Footer />
        </>
    );
};

export default Home;