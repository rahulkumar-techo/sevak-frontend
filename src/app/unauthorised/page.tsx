"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const Unauthorized = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-black bg-gray-50 p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-gray-200">
            <Lock className="w-16 h-16 text-gray-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Gradient Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text mb-4">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto leading-relaxed">
          You are not authorized to view this page. Contact your administrator if you believe this is a mistake.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="w-full sm:w-auto min-w-[160px]"
          >
            Go Back
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto min-w-[160px] bg-green-600 text-white hover:bg-green-700"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
