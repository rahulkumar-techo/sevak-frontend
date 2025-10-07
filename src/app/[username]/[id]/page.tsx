"use client";

import React from "react";

import { useProfileDataQuery } from "@/redux/features/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ProfileContent from "@/components/profile/ProfileContent";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";



const ProfilePage = () => {
  const { data } = useProfileDataQuery();
  const { user } = useSelector((state: RootState) => state.auth);



  return (
    <>
      {user ? (
        <ProfileContent user={user} />
      ) : (
        <FullScreenLoader />
      )}

    </>
  );
};

export default ProfilePage;
