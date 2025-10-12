"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "../schemas/job.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MediaUpload from "./provider-comp/MediaUpload";
import LocationInput from "./provider-comp/LocationInputs";

type Props = {
  initialJobFormData?: Partial<JobFormValues>;
  onSubmitForm: (values: JobFormValues) => void;
  onPreviewChange?: (values: Partial<JobFormValues>) => void;
};

const JobForm = ({ initialJobFormData, onSubmitForm, onPreviewChange }: Props) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema) as any, // temporary cast for type mismatch safety
    defaultValues: {
      title: initialJobFormData?.title || "",
      category: initialJobFormData?.category || "",
      description: initialJobFormData?.description || "",
      budget: initialJobFormData?.budget ?? 0,
      jobType: initialJobFormData?.jobType || "Part-Time",
      location: {
        type: "Point",
        address: initialJobFormData?.location?.address || "",
        city: initialJobFormData?.location?.city || "",
        state: initialJobFormData?.location?.state || "",
        country: initialJobFormData?.location?.country || "",
        postalCode: initialJobFormData?.location?.postalCode || "",
        landmark: initialJobFormData?.location?.landmark || "",
      },
      media: initialJobFormData?.media,
      distanceLimit: initialJobFormData?.distanceLimit ?? 20,
    },
  });
  const { control, handleSubmit, watch } = form;
useEffect(() => {
  const subscription = watch((values) => {
   onPreviewChange?.(values as JobFormValues); 
  });
  return () => subscription.unsubscribe();
}, [watch, onPreviewChange]);


  const onSubmit: SubmitHandler<JobFormValues> = (values) => {
    console.log("✅ Form submission data:", values);
    onSubmitForm(values);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 md:p-10 transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Create / Edit Job
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* BASIC DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter job title"
                        {...field}
                        className="dark:bg-gray-800 dark:text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Plumbing"
                        {...field}
                        className="dark:bg-gray-800 dark:text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job details..."
                      {...field}
                      className="min-h-[120px] dark:bg-gray-800 dark:text-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BUDGET & JOB TYPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="dark:bg-gray-800 dark:text-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* LOCATION */}
            <LocationInput form={form} />

            {/* MEDIA UPLOAD */}
            <MediaUpload
              value={form.watch("media")}
              onChange={(media) => form.setValue("media", media)}
            />

            {/* DISTANCE LIMIT */}
            <FormField
              control={form.control}
              name="distanceLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance Limit (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="dark:bg-gray-800 dark:text-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400 transition-all"
            >
              Submit Job
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JobForm;
