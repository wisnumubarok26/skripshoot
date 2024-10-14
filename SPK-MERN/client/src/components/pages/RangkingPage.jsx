import React from 'react';
import Navbar from '../fragment/Navbar';
import Rangking from '../fragment/Rangking/Rangking'

const RangkingPage = () => {
    return (
        <div className="flex">
            <Navbar/>
            <div className="flex-grow bg-gray-100 p-6">
                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Penilaian</h1>
                </div>
                <div>
                    <Rangking />                    
                </div>
            </div>
        </div>
    );
};

export default RangkingPage;
