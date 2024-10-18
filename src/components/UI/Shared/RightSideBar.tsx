"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { format } from "date-fns";
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { useGetAllUserQuery, useGetCurrentUserQuery } from '@/redux/features/auth/authApi';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hook';
import { useCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetAllPostQuery } from '@/redux/features/post/postApi';
import { useRouter } from "next/navigation";

// Fake popular destinations and suggested travelers data




const RightSidebar = () => {
    const { data: userData } = useGetCurrentUserQuery({});

    const router = useRouter()
    const user = useAppSelector(useCurrentUser);

    const { data: allUsersData } = useGetAllUserQuery(undefined);
    const { data: allPostData } = useGetAllPostQuery({})
    console.log(allPostData)


    const verifiedUsers = allUsersData?.data?.filter(user => user.isVerified);

    const handleNavigate = (id:string) => {
        if (!user) {
            router.push('/login')
        }else{
            router.push(`/post/${id}`)
        }
    }

    return (
        <div className="h-[100vh] ">

            {/* User List */}
            <h4 className=" font-bold mb-4">Follower</h4>
            
            <ul className="space-y-4">
                {userData?.data?._id === user?._id && userData?.data?.followers?.map((followingUser) => (
                    <li key={followingUser.id} className="flex items-center">
                        <Link className="block mb-2" href={`/profile/${followingUser?._id}`}>
                            <Image
                                src={followingUser?.profileImage}
                                alt={`${followingUser.name} Avatar`}
                                className="w-10 h-10 rounded-full"
                                width={40} // 10 * 4 for responsive sizes
                                height={40} // 10 * 4 for responsive sizes
                            />
                        </Link>

                        <Link className="block mb-2" href={`/profile/${followingUser?._id}`}>
                            <span className="ml-3  hover:underline">
                                {followingUser?.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <hr className="mt-8" />


            {/* Latest Articles */}
            <div className="mb-8">
                <h4 className=" font-bold mb-4">Latest Articles</h4>
                <ul className="space-y-3">
                    {allPostData?.data?.map((article) => (
                        <li key={article._id} className="">

                            <div onClick={() => handleNavigate(article?._id)} className="block mb-2 hover:cursor-pointer">
                                <h5 className="font-semibold hover:underline">{article?.title}</h5>
                                <p className="text-sm ">{format(new Date(article?.createdAt), "MMM dd, yyyy")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Suggested Travelers */}
            {
                user && <div>
                    <h4 className=" font-bold mb-4">Verified Travelers</h4>
                    <ul className="space-y-4">
                        {verifiedUsers?.map((traveler) => (
                            <li key={traveler._id} className="flex items-center">
                                <Link className="block mb-2" href={`/profile/${traveler?._id}`}>
                                    <Image
                                        src={traveler?.profileImage}
                                        alt={`${traveler?.name} Avatar`}
                                        className="rounded-full"
                                        width={40} // Set the width
                                        height={40} // Set the height
                                    />
                                </Link>
                                <Link className="block mb-2" href={`/profile/${traveler?._id}`}>
                                    <span className="ml-3 ">{traveler?.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div >
    );
};

export default RightSidebar;
