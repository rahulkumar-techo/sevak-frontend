/**
 * RTK Query - Notes API (Refactored)
 * Handles CRUD operations and file uploads (Images + PDF)
 */

import { apiSlice } from "../apis/apiSlice";

export interface INoteFiles {
    noteImages?: File[];
    notePdf?: File | null;
}

export interface INotePayload {
    title: string;
    description: string;
    subject?: string;
    category?: Record<string, any>;
    files?: INoteFiles;

}

export interface IUpdatePayload {
    id: string;
    title: string;
    description: string;
    subject?: string;
    category?: Record<string, any>;
    files?: INoteFiles;
     deleteItems?:string[]
}

export interface INoteQueryParams {
    userId?: string;
    page?: number;
    limit?: number;
    search?: string;
}

/** Helper: Convert payload to FormData */
const buildFormData = (data: INotePayload|IUpdatePayload) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.subject) formData.append("subject", data.subject);
    if (data.category) formData.append("category", JSON.stringify(data.category));
    // Deleted Items (for update)
if ("deleteItems" in data && data.deleteItems && Array.isArray(data.deleteItems)) {
    formData.append("deleteItems", JSON.stringify(data.deleteItems));
}


    // Images
    if (data.files?.noteImages && Array.isArray(data.files.noteImages)) {
        data.files.noteImages.forEach((file) => {
            formData.append("noteImages", file);
        });
    }

    // PDF
    if (data.files?.notePdf) {
        formData.append("notePdf", data.files.notePdf);
    }

    return formData;
};

export const noteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ------------------- CREATE NOTE -------------------
        createNote: builder.mutation<any, INotePayload>({
            query: (data: INotePayload) => {
                const formData = buildFormData(data);
                return {
                    url: "/note",
                    method: "POST",
                    body: formData,
                    credentials: "include",
                };
            },
        }),

        // ------------------- GET USER NOTES -------------------
        getNotes: builder.query<any, INoteQueryParams>({
            query: ({ page = 1, limit = 10, search  }) => {
                let query = `?page=${page}&limit=${limit}`;
                if (search) query += `&search=${search}`;
                return {
                    url: `/note/user/${query}`,
                    method: "GET",
                    params: { page, limit, search },
                    credentials: "include",
                }
            },
            // optional: keep previous data while fetching new
            keepUnusedDataFor: 60,
        }),

        // ------------------- GET SINGLE NOTE -------------------
        getSingleNote: builder.query<any,{id:string}>({
            query: ({id}) => ({
                url: `/note/single/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        // ------------------- UPDATE NOTE -------------------
        updateNote: builder.mutation<any, IUpdatePayload>({
            query: ({ id, ...data }: IUpdatePayload) => {
                const formData = buildFormData(data);
                return {
                    url: `/note/${id}`,
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                };
            },
        }),

        // ------------------- DELETE NOTE -------------------
        deleteNote: builder.mutation({
            query: (id: string) => ({
                url: `/api/notes/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useCreateNoteMutation,
    useGetNotesQuery,
    useGetSingleNoteQuery,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = noteApi;
