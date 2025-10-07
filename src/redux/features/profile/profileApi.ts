import { apiSlice } from "../apis/apiSlice";
import { setUser } from "../auth/authSlice";


export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        profileData: builder.query<any, void>({
            query: () => ({
                url: "/profile/user",
                method: "GET",
                credentials: "include"
            }),
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
        updateGallery: builder.mutation<any, { deletedFileIds: string[], galleryPhotos: File[], videos: File[] }>({
            query: ({ deletedFileIds, galleryPhotos, videos }) => {
                const formData = new FormData();

                deletedFileIds.forEach((id) => formData.append("deletedFileIds", id));
                galleryPhotos.forEach((file) => formData.append("galleryPhotos", file));
                videos.forEach((file) => formData.append("videos", file));

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
        })


    })
})

export const { useProfileDataQuery ,useUpdateGalleryMutation} = profileApi