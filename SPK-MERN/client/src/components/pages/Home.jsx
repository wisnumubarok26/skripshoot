// src/pages/Home.jsx
import React from 'react';
import Navbar from '../fragment/Navbar';
import Table from '../fragment/Table';

const Home = (setIsLoggedIn) => {
    return (
        <div className="flex">
            <Navbar setIsLoggedIn={setIsLoggedIn}/>
            <div className="flex-grow bg-gray-100">
                <Table />
            </div>
        </div>
    );
};

export default Home;
