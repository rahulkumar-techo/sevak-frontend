import { Address } from "@/components/profile/AddressSection";
import { apiSlice } from "../apis/apiSlice";
import { setUser } from "../auth/authSlice";
type FileItem = {
    file: File;
    url: string;
    fileId: string; // could be backend ID or file name
};

const appendFilesToFormData = (formData: FormData, fieldName: string, items: FileItem[] | undefined) => {
    if (!items?.length) return;
    items.filter((i): i is FileItem => !!i?.file).forEach((item) => formData.append(fieldName, item.file));
};


export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        profileData: builder.query<any, void>({
            query: () => ({
                url: "/profile/user",
                method: "GET",
                credentials: "include"
            }),
            providesTags: ["UserProfile"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data?.data) {
                        // Dispatch to update authSlice
                        dispatch(setUser({ user: data.data }));
                    }
                } catch (error) {
                    console.error("Registration failed:", error);
                }
            }
        }),
        updateGallery: builder.mutation<any, { deletedFileIds: string[], galleryPhotos: FileItem[], videos: FileItem[] }>({
            query: ({ deletedFileIds, galleryPhotos, videos }) => {
                const formData = new FormData();
                appendFilesToFormData(formData, "galleryPhotos", galleryPhotos);
                appendFilesToFormData(formData, "videos", videos);
                deletedFileIds?.filter(Boolean).forEach((id) => formData.append("deletedFileIds", id));
                return {
                    url: "/profile/gallery",
                    method: "PUT", // or POST depending on backend
                    body: formData,
                    credentials: "include",
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        // Update user in authSlice
                        dispatch(setUser({ user: data.data }));
                    }
                } catch (error) {
                    console.error("Update gallery failed:", error);
                }
            },
        }),
        // Header update
        updateHeader: builder.mutation<any, { avatar: File | undefined, fullName: string }>({
            query: ({ avatar, fullName }) => {
                const formData = new FormData();

                // Append fields
                formData.append("fullName", fullName);
                if (avatar) formData.append("avatar", avatar);

                return {
                    url: "/profile/header",
                    method: "PUT", // or POST depending on backend
                    body: formData,

                    credentials: "include",
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        // Update user in authSlice
                        dispatch(setUser({ user: data.data }));
                    }
                } catch (error) {
                    console.error("Update gallery failed:", error);
                }
            },
        }),
        // Bio
        updateBio: builder.mutation<any, { bio: string }>({
            query: ({ bio }) => {
                return {
                    url: "/profile/bio",
                    method: "PATCH", // or POST depending on backend
                    body: { bio },
                    credentials: "include",
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        // Update user in authSlice
                        dispatch(setUser({ user: data.data }));
                    }
                } catch (error) {
                    console.error("Update gallery failed:", error);
                }
            },
        }),

        updateLocation: builder.mutation<any,Partial<Address>>({
            query: (location) => {
                return {
                    url: "/profile/location",
                    method: "PATCH", // or POST depending on backend
                    body: {location},
                    credentials: "include",
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        // Update user in authSlice
                        dispatch(setUser({ user: data.data }));
                    }
                } catch (error) {
                    console.error("Update gallery failed:", error);
                }
            },
        }),
        updatePrefrence: builder.mutation<any, { notifications: boolean, theme: string }>({
            query: (data) => {

                return {
                    url: "/profile/preferences",
                    method: "PATCH", // or POST depending on backend
                    body: data,
                    credentials: "include",
                };
            },
            invalidatesTags: ["UserProfile"]
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         if (data?.data) {
            //             // Update user in authSlice
            //             dispatch(setUser({ user: data.data }));
            //         }
            //     } catch (error) {
            //         console.error("Update gallery failed:", error);
            //     }
            // },
        }),

    })
})

export const { useProfileDataQuery,
    useUpdateGalleryMutation,
    useUpdateHeaderMutation,
    useUpdateBioMutation,
    useUpdateLocationMutation,
    useUpdatePrefrenceMutation

} = profileApi