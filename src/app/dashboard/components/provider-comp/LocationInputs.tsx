"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { JobFormValues } from "../../schemas/job.schema";

type Props = {
  form: UseFormReturn<JobFormValues>;
};

const LocationInput = ({ form }: Props) => {
  return (
    <div className="p-4 border rounded-2xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 transition-colors">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        Location
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Address */}
        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="location.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="location.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Postal Code */}
        <FormField
          control={form.control}
          name="location.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Landmark */}
        <FormField
          control={form.control}
          name="location.landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input placeholder="Nearby landmark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LocationInput;
