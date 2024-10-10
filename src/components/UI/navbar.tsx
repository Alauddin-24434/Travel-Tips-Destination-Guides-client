"use client";
import React from 'react';
import Link from 'next/link'; // Update import to use Next.js Link
import { FaHome, FaPlane, FaBookOpen, FaInfoCircle, FaPhone } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm py-4 w-full mb-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-green-500">
                    Travel Tripes
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="flex items-center text-gray-700 hover:text-green-500">
                            <FaHome className="mr-2" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/trips" className="flex items-center text-gray-700 hover:text-green-500">
                            <FaPlane className="mr-2" />
                            Trips
                        </Link>
                    </li>
                    <li>
                        <Link href="/guides" className="flex items-center text-gray-700 hover:text-green-500">
                            <FaBookOpen className="mr-2" />
                            Guides
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="flex items-center text-gray-700 hover:text-green-500">
                            <FaInfoCircle className="mr-2" />
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="flex items-center text-gray-700 hover:text-green-500">
                            <FaPhone className="mr-2" />
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
