import React from 'react';
import { FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa'; // Importing icons from react-icons
import Image from 'next/image'; // Importing Image from next/image

// Fake users data
const users = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Michael Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'Chris Brown', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, name: 'Patricia Miller', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: 7, name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: 8, name: 'Linda Taylor', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: 9, name: 'Robert Anderson', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: 10, name: 'Elizabeth Martinez', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: 11, name: 'David Clark', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 12, name: 'Sarah Lewis', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 13, name: 'Daniel Walker', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
];

const LeftSidebar = () => {
    return (
        <div className="h-[100vh] bg-[#f0f2f5] p-4">
            {/* Current User Profile */}
            <div className="flex items-center mb-8 hover:bg-slate-400 cursor-pointer p-1 rounded-md">
                <Image
                    src="https://randomuser.me/api/portraits/men/14.jpg"
                    alt="Current User Avatar"
                    className="w-12 h-12 rounded-full"
                    width={48} // 12 * 4 for responsive sizes
                    height={48} // 12 * 4 for responsive sizes
                />
                <div className="ml-3">
                    <h3 className="text-lg font-semibold">Current User</h3>
                </div>
            </div>

            <hr />
            {/* User List */}
            <h4 className="text-gray-700 font-bold mb-4">Following</h4>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id} className="flex items-center">
                        <Image
                            src={user.avatar}
                            alt={`${user.name} Avatar`}
                            className="w-10 h-10 rounded-full"
                            width={40} // 10 * 4 for responsive sizes
                            height={40} // 10 * 4 for responsive sizes
                        />
                        <span className="ml-3 text-gray-800">{user.name}</span>
                    </li>
                ))}
            </ul>

            <hr className="mt-8" />

            {/* Bottom Buttons */}
            <div className="mt-8 space-y-4">
                <button className="flex items-center text-gray-700 hover:bg-gray-300 p-2 rounded-md w-full">
                    <FaCog className="mr-2" />
                    <span>Settings</span>
                </button>
                <button className="flex items-center text-gray-700 hover:bg-gray-300 p-2 rounded-md w-full">
                    <FaBell className="mr-2" />
                    <span>Notifications</span>
                </button>
                <button className="flex items-center text-gray-700 hover:bg-gray-300 p-2 rounded-md w-full">
                    <FaSignOutAlt className="mr-2" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default LeftSidebar;
