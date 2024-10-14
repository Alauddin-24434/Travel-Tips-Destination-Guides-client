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
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { useDisclosure } from "@nextui-org/modal";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/ui/Loading";
import FollowerModal from "@/components/modal/FollowerModal";
import FollowingModal from "@/components/modal/FollowingModal";



const ProfilePage = () => {
  const {
    isOpen: followersModalIsOpen,
    onOpen: followersModalOnOpen,
    onClose: followersModalOnClose,
  } = useDisclosure();

  const {
    isOpen: followingModalIsOpen,
    onOpen: followingModalOnOpen,
    onClose: followingModalOnClose,
  } = useDisclosure();

  const { data: currentUserData, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({});

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {currentUserLoading && <Loading />}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-background shadow-lg overflow-hidden">
          <CardHeader className="relative p-0 mb-4">
            <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600" />
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-3/4 w-32 h-32">
              <Badge
                isOneChar
                className={`${!currentUserData?.data?.isVerified ? "hidden" : ""}`}
                color="success"
                content={<CheckIcon />}
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  isBordered
                  className="w-32 h-32"
                  color="primary"
                  src={currentUserData?.data?.profileImage}
                />
              </Badge>
            </div>
          </CardHeader>
          <CardBody className="px-4 pb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {currentUserData?.data?.name}
              </h1>
              <p className="text-default-500 mb-4">
                {currentUserData?.data?.bio
                  ? currentUserData?.data?.bio
                  : "Bio not provided"}
              </p>
              <div className="flex items-center justify-center">
                <FaMapMarkerAlt className="text-primary mr-2" />
                <span className="text-default-500">
                  {" "}
                  {currentUserData?.data?.address
                    ? currentUserData?.data?.address
                    : "Address not provided"}
                </span>
              </div>
            </div>

            <Divider className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-primary mr-3" />
                  <div>
                    <p className="text-sm text-default-500">Email</p>
                    <p className="font-medium">
                      {currentUserData?.data?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-primary mr-3" />
                  <div>
                    <p className="text-sm text-default-500">Phone</p>
                    <p className="font-medium">
                      {currentUserData?.data?.mobileNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary mr-3" />
                  <div>
                    <p className="text-sm text-default-500">Birthday</p>
                    <p className="font-medium">
                      {currentUserData?.data?.birthDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Button
                  color="default"
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    width: "100%",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                  onPress={followersModalOnOpen}
                >
                  <span className="font-medium">Followers</span>
                  <span className="text-primary font-bold">
                    {currentUserData?.data?.followers?.length}
                  </span>
                </Button>

                <Button
                  color="default"
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    width: "100%",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                  onPress={followingModalOnOpen}
                >
                  <span className="font-medium">Following</span>
                  <span className="text-primary font-bold">
                    {currentUserData?.data?.following?.length}
                  </span>
                </Button>
                <div className="flex justify-between items-center p-3 bg-default-100 rounded-lg">
                  <span className="font-medium">Member since</span>
                  {currentUserData?.data?.createdAt && (
                    <span className="text-primary font-bold">
                      {" "}
                      {format(
                        new Date(currentUserData?.data?.createdAt),
                        "MMM dd, yyyy",
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Divider className="my-6" />

            <div className="flex justify-center space-x-4">
              <Link href={`/dashboard/edit-profile`}>
                <Button color="primary" startContent={<FaUserEdit />}>
                  Edit Profile
                </Button>
              </Link>
              {!currentUserData?.data?.isVerified && (
                <Link href={`/subscription`}>
                  <Button
                    color="primary"
                    startContent={<FaUserCheck />}
                    variant="bordered"
                  >
                    Verify Profile
                  </Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <FollowerModal
        isOpen={followersModalIsOpen}
        onClose={followersModalOnClose}
      />
      <FollowingModal
        isOpen={followingModalIsOpen}
        onClose={followingModalOnClose}
      />
    </div>
  );
};

export default ProfilePage;
