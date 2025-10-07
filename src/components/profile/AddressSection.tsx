"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type Address = {
  type: "Point";
  coordinates: [number, number];
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  landmark?: string;
  placeId?: string;
};

type Props = {
  initialAddress?: Address;
  onSave?: (address: Address) => void;
};

const AddressSection = ({ initialAddress, onSave }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState<Address>({
    type: "Point",
    coordinates: [0, 0],
    ...initialAddress,
  });

  const handleSave = () => {
    onSave?.(address);
    setIsEdit(false);
  };

  const inputClass =
    "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <Card className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl mt-6">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Address</CardTitle>
        <Button
          size="sm"
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-2">
        {isEdit ? (
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Address"
              value={address.address || ""}
              onChange={(e) => setAddress({ ...address, address: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="City"
              value={address.city || ""}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="State"
              value={address.state || ""}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="Country"
              value={address.country || ""}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="Postal Code"
              value={address.postalCode || ""}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="Landmark"
              value={address.landmark || ""}
              onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              className={inputClass}
            />

            <Button
              className="bg-green-600 hover:bg-green-700 text-white mt-4"
              onClick={handleSave}
            >
              Save Address
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            {address.address && <p>{address.address}</p>}
            {(address.city || address.state) && (
              <p>
                {address.city ?? ""} {address.city && address.state ? "," : ""}{" "}
                {address.state ?? ""}
              </p>
            )}
            {(address.country || address.postalCode) && (
              <p>
                {address.country ?? ""} {address.country && address.postalCode ? "-" : ""}{" "}
                {address.postalCode ?? ""}
              </p>
            )}
            {address.landmark && <p>Landmark: {address.landmark}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressSection;
