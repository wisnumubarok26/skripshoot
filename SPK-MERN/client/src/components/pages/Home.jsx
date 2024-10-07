import React from 'react';
import Navbar from '../fragment/Navbar';
import RelawanList from '../fragment/Relawan/TableRelawan';

const Home = () => {
    return (
        <div className="flex">
            <Navbar/>
            <div className="flex-grow bg-gray-100 p-6">
                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Data Relawan</h1>
                </div>
                <div>
                    <RelawanList />                    
                </div>
            </div>
        </div>
    );
};

export default Home;
