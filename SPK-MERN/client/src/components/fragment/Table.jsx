// src/components/Table.jsx
import React from 'react';

const Table = () => {
    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Data Relawan</h3>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nama Relawan</th>
                        <th className="py-2 px-4 border-b">Kehadiran</th>
                        <th className="py-2 px-4 border-b">Ketepatan Waktu</th>
                        <th className="py-2 px-4 border-b">Keterlibatan</th>
                        <th className="py-2 px-4 border-b">Kerjasama</th>
                        <th className="py-2 px-4 border-b">Inisiatif dan Kreativitas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Relawan A</td>
                        <td className="py-2 px-4 border-b">90%</td>
                        <td className="py-2 px-4 border-b">85%</td>
                        <td className="py-2 px-4 border-b">80%</td>
                        <td className="py-2 px-4 border-b">75%</td>
                        <td className="py-2 px-4 border-b">88%</td>
                    </tr>
                    {/* Tambahkan baris lainnya sesuai kebutuhan */}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
