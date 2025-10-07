"use client";

import React from "react";
import HeaderSection from "@/components/profile/HeaderSection";
import BioSection from "@/components/profile/BioSection";
import GallerySection from "@/components/profile/GallerySection";
import AddressSection, { Address } from "@/components/profile/AddressSection";
import PreferencesSection from "@/components/profile/PrefrenceSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { useUpdateGalleryMutation } from "@/redux/features/profile/profileApi";

// Dummy gallery/videos
const dummyImages = [
    { url: "/images/img1.jpg", fileId: "img1" },
    { url: "/images/img2.jpg", fileId: "img2" },
    { url: "/images/img3.jpg", fileId: "img3" },
];

const dummyVideos = [
    { url: "/videos/video1.mp4", fileId: "vid1" },
    { url: "/videos/video2.mp4", fileId: "vid2" },
];

type Preferences = {
    notifications: boolean;
    theme: "light" | "dark" | "system";
};

const ProfileContent = ({ user }: { user: any }) => {
    // ---------- Save Handlers ----------
    const handleHeaderSave = (data: { fullName: string; avatar: File | string }) => { };
    const handleBioSave = (bio: string) => console.log("Bio saved:", bio);
    const [updateGallery,{isLoading}] = useUpdateGalleryMutation()

    const handleGallerySave = (data: {
        images: File[];
        videos: File[];
        deletedFileIds: string[];
    }) => {
        updateGallery({
            galleryPhotos: data.images,
            videos: data.videos,
            deletedFileIds: data.deletedFileIds,
        });
    };

    const handleAddressSave = (addressData: any) => console.log("Address saved:", addressData);
    const handlePreferencesSave = (preferences: any) =>
        console.log("Preferences saved:", preferences);

    // ---------- Initial data ----------
    const initialAddress: Address = {
        type: "Point",
        coordinates: [0, 0],
        city: "",
        state: "",
        country: "",
        postalCode: "",
        landmark: "",
    };

    const initialPreferences: Preferences = {
        notifications: true,
        theme: "light",
    };

    return (
        <>
            <Header activeItem={-1} />
            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white py-8 px-4 mt-[60px]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                        <HeaderSection
                            fullName={user?.fullName || "Rahul Kumar"}
                            avatar={user?.avatar?.url || "/default-avatar.jpg"}
                            isActive={user?.isActive || false}
                            isVerified={user?.isVerified || false}
                            role={user?.roles?.[0] || "User"}
                            onSave={handleHeaderSave}
                        />
                        <BioSection onSave={handleBioSave} initialBio={user?.bio || ""} />
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                        {/* Gallery Section */}
                        <GallerySection
                            galleryPhotos={user?.galleryPhotos || dummyImages}
                            videos={user?.videos || dummyVideos}
                            onSave={handleGallerySave}
                            isLoading={isLoading}
                        />

                        {/* Address Section */}
                        <AddressSection
                            onSave={handleAddressSave}
                            initialAddress={initialAddress}
                        />

                        {/* Preferences Section */}
                        <PreferencesSection
                            onSave={handlePreferencesSave}
                            preferences={initialPreferences}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileContent;
