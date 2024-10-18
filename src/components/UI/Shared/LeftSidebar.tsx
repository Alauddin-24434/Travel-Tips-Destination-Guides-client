"use client";
import React, { useState } from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa"; // Importing icons from react-icons
import Image from "next/image"; // Importing Image from next/image

import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const LeftSidebar = () => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetCurrentUserQuery({});
  const user = useAppSelector(useCurrentUser);

  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user and token
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  return (
    <div className="flex flex-col justify-between h-[80vh] p-4">
      {/* User List */}
      <div>
        <h4 className=" font-bold mb-4">Following</h4>
        <ul className="space-y-4">
          {/* Check if the current user's _id matches the userData's _id */}
          {userData?.data?._id === user?._id &&
            userData?.data?.following?.map((followingUser) => (
              <li key={followingUser.id} className="flex items-center">
                <Link
                  className="block mb-2"
                  href={`/profile/${followingUser?._id}`}
                >
                  <Image
                    src={followingUser?.profileImage}
                    alt={`${followingUser.name} Avatar`}
                    className="w-10 h-10 rounded-full"
                    width={40} // 10 * 4 for responsive sizes
                    height={40} // 10 * 4 for responsive sizes
                  />
                </Link>

                <Link
                  className="block mb-2"
                  href={`/profile/${followingUser?._id}`}
                >
                  <span className="ml-3  hover:underline">
                    {followingUser?.name}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Bottom Buttons */}
      <div>
        <hr className="mb-2" />

        <div className="space-y-4">
          {/* Settings Button */}
          <button
            onClick={toggleDropdown}
            className="flex items-center hover:text-slate-600 hover:bg-gray-300 p-2 rounded-md w-full"
          >
            <FaCog className="mr-2" />
            <span>Settings</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="mt-2 bg-gray-100 rounded-md shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard/edit-profile" className="block text-gray-700 hover:underline">
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/change-password" className="block text-gray-700 hover:underline">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile" className="block text-gray-700 hover:underline">
                    Verify Profile
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-slate-600 hover:bg-gray-300 p-2 rounded-md w-full"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
