"use client";

import React from "react";

import { useProfileDataQuery } from "@/redux/features/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ProfileContent from "@/components/profile/ProfileContent";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { username: string; id: string };
}


const ProfilePage = ({ params }: { params: Promise<{ username: string; id: string }> }) => {
const { username, id } = React.use(params);
  const { data: profile } = useProfileDataQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  // 🚫 Block reserved or invalid usernames
  const reservedUsernames = [
    "dashboard","dashboards",
    "jobs",
    "reset-password",
    "profile",
    "api",
  ];

  if (reservedUsernames.includes(username)) {
    notFound(); // 👈 Show 404
  }
  return (
    <>
      {user ? (
        <ProfileContent user={profile?.data || user} />
      ) : (
        <FullScreenLoader />
      )}

    </>
  );
};

export default ProfilePage;
