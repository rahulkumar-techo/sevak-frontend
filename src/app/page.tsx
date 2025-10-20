"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import SevakIntro from "@/components/home/SevakIntro";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";

import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "./store";

type Props = {};

const HomePage: React.FC<Props> = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  // Fetch user profile
  const { data: userQuery, isLoading, isError } = useMyProfileQuery();

  // Get auth state
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Optional: log user data
  useEffect(() => {
    if (userQuery?.data) {
      console.log("User Data:", userQuery.data);
    }
  }, [userQuery?.data]);

  // Loading state
  if (isLoading) return <FullScreenLoader />;

  // Error state (optional)
  // if (isError) return <p className="text-center mt-8 text-red-500">Failed to fetch user data</p>;

  return (
    <div className="min-h-screen">
      <Heading
        title="Sevak - Find Jobs & Services Near You"
        description="Sevak helps users easily find jobs and services within a 20 km radius using geolocation. Simple, fast, and accessible even for illiterate users."
        keywords="jobs near me, local services, geolocation, easy job search, Sevak"
        logoUrl="/favicongenerator.io/favicon.ico" // optional logo for favicon/social
      />

      <Header activeItem={activeItem} />

      <main >
        <Hero />
        <SevakIntro />
      </main>
    </div>
  );
};

export default HomePage;
