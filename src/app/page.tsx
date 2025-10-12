"use client";
import React, { useState } from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";

import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import SevakIntro from "@/components/home/SevakIntro";

type Props = {};

const Page = (props: Props) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  // Call the query hook to fetch user
  const { data: userQuery, isLoading, isError } = useMyProfileQuery();

  // Get global auth state from slice
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Optional: show loading state while fetching
  if (isLoading) return <FullScreenLoader/>;
  // if (isError) return <p>Failed to fetch user</p>;

  return (
    <div>
      <Heading
        title="Sevak - Find Jobs & Services Near You"
        description="Sevak helps users easily find jobs and services within a 20 km radius using geolocation. Simple, fast, and accessible even for illiterate users."
        keywords="jobs near me, local services, geolocation, easy job search, Sevak"
      />
      <Header
        activeItem={activeItem}
        // use userQuery if slice not updated yet
      />
      <Hero />
      <SevakIntro/>
    </div>
  );
};

export default Page;
