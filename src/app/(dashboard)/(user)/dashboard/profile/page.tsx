"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaUserEdit,
  FaUserCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Card, CardBody,} from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/ui/Loading";
import FollowerModal from "@/components/modal/FollowerModal";
import FollowingModal from "@/components/modal/FollowingModal";

const ProfilePage = () => {
  // Manage modal states using useState
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  const { data: currentUserData, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({});

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {currentUserLoading && <Loading />}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Card className="bg-white rounded-xl shadow-xl overflow-hidden">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Profile Image, Name, Bio, Location */}
              <div className="md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
                <div className="relative">
                  <div className="w-32 h-32">
                    <Badge
                      isOneChar
                      className={`${
                        !currentUserData?.data?.isVerified ? "hidden" : ""
                      }`}
                      color="success"
                      content={<CheckIcon />}
                      placement="bottom-right"
                      shape="circle"
                    >
                      <Avatar
                        isBordered
                        className="w-32 h-32 border-4 border-white shadow-lg"
                        color="primary"
                        src={currentUserData?.data?.profileImage}
                      />
                    </Badge>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mt-4 text-gray-800">
                  {currentUserData?.data?.name}
                </h1>
                <p className="text-gray-600 mt-2 text-center md:text-left">
                  {currentUserData?.data?.bio
                    ? currentUserData?.data?.bio
                    : "Bio not provided"}
                </p>
                <div className="flex items-center mt-4 text-gray-600">
                  <FaMapMarkerAlt className="text-primary mr-2" />
                  <span>
                    {currentUserData?.data?.address
                      ? currentUserData?.data?.address
                      : "Address not provided"}
                  </span>
                </div>
              </div>

              {/* Right Side: Detailed Information */}
              <div className="md:w-2/3 md:pl-10">
                <Divider className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-700">
                          {currentUserData?.data?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-700">
                          {currentUserData?.data?.mobileNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Birthday</p>
                        <p className="font-medium text-gray-700">
                          {currentUserData?.data?.birthDate
                            ? format(
                                new Date(currentUserData?.data?.birthDate),
                                "MMMM do, yyyy"
                              )
                            : "Birthday not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Information */}
                  <div className="space-y-4">
                    <Button
                      variant="flat"
                      color="default"
                      className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                      onPress={() => setFollowersModalOpen(true)}
                    >
                      <span className="font-medium">Followers</span>
                      <span className="text-primary font-bold">
                        {currentUserData?.data?.followers?.length || 0}
                      </span>
                    </Button>

                    <Button
                      variant="flat"
                      color="default"
                      className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                      onPress={() => setFollowingModalOpen(true)}
                    >
                      <span className="font-medium">Following</span>
                      <span className="text-primary font-bold">
                        {currentUserData?.data?.following?.length || 0}
                      </span>
                    </Button>

                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
                      <span className="font-medium">Member since</span>
                      {currentUserData?.data?.createdAt && (
                        <span className="text-primary font-bold">
                          {format(
                            new Date(currentUserData?.data?.createdAt),
                            "MMMM do, yyyy"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Divider className="my-6" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href={`/dashboard/edit-profile`}>
                    <Button
                      color="success"
                      startContent={<FaUserEdit />}
                      className="w-full sm:w-auto"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                  {!currentUserData?.data?.isVerified && (
                    <Link href={`/subscription`}>
                      <Button
                        color="success"
                        startContent={<FaUserCheck />}
                        variant="bordered"
                        className="w-full sm:w-auto"
                      >
                        Verify Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Modals */}
      <FollowerModal
        isOpen={isFollowersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
      />
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
